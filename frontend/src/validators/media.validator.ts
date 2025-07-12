import z from "zod";

export const createMediaSchema = z.object({
  eTag: z.string(),
  key: z.string(),
  url: z.string(),
});

export type CreateMedia = z.infer<typeof createMediaSchema>;
