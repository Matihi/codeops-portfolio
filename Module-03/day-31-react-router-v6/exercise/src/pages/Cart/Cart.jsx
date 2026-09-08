import { useContext } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Cart.module.css";

const Cart = () => {
  const cartContextValue = useContext(CartContext);
  const cartItems = cartContextValue.cart.cartItems;
  console.log("cart cartItems");
  console.log(cartItems);

  const cartElements = cartContextValue.cart.cartItems.map((dish) => {
    return (
      <div key={dish.id} className={styles["cart-item"]}>
        <div>
          <p>{dish.name}</p>
        </div>
        <div>
          <p>{dish.price?.toLocaleString()} ETB</p>
        </div>
        <div className={styles["change-quantity"]}>
          <button
            className={styles["decrement-cart-item"]}
            onClick={() =>
              cartContextValue.dispatch({
                type: "quantity_decremented",
                id: dish.id,
              })
            }
          >
            {"\u2212"}
          </button>
          <div>
            <p>{String(dish.quantity)}</p>
          </div>

          <button
            className={styles["increment-cart-item"]}
            onClick={() =>
              cartContextValue.dispatch({
                type: "quantity_incremented",
                id: dish.id,
              })
            }
          >
            {"\u002B"}
          </button>
        </div>
        <button
          className={styles["remove-cart-item"]}
          onClick={() =>
            cartContextValue.dispatch({
              type: "dish_removed",
              id: dish.id,
            })
          }
        >
          <FaTrashAlt />
        </button>
      </div>
    );
  });

  return (
    <aside className={styles["cart-comp"]}>
      <h2>Your Order</h2>
      <button
        className={styles["clear-cart"]}
        onClick={() => cartContextValue.dispatch({ type: "cart_cleared" })}
      >
        Clear Cart
      </button>

      <>{cartElements}</>
      <p>Distinct Dishes: {String(cartContextValue.cart.cartItems.length)}</p>
      <p>Total Dishes: {String(cartContextValue.totalItems)}</p>
      <p>Total Price: {cartContextValue.totalPrice?.toLocaleString()} ETB</p>
    </aside>
  );
};
export default Cart;
