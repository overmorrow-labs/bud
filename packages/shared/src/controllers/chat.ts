import { z } from "zod";
import { ObjectId } from "mongodb";

export const headersSchema = z.object({
  sessionid: z
    .string()
    .refine((val) => {
      return ObjectId.isValid(val);
    })
    .optional(),
});

export const bodySchema = z.object({
  prompt: z.string(),
});

export const replySchema = z.object({
  response: z.string(),
  sessionId: z.string(),
});
