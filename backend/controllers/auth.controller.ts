import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  loginUserSchema,
  registerUserSchema,
  responseUserSchema,
} from "../validators/user.validator";
import { ZodError } from "zod";
import { UserService } from "../service/user.service";
import {
  generateJWT,
  getPasswordKeys,
  validatePassword,
} from "../lib/auth.lib";

const userService = new UserService();

export class AuthController {
  async login(ctx: Context) {
    try {
      const body = loginUserSchema.parse(await ctx.req.json());
      const user = await userService.getUserByEmail(body.email);
      if (!user) {
        return ctx.json({ error: "User not found" }, StatusCodes.UNAUTHORIZED);
      }
      const validPassword = await validatePassword(body.password, user.hash);
      if (!validPassword) {
        return ctx.json(
          { error: "Invalid password" },
          StatusCodes.UNAUTHORIZED,
        );
      }
      const token = await generateJWT({ _id: user._id.toString() });
      return ctx.json(
        {
          token,
          user: responseUserSchema.parse({
            ...user.toObject(),
            _id: user._id.toString(),
          }),
        },
        StatusCodes.OK,
      );
    } catch (err) {
      if (err instanceof ZodError) {
        return ctx.json(err.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(ctx: Context) {
    try {
      const body = registerUserSchema.parse(await ctx.req.json());
      const user = await userService.getUserByEmail(body.email);
      if (user) {
        return ctx.json(
          { error: "User already exists" },
          StatusCodes.BAD_REQUEST,
        );
      }
      const { hash } = await getPasswordKeys(body.password);
      const createdUser = await userService.createUser(body, hash);
      const token = await generateJWT({ _id: createdUser._id.toString() });

      return ctx.json(
        {
          token,
          user: responseUserSchema.parse({
            ...createdUser.toObject(),
            _id: createdUser._id.toString(),
          }),
        },
        StatusCodes.OK,
      );
    } catch (err) {
      console.error("Error caught : ",err); 
      if (err instanceof ZodError) {
        return ctx.json(err.issues, StatusCodes.BAD_REQUEST);
      }
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
