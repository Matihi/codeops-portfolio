"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/schema";
import placeOrder from "@/actions/checkout-actions";
import { useActionState } from "react";
import { startTransition } from "react";
import { useEffect } from "react";

const divStyle = "flex flex-col";
const inputStyle = "border w-fit p-0.5";
const errorMessageStyle = "text-red-500 text-xs";

const initialState = {
  fieldErrors: {},
  error: null,
  order: null,
};

const CheckoutForm = () => {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValues,
    clearErrors,
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (
      !pending &&
      state?.order &&
      Object.keys(state?.fieldErrors ?? {}).length === 0 &&
      state?.error === null
    ) {
      setValues(
        { name: "", phone: "" },
        { shouldValidate: false, shouldDirty: false, shouldTouch: false },
      );
      clearErrors();
    }
  }, [pending, state]);

  console.log("state: ", state);

  const handlePay = async (data) => {
    startTransition(() => formAction(data));
  };

  return (
    <div className="p-1">
      <p>Enter your info</p>
      <form
        className="flex flex-col gap-1 p-3 border w-fit"
        onSubmit={handleSubmit(handlePay)}
        aria-describedby={state?.error?.length > 0 ? "form-error" : undefined}
      >
        {state?.error?.length > 0 && (
          <p id="form-error" role="alert" className={errorMessageStyle}>
            {state.error}
          </p>
        )}
        <div className={divStyle}>
          <label htmlFor="name">Name:</label>
          <input
            className={inputStyle}
            type="text"
            id="name"
            {...register("name")}
            placeholder="Your Name"
            aria-invalid={!!errors.name || state?.fieldErrors?.name?.length > 0}
            aria-describedby={
              !!errors.name || state?.fieldErrors?.name?.length > 0
                ? "name-error"
                : undefined
            }
          />
          {!!errors.name && (
            <p id="name-error" className={errorMessageStyle}>
              {errors.name.message}
            </p>
          )}
          {state?.fieldErrors?.name?.length > 0 && (
            <p id="name-error" className={errorMessageStyle}>
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className={divStyle}>
          <label htmlFor="phone">Phone:</label>
          <input
            className={inputStyle}
            type="tel"
            id="phone"
            {...register("phone")}
            placeholder="0911223344"
            aria-invalid={
              !!errors.phone || state?.fieldErrors?.phone?.length > 0
            }
            aria-describedby={
              !!errors.phone || state?.fieldErrors?.phone?.length > 0
                ? "phone-error"
                : undefined
            }
          />
          {!!errors.phone && (
            <p id="phone-error" className={errorMessageStyle}>
              {errors.phone.message}
            </p>
          )}
          {state?.fieldErrors?.phone?.length > 0 && (
            <p id="phone-error" className={errorMessageStyle}>
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>
        <button
          className={`self-start py-0.5 ${pending ? "bg-gray-500" : "bg-red-500"}  px-1.5 rounded-sm`}
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
