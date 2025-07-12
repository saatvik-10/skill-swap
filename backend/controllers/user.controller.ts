import type { Context } from "hono";
import { UserService } from "../service/user.service";
import { StatusCodes } from "http-status-codes";

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
      return ctx.json(user, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
