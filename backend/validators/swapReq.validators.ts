import { z } from "zod";
import { Hono } from "hono";

export const swapRequestSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  otherUserId: z.string(),
  offeredSkill: z
    .array(z.string())
    .min(1, "At least one skill must be offered"),
  wantedSkill: z.array(z.string()).min(1, "At least one skill must be wanted"),
  message: z.string().min(1, "Message cannot be empty"),
  status: z.string(),
});

export type SwapRequest = z.infer<typeof swapRequestSchema>;

export const createSwapRequestSchema = z.object({
  otherUserId: z.string(),
  offeredSkill: z
    .array(z.string())
    .min(1, "At least one skill must be offered"),
  wantedSkill: z.array(z.string()).min(1, "At least one skill must be wanted"),
  message: z.string().min(1, "Message cannot be empty"),
});

export type CreateSwapRequest = z.infer<typeof createSwapRequestSchema>;

export const swapRequestStatusSchema = z.object({
  reqId: z.string(),
  status: z.enum(["accepted", "rejected"]),
});

export type SwapRequestStatus = z.infer<typeof swapRequestStatusSchema>;

