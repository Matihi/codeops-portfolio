"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/schema";
import { useState } from "react";

const divStyle = "flex flex-col";
const inputStyle = "border w-fit p-0.5";
const errorMessageStyle = "text-red-500 text-xs";

const CheckoutForm = () => {
  const [serverErrors, setServerErrors] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const handlePay = async (data) => {
    const dataString = JSON.stringify(data);
    console.log(dataString);

    console.log("data:", data);
    const testDataString = JSON.stringify({ name: "a", phone: "c" });
    console.log(testDataString);

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataString,
      });

      const result = await res.json();
      if (res.status === 422) {
        const { fieldErrors } = result;
        setServerErrors(fieldErrors);
      } else if (!res.ok) {
        console.log("server error: ", result);
        console.log("status: ", res.status);
        setServerErrors(result.error);
      } else {
        console.log("success ", result);
        setServerErrors(undefined);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="p-1">
      <p>Enter your info</p>
      <form
        className="flex flex-col gap-1 p-3 border w-fit"
        onSubmit={handleSubmit(handlePay)}
        aria-describedby={serverErrors?.length > 0 ? "form-error" : undefined}
      >
        {serverErrors?.length > 0 && (
          <p id="form-error" role="alert" className={errorMessageStyle}>
            {serverErrors}
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
            aria-invalid={!!errors.name || serverErrors?.name?.length > 0}
            aria-describedby={
              !!errors.name || serverErrors?.name?.length > 0
                ? "name-error"
                : undefined
            }
          />
          {!!errors.name && (
            <p id="name-error" className={errorMessageStyle}>
              {errors.name.message}
            </p>
          )}
          {serverErrors?.name?.length > 0 && (
            <p id="name-error" className={errorMessageStyle}>
              {serverErrors.name[0]}
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
            aria-invalid={!!errors.phone || serverErrors?.phone?.length > 0}
            aria-describedby={
              !!errors.phone || serverErrors?.phone?.length > 0
                ? "phone-error"
                : undefined
            }
          />
          {!!errors.phone && (
            <p id="phone-error" className={errorMessageStyle}>
              {errors.phone.message}
            </p>
          )}
          {serverErrors?.phone?.length > 0 && (
            <p id="phone-error" className={errorMessageStyle}>
              {serverErrors.phone[0]}
            </p>
          )}
        </div>
        <button
          className="self-start py-0.5 bg-red-500 px-1.5 rounded-sm"
          type="submit"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
