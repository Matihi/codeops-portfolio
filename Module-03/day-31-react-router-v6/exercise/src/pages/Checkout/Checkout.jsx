import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import { useAuth } from "../../context/authentication/AuthProvider";
import styles from "./Checkout.module.css";

const initialFormData = {
  orderMode: "delivery",
  name: "",
  phone: "",
  area: "select",
};

const Checkout = () => {
  const cartContextValue = useContext(CartContext);
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isPayed, setIsPayed] = useState(false);

  const deliveryFee = formData.orderMode === "delivery" ? 70.5 : 0;
  const deliveryFeeString = deliveryFee.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const checkoutCount = cartContextValue.cart.cartItems.length;

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      name: user?.name ?? "",
      phone: user?.phone ?? "",
    }));

    setIsReadOnly(true);
  }, [user]);

  console.log("formData");
  console.log(formData);

  const validateField = (name, value) => {
    switch (name) {
      case "area": {
        if (value === "select") {
          return "Please enter delivery area";
        }
        return "";
      }
    }
  };

  const validateForm = () => {
    if (formData.orderMode === "delivery" && formData.area === "select") {
      return "Please enter delivery area";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => {
      const updatedData = { ...previous, [name]: value };
      if (name === "orderMode" && value === "pickup") {
        updatedData.area = "select";
      }
      return updatedData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!(name === "orderMode" && value === "pickup")) {
      const error = validateField(name, value.trim());
      setErrorMessage(error);
    }
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
        cartContextValue.dispatch({ type: "cart_cleared" });
        setIsPayed(true);
      }
    }
  };

  const checkoutCartElements = cartContextValue.cart.cartItems.map((item) => (
    <div key={item.id} className={styles.checkoutCartItem}>
      <p>{`${String(item.quantity)}x`}</p>
      <p>{item.name}</p>
      <p>{`ETB ${item.price.toLocaleString([], {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`}</p>
    </div>
  ));

  const subTotal = cartContextValue.totalPrice;
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
      <>
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
                readOnly={isReadOnly}
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
                readOnly={isReadOnly}
              />
            </div>

            {formData.orderMode === "delivery" && (
              <div className={styles.selectWrapper}>
                <label htmlFor={styles.area}>Delivery area</label>
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
          {checkoutCartElements}
          <p>{`Subtotal: ETB ${subTotalString}`}</p>
          <p>{`Delivery Fee: ETB ${deliveryFeeString}`}</p>
          {checkoutCount > 0 ? (
            <p>{`Total: ETB ${totalString}`}</p>
          ) : (
            <p>Total: ETB 0</p>
          )}
          {isPayed && <p>Payment successfull</p>}
          <button onClick={handlePay}>Pay Now</button>
        </div>
      </>
    </div>
  );
};

export default Checkout;
