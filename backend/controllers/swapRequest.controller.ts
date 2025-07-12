import { SwapReqService } from "../service/swapReq.service";
import {createSwapRequestSchema } from "../validators/swapReq.validators";
import { StatusCodes } from "http-status-codes";
import type { Context } from "hono";
import { ZodError } from "zod";
import { swapRequestStatusSchema } from "../validators/swapReq.validators";

const swapRequestService = new SwapReqService();

export class SwapRequestController {
  async createSwapRequest(ctx: Context) {
    try {
      const userId = ctx.get("userID");
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

  async changeReceivedSwapRequests(ctx: Context) {
    try{
        const requests = swapRequestStatusSchema.parse(await ctx.req.json());
        await swapRequestService.changeSwapStatus(requests.reqId, requests.status);
        return ctx.json(
            { message: "Swap request status updated successfully" },
            StatusCodes.OK,
        )
    }catch(err){
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

  async getSwapRequestHistory(ctx: Context) {
    try {
      const userId = ctx.get("userID");
      const history = await swapRequestService.getSwapRequestHistory(userId);
      return ctx.json(history, StatusCodes.OK);
    } catch (err) {
      return ctx.json(
        { error: "Internal Server Error" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
