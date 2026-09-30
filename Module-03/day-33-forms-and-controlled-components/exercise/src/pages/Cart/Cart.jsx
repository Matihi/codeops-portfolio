import CartItem from "../../components/Main/Cart/CartItem/CartItem";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";

const Cart = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) =>
    s.cartItems.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0,
    ),
  );

  const totalPrice = useCartStore((s) =>
    s.cartItems.reduce(
      (accumulator, current) => accumulator + current.price * current.quantity,
      0,
    ),
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

  return (
    <aside className={styles["cart-comp"]}>
      <h2>Your Order</h2>
      {cartCount === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <button className={styles["clear-cart"]} onClick={() => clearCart()}>
            Clear Cart
          </button>
          <>{cartElements}</>
          <p>Distinct Dishes: {String(cartItems.length)}</p>
          <p>Total Dishes: {String(totalItems)}</p>
          <p>Total Price: {totalPrice?.toLocaleString()} ETB</p>
          <Link className={styles.checkoutLink} to="/checkout">
            Checkout
          </Link>
        </>
      )}
    </aside>
  );
};
export default Cart;
