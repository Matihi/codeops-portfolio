import { useEffect, useState } from "react";
import { useAuth } from "../../context/authentication/AuthProvider";
import useCartStore from "../../stores/cartStore";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Checkout.module.css";

const phonePattern = /^(?:\+251|0)9\d{8}$/;

const checkoutFormSchema = z
  .object({
    orderMode: z.enum(["delivery", "pickup"], {
      error: "Please choose delivery mode",
    }),
    name: z.string().trim().min(1, { message: "Name is required" }),
    phone: z
      .string()
      .trim()
      .min(1, "Phone field is required")
      .regex(phonePattern, {
        message: "Phone number should be a valid TeleBirr phone number",
      }),
    area: z.string().trim(),
  })
  .refine(
    (data) => {
      if (data.orderMode === "pickup") {
        return true;
      }
      if (data.area === "select" || data.area === "") {
        return false;
      }
      return true;
    },
    { message: "Please choose delivery area", path: ["area"] },
  );

const Checkout = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useAuth();
  const [isPayed, setIsPayed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    control,
    setValue,
    trigger,
    clearErrors,
  } = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onTouched",
    defaultValues: {
      orderMode: "delivery",
      name: "",
      phone: "",
      area: "select",
    },
  });

  const selectedOrderMode = useWatch({
    control,
    name: "orderMode",
  });

  const deliveryFee = selectedOrderMode === "delivery" ? 70.5 : 0;
  const deliveryFeeString = deliveryFee.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const checkoutCount = cartItems.length;

  useEffect(() => {
    setValue("name", user?.name ?? "");
    setValue("phone", user?.phone ?? "");
  }, [user, setValue]);

  useEffect(() => {
    if (selectedOrderMode === "pickup") {
      clearErrors("area");
    } else if (touchedFields.area) {
      trigger("area");
    }
  }, [selectedOrderMode, clearErrors, trigger, touchedFields.area]);

  const handlePay = (data) => {
    if (checkoutCount > 0) {
      const randomString = (length) =>
        Math.random()
          .toString(36)
          .substring(2, 2 + length);
      const paymentID = randomString(12);
      const deliveryDetail = { ...data, paymentID };
      console.log(deliveryDetail);

      reset();
      clearCart();
      setIsPayed(true);
    }
  };

  console.log(errors);

  const checkoutCartElements = cartItems.map((item) => (
    <div key={item.id} className={styles.checkoutCartItem}>
      <p>{`${String(item.quantity)}x`}</p>
      <p>
        {item.name}
        {item.spiceLevelCart && <span>{`(${item.spiceLevelCart})`}</span>}
      </p>
      <p>{`ETB ${item.price.toLocaleString([], {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`}</p>
    </div>
  ));

  const subTotal = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0,
  );
  const subTotalString = subTotal.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const total = deliveryFee + subTotal;
  const totalString = total.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>
      <div className={styles.contentWrapper}>
        <div className={styles.customerInfo}>
          <h2>Enter your Information</h2>
          <form method="post" className={styles.checkoutForm}>
            <div className={styles.orderModeWrapper}>
              <div className={styles.deliveryWrapper}>
                <label htmlFor="delivery-radio">Delivery</label>
                <input
                  type="radio"
                  id="delivery-radio"
                  value="delivery"
                  {...register("orderMode")}
                />
              </div>
              <div className={styles.pickupWrapper}>
                <label htmlFor="pickup-radio">Pick up</label>
                <input
                  type="radio"
                  id="pickup-radio"
                  value="pickup"
                  {...register("orderMode")}
                />
              </div>
              {errors.orderMode && (
                <p className={styles.errorMessage}>
                  {errors.orderMode.message}
                </p>
              )}
            </div>
            <div className={styles.nameWrapper}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className={styles.errorMessage}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.phoneWrapper}>
              <label htmlFor="phone">TeleBirr Phone Number:</label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                placeholder="0911223344"
              />
              {errors.phone && (
                <p className={styles.errorMessage}>{errors.phone.message}</p>
              )}
            </div>

            {selectedOrderMode === "delivery" && (
              <div className={styles.selectWrapper}>
                <label htmlFor="area">Delivery area:</label>
                <select id="area" {...register("area")}>
                  <option value="select">Select</option>
                  <option value="bole">Bole</option>
                  <option value="megenagna">Megenagna</option>
                  <option value="piassa">Piassa</option>
                  <option value="kazanchis">Kazanchis</option>
                  <option value="legehar">Legehar</option>
                </select>
                {errors.area && (
                  <p className={styles.errorMessage}>{errors.area.message}</p>
                )}
              </div>
            )}
          </form>
        </div>
        <div className={styles.checkoutCart}>
          <h2>Review your cart</h2>
          {checkoutCount > 0 ? (
            <div className={styles.checkoutItemsWrapper}>
              {checkoutCartElements}
            </div>
          ) : (
            <p className={styles.emptyCartMessage}>Your cart is empty.</p>
          )}

          <ul>
            <li>
              <p>Subtotal</p>
              <p>{`ETB ${subTotalString}`}</p>
            </li>
            <li>
              <p>Delivery Fee</p>
              <p>{`ETB ${deliveryFeeString}`}</p>
            </li>
            <li>
              <p>Grand Total</p>
              {checkoutCount > 0 ? <p>{`ETB ${totalString}`}</p> : <p>0</p>}
            </li>
          </ul>

          <button
            className={checkoutCount <= 0 ? styles.payed : styles.payButton}
            onClick={handleSubmit(handlePay)}
            disabled={checkoutCount <= 0}
          >
            Pay Now
          </button>
          {isPayed && (
            <p className={styles.paymentMessage}>Payment successful</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
