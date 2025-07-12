import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

export class MediaController {
  async uploadMedia(ctx: Context) {
    try {
      const files = ctx.get("files");
      return ctx.json(files, 200);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
