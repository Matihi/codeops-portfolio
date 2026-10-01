import { useEffect, useState } from "react";
import { useAuth } from "../../context/authentication/AuthProvider";
import useCartStore from "../../stores/cartStore";
import validate from "../../utils/checkoutValidation";
import styles from "./Checkout.module.css";

const initialFormData = {
  orderMode: "delivery",
  name: "",
  phone: "",
  area: "select",
  notes: "",
};

const Checkout = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [touched, setTouched] = useState({});
  const [isPayed, setIsPayed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartItems = useCartStore((s) => s.cartItems);
  const clearCart = useCartStore((s) => s.clearCart);

  const deliveryFee = formData.orderMode === "delivery" ? 70.5 : 0;
  const deliveryFeeString = deliveryFee.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const checkoutCount = cartItems.length;

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    }));
  }, [user]);

  console.log("formData");
  console.log(formData);

  const errors = validate(formData);
  console.log("errors from validate");
  console.log(errors);

  const show = (field) => touched[field] && errors[field];

  const errorKey = Object.keys(formData).find(
    (key) => !!touched[key] && !!errors[key] === true,
  );

  console.log("errorField");
  console.log(errorKey);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  console.log("touched fields");
  console.log(touched);

  const handlePay = (e) => {
    e.preventDefault();
    console.log("hi");

    if (checkoutCount > 0) {
      if (isSubmitting) {
        return;
      }
      Object.entries(formData).forEach(([name]) =>
        setTouched((previous) => ({ ...previous, [name]: true })),
      );

      if (Object.keys(errors).length > 0) {
        return;
      } else {
        setIsSubmitting(true);
        const randomString = (length) =>
          Math.random()
            .toString(36)
            .substring(2, 2 + length);
        const paymentID = randomString(12);
        const deliveryDetail = { ...formData, paymentID };
        console.log("deliveryDetail");
        console.log(deliveryDetail);

        setTouched({});

        setTimeout(() => {
          setIsSubmitting(false);
          clearCart();
          setIsPayed(true);
          setFormData(initialFormData);
        }, 3000);
      }
    }
  };

  const checkoutCartElements = cartItems.map((item) => (
    <div key={item.id} className={styles.checkoutCartItem}>
      <p>{`${String(item.quantity)}x`}</p>
      <p>{item.name}</p>
      <p>{`ETB ${item.price.toLocaleString([], {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`}</p>
    </div>
  ));

  const subTotal = useCartStore((s) =>
    s.cartItems.reduce(
      (accumulator, current) => accumulator + current.price * current.quantity,
      0,
    ),
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
          <form
            method="post"
            id="checkout-form"
            className={styles.checkoutForm}
            onSubmit={handlePay}
            noValidate
          >
            <div className={styles.orderModeWrapper}>
              <div className={styles.deliveryWrapper}>
                <label htmlFor="deliveryRadio">Delivery</label>
                <input
                  type="radio"
                  name="orderMode"
                  id="deliveryRadio"
                  value="delivery"
                  checked={formData.orderMode === "delivery"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={show("orderMode")}
                  aria-describedby={
                    show("orderMode") ? "orderMode-error" : undefined
                  }
                />
              </div>
              <div className={styles.pickupWrapper}>
                <label htmlFor="pickupRadio">Pick up</label>
                <input
                  type="radio"
                  name="orderMode"
                  id="pickupRadio"
                  value="pickup"
                  checked={formData.orderMode === "pickup"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={show("orderMode")}
                  aria-describedby={
                    show("orderMode") ? "orderMode-error" : undefined
                  }
                />
              </div>
              {show("orderMode") && (
                <p
                  id="orderMode-error"
                  role="alert"
                  className={styles.errorMessage}
                >
                  {errors.orderMode}
                </p>
              )}
            </div>
            <div className={styles.nameWrapper}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={show("name")}
                aria-describedby={show("name") ? "name-error" : undefined}
              />
              {show("name") && (
                <p id="name-error" role="alert" className={styles.errorMessage}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.phoneWrapper}>
              <label htmlFor="phone">TeleBirr Phone Number:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                placeholder="0911223344"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={show("phone")}
                aria-describedby={show("phone") ? "phone-error" : undefined}
              />
              {show("phone") && (
                <p
                  id="phone-error"
                  role="alert"
                  className={styles.errorMessage}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {formData.orderMode === "delivery" && (
              <div className={styles.selectWrapper}>
                <label htmlFor="area">Delivery area:</label>
                <select
                  name="area"
                  id="area"
                  value={formData.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={show("area")}
                  aria-describedby={show("area") ? "area-error" : undefined}
                >
                  <option value="select">Select</option>
                  <option value="bole">Bole</option>
                  <option value="megenagna">Megenagna</option>
                  <option value="piassa">Piassa</option>
                  <option value="kazanchis">Kazanchis</option>
                  <option value="legehar">Legehar</option>
                </select>
                {show("area") && (
                  <p
                    id="area-error"
                    role="alert"
                    className={styles.errorMessage}
                  >
                    {errors.area}
                  </p>
                )}
              </div>
            )}

            <div className={styles.notesWrapper}>
              <label htmlFor="notes">{`Special instructions(optional)`}:</label>
              <textarea
                name="notes"
                id="notes"
                rows="4"
                cols="30"
                value={formData.notes}
                placeholder="e.g., extra napkins"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={show("notes")}
                aria-describedby={show("notes") ? "notes-error" : undefined}
              ></textarea>
              {show("notes") && (
                <p
                  id="notes-error"
                  role="alert"
                  className={styles.errorMessage}
                >
                  {errors.notes}
                </p>
              )}
            </div>
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

          <p>{`Subtotal: ETB ${subTotalString}`}</p>
          <p>{`Delivery Fee: ETB ${deliveryFeeString}`}</p>
          {checkoutCount > 0 ? (
            <p>{`Total: ETB ${totalString}`}</p>
          ) : (
            <p>Total: ETB 0</p>
          )}
          <button
            type="submit"
            disabled={
              isSubmitting || errorKey !== undefined || checkoutCount <= 0
            }
            form="checkout-form"
            className={
              isSubmitting || errorKey !== undefined || checkoutCount <= 0
                ? styles.disabled
                : styles.payButton
            }
          >
            {isSubmitting
              ? "Sending your order..."
              : checkoutCount > 0
                ? `Pay – ${totalString}`
                : "Pay Now"}
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
