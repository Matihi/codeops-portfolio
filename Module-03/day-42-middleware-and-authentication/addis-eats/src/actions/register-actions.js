"use server";
import { registrationFormSchema } from "@/lib/schema";
import { z } from "zod";
import { checkDuplicate } from "@/lib/auth";
import { normalizePhone } from "@/lib/auth";

const registerUser = async (data) => {
  try {
    console.log("@register-actions data: ", data);
    const validatedFields = registrationFormSchema.safeParse(data);

    if (!validatedFields) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return { success: false, fieldErrors: flat, error: null };
    }

    const { phone } = data;
    const normalizedPhoneNumber = normalizePhone(phone);
    const isDuplicate = checkDuplicate(normalizedPhoneNumber);

    if (isDuplicate) {
      return {
        success: false,
        fieldErrors: {
          phone: ["An account with this phone number already exists."],
        },
        error: null,
      };
    }

    return {
      success: true,
      fieldErrors: {},
      error: null,
    };
  } catch (error) {
    console.log("error in register action: ", error);
    return {
      success: false,
      fieldErrors: {},
      error: "An unexpected server error occured",
    };
  }
};

export default registerUser;
