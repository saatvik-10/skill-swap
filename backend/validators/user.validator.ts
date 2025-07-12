import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.email(),
  profilePicture: z.url().optional(),
  location: z.string().optional(),
  skillsOffered: z.array(z.string()).optional().default([]),
  skillsWanted: z.array(z.string()).optional().default([]),
  public: z.boolean().optional().default(false),
  availability: z
    .object({
      Monday: z.boolean().optional(),
      Tuesday: z.boolean().optional(),
      Wednesday: z.boolean().optional(),
      Thursday: z.boolean().optional(),
      Friday: z.boolean().optional(),
      Saturday: z.boolean().optional(),
      Sunday: z.boolean().optional(),
    })
    .optional(),
});

export type User = z.infer<typeof userSchema>;

export const registerUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3).max(20),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20),
});

export type LoginUser = z.infer<typeof loginUserSchema>;

export const responseUserSchema = z.object({
  _id: z.string(),
  name: z.string().min(3).max(20),
  email: z.email(),
  profilePicture: z.url().optional(),
  location: z.string().optional(),
  skillsOffered: z.array(z.string()).optional().default([]),
  skillsWanted: z.array(z.string()).optional().default([]),
  public: z.boolean().optional().default(false),
  availability: z
    .object({
      Monday: z.boolean().optional(),
      Tuesday: z.boolean().optional(),
      Wednesday: z.boolean().optional(),
      Thursday: z.boolean().optional(),
      Friday: z.boolean().optional(),
      Saturday: z.boolean().optional(),
      Sunday: z.boolean().optional(),
    })
    .optional(),
});

export const searchUsersSchema = z.object({
  search: z.string().min(3),
})
