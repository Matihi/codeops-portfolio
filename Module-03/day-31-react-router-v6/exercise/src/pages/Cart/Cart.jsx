import { useContext } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import CartItem from "../../components/Main/Cart/CartItem/CartItem";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartContextValue = useContext(CartContext);

  const cartElements = cartContextValue.cart.cartItems.map((dish) => (
    <CartItem
      key={dish.id}
      dish={dish}
      increment={cartContextValue.dispatch}
      decrement={cartContextValue.dispatch}
      remove={cartContextValue.dispatch}
    />
  ));

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

      <Link to="/checkout">Checkout</Link>
    </aside>
  );
};
export default Cart;
