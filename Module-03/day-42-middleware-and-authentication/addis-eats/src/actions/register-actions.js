"use server";
import { registrationFormSchema } from "@/lib/schema";
import { z } from "zod";
import { checkDuplicate, normalizePhone, createAccount } from "@/lib/auth";

const registerUser = async (data) => {
  try {
    console.log("@register-actions data: ", data);
    const validatedFields = registrationFormSchema.safeParse(data);

    if (!validatedFields.success) {
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

    const userData = { ...data, phone: normalizedPhoneNumber };
    const userId = await createAccount(userData);
    console.log("user id: ", userId);

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
      error: "An unexpected server error occurred",
    };
  }
};

export default registerUser;
