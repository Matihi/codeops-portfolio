import { useContext } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import CartItem from "../../components/cart/CartItem/CartItem";
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

  const cartCount = cartContextValue.cart.cartItems.length;

  return (
    <aside className={styles["cart-comp"]}>
      <h2>Your Order</h2>
      {cartCount === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.cartItemsAndLedger}>
          <div className={styles.clearAndCartItems}>
            <button
              className={styles["clear-cart"]}
              onClick={() =>
                cartContextValue.dispatch({ type: "cart_cleared" })
              }
            >
              Clear Cart
            </button>
            <div className={styles.cartItemsWrapper}>{cartElements}</div>
          </div>

          <section className={styles.cartLedger}>
            <h3>Basket Ledger</h3>
            <ul>
              <li>
                <p>Distinct Dishes</p>
                <p>{String(cartContextValue.cart.cartItems.length)}</p>
              </li>
              <li>
                <p>Total Dishes</p>
                <p>{String(cartContextValue.totalItems)}</p>
              </li>
              <li>
                <p>Total Price</p>

                <p>
                  {`ETB `}
                  {cartContextValue.totalPrice?.toLocaleString([], {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </li>
            </ul>

            <Link className={styles.checkoutLink} to="/checkout">
              Checkout
            </Link>
          </section>
        </div>
      )}
    </aside>
  );
};
export default Cart;
