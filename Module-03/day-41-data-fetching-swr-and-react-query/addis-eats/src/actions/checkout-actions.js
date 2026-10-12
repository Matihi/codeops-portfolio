"use server";
import { orderSchema } from "@/lib/schema";
import { z } from "zod";
import { createOrder } from "@/lib/db";
import { revalidatePath } from "next/cache";

const placeOrder = async (prevState, data) => {
  try {
    console.log("@checkout-actions.js formData:", data);

    const validatedFields = orderSchema.safeParse(data);

    if (!validatedFields.success) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return {
        fieldErrors: flat,
        error: null,
        order: null,
      };
    }
    const order = await createOrder(validatedFields.data);
    revalidatePath("/orders");
    return {
      fieldErrors: {},
      error: null,
      order: order,
    };
  } catch (error) {
    console.error("caught error:", error);

    return {
      fieldErrors: {},
      error: "An unexpected server error occured",
      order: null,
    };
  }
};

export default placeOrder;
