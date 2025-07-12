import { SwapReqService } from "../service/swapReq.service";
import {createSwapRequestSchema } from "../validators/swapReq.validators";
import { StatusCodes } from "http-status-codes";
import type { Context } from "hono";
import { ZodError } from "zod";

const swapRequestService = new SwapReqService();

export class SwapRequestController {
  async createSwapRequest(ctx: Context) {
    try {
      const userId = ctx.get("userId");
      const body = createSwapRequestSchema.parse(await ctx.req.json());
      
      await swapRequestService.createSwapRequest(userId, body);
        return ctx.json(
            { message: "Swap request created successfully" },
            StatusCodes.CREATED,
        );
    } catch (err) {
       if (err instanceof ZodError) {
        return ctx.json(
            err.issues,
            StatusCodes.BAD_REQUEST,
        )
       }
        return ctx.json(
            { error: "Internal Server Error" },
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
