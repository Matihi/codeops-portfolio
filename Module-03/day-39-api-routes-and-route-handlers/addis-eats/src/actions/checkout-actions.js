"use server";
import { orderSchema } from "@/lib/schema";
import { z } from "zod";
import { createOrder } from "@/lib/db";

const placeOrder = async (formData) => {
  try {
    console.log("@checkout-actions.js formData:", formData);

    const validatedFields = orderSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
    });

    if (!validatedFields.success) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return {
        fieldErrors: flat,
      };
    }
    const order = await createOrder(validatedFields.data);
    return order;
  } catch (error) {
    console.error("caught error:", error);

    return {
      error: "An unexpected server error occured",
    };
  }
};

export default placeOrder;
