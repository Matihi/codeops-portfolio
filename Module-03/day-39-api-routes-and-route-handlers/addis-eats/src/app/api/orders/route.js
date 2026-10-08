import { z } from "zod";
import { orderSchema } from "@/lib/schema";
export const POST = async (request) => {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);
    if (!result.success) {
      const flat = z.flattenError(result.error).fieldErrors;
      return Response.json(
        { error: "Validation failed", fieldErrors: flat },
        { status: 422 },
      );
    }
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Invalid json provided" }, { status: 400 });
  }
};
