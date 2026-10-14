import { z } from "zod";
const phonePattern = /^(?:\+251|0)9\d{8}$/;
export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(phonePattern, {
      message:
        "Phone number must start with 09… or +2519… followed by 8 digits",
    }),

  dishId: z.string().optional(),

  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .optional()
    .default(1),

  notes: z
    .string()
    .max(200, { message: "Notes cannot exceed 200 characters" })
    .optional(),
});
