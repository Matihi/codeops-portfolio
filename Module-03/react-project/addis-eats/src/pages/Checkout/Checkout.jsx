import { useEffect, useState } from "react";
import { useAuth } from "../../context/authentication/AuthProvider";
import useCartStore from "../../stores/cartStore";
import styles from "./Checkout.module.css";

const initialFormData = {
  orderMode: "delivery",
  name: "",
  phone: "",
  area: "select",
};

const Checkout = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const phonePattern = /^(?:\+251|0)9\d{8}$/;

  const deliveryFee = formData.orderMode === "delivery" ? 70.5 : 0;
  const deliveryFeeString = deliveryFee.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isPickup = formData.orderMode === "pickup";

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

  const validateControl = (name, value) => {
    switch (name) {
      case "orderMode": {
        if (value === "delivery" || value === "pickup") {
          return "";
        }

        return "Please choose delivery mode";
      }
      case "name": {
        if (value.trim().length < 1) {
          return "Name field is required";
        }
        return "";
      }
      case "phone": {
        if (value.trim().length < 1) {
          return "Phone field is required";
        } else if (!phonePattern.test(value.trim())) {
          return "Phone number should be a valid TeleBirr phone number";
        }
        return "";
      }
      case "area": {
        if (isPickup) {
          return "";
        }
        if (value === "select" || value === "") {
          return "Please enter delivery area";
        }
        return "";
      }
    }
  };

  const validateForm = () => {
    const errors = Object.entries(formData).map(([name, value]) =>
      validateControl(name, value),
    );
    console.log(errors);

    const error = errors.find((error) => error !== "");
    return error === undefined ? "" : error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => {
      const updatedData = { ...previous, [name]: value };
      if (name === "orderMode" && value === "pickup") {
        updatedData.area = "select";
        setErrorMessage("");
      }
      return updatedData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateControl(name, value.trim());
    setErrorMessage(error);
  };

  const handlePay = () => {
    if (checkoutCount > 0) {
      let error = validateForm(formData);
      if (error !== "") {
        setErrorMessage(error);
      } else {
        const randomString = (length) =>
          Math.random()
            .toString(36)
            .substring(2, 2 + length);
        const paymentID = randomString(12);
        const deliveryDetail = { ...formData, paymentID };
        console.log(deliveryDetail);

        setFormData(initialFormData);
        clearCart();
        setIsPayed(true);
      }
    }
  };

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
                <label htmlFor={styles.deliveryRadio}>Delivery</label>
                <input
                  type="radio"
                  name="orderMode"
                  id={styles.deliveryRadio}
                  value="delivery"
                  checked={formData.orderMode === "delivery"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.pickupWrapper}>
                <label htmlFor={styles.pickupRadio}>Pick up</label>
                <input
                  type="radio"
                  name="orderMode"
                  id={styles.pickupRadio}
                  value="pickup"
                  checked={formData.orderMode === "pickup"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className={styles.nameWrapper}>
              <label htmlFor={styles.name}>Name:</label>
              <input
                type="text"
                name="name"
                id={styles.name}
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className={styles.phoneWrapper}>
              <label htmlFor={styles.phone}>TeleBirr Phone Number:</label>
              <input
                type="tel"
                name="phone"
                id={styles.phone}
                value={formData.phone}
                placeholder="0911223344"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {formData.orderMode === "delivery" && (
              <div className={styles.selectWrapper}>
                <label htmlFor={styles.area}>Delivery area:</label>
                <select
                  name="area"
                  id={styles.area}
                  value={formData.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="select">Select</option>
                  <option value="bole">Bole</option>
                  <option value="megenagna">Megenagna</option>
                  <option value="piassa">Piassa</option>
                  <option value="kazanchis">Kazanchis</option>
                  <option value="legehar">Legehar</option>
                </select>
              </div>
            )}

            <p className={styles.errorMessage}>{errorMessage}</p>
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

          <button className={styles.payButton} onClick={handlePay}>
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
