import z from "zod/v4";

export const planSchema = z.object({
  name: z.string(),
  planId: z.string(),
  amount: z.number(),
  storage: z.number(),
});
