import type { Context } from "hono";
import { UserService } from "../service/user.service";
import { StatusCodes } from "http-status-codes";
import {
  responseUserSchema,
  searchUsersSchema,
  userSchema,
} from "../validators/user.validator";
import Fuse from "fuse.js";

const userService = new UserService();

export class UserController {
  async getMe(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const user = await userService.getUserById(userId);
      return ctx.json(user, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(ctx: Context) {
    try {
      const userId = ctx.req.param("id");
      const user = await userService.getUserById(userId);
      if(!user) {
        return ctx.json({ error: "User not found" }, StatusCodes.NOT_FOUND);
      }
      return ctx.json(responseUserSchema.parse({
        ...user.toObject(),
        _id: user._id.toString(),
      }), StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPublicUsers(ctx: Context) {
    try {
      const users = await userService.getAllPublicUsers();
      return ctx.json(users, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchPublicUsers(ctx: Context) {
    try {
      const { search } = searchUsersSchema.parse(await ctx.req.json());
      const users = await userService.getAllPublicUsers();

      const fuse = new Fuse(users, {
        keys: ["name", "email", "skillsOffered", "skillsWanted"],
      });

      const searched = fuse.search(search);
      const searchedUsers = searched.map((user) => user.item);

      return ctx.json(
        responseUserSchema.array().parse(searchedUsers),
        StatusCodes.OK,
      );
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProfile(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const body = userSchema.partial().parse(await ctx.req.json());
      await userService.updateUser(userId, body);
      return ctx.json(
        { message: "Profile updated successfully" },
        StatusCodes.OK,
      );
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
