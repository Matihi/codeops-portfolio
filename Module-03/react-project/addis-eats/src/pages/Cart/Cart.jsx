import CartItem from "../../components/cart/CartItem/CartItem";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";

const Cart = () => {
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);
  const clearCart = useCartStore((s) => s.clearCart);

  const cartItems = useCartStore((s) => s.cartItems);
  const totalItems = cartItems.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0,
  );

  const cartElements = cartItems.map((dish) => (
    <CartItem
      key={dish.id}
      dish={dish}
      increment={incrementQuantity}
      decrement={decrementQuantity}
      remove={removeDish}
    />
  ));

  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0,
  );
  const totalPriceString = totalPrice?.toLocaleString([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
              onClick={() => clearCart()}
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
                <p>{String(cartCount)}</p>
              </li>
              <li>
                <p>Total Dishes</p>
                <p>{String(totalItems)}</p>
              </li>
              <li>
                <p>Total Price</p>

                <p>
                  {`ETB `}
                  {totalPriceString}
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
