import {z} from "zod";
import { Hono } from "hono";

export const createSwapRequestSchema = z.object({
    otherUserId : z.string(),
    offeredSkill: z.array(z.string()).min(1, "At least one skill must be offered"),
    wantedSkill: z.array(z.string()).min(1, "At least one skill must be wanted"),
    message: z.string().min(1, "Message cannot be empty"),
})

export type CreateSwapRequest = z.infer<typeof createSwapRequestSchema>;