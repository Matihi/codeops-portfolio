import { FaTrashAlt } from "react-icons/fa";
import useCartStore from "../../../stores/cartStore";

import "./Cart.css";

const Cart = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  console.log("cart cartItems");
  console.log(cartItems);
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

  const cartElements = cartItems.map((dish) => {
    return (
      <div key={dish.id} className="cart-item">
        <div>
          <p>{dish.name}</p>
        </div>
        <div>
          <p>{dish.price?.toLocaleString()} ETB</p>
        </div>
        <div className="change-quantity">
          <button
            className="decrement-cart-item"
            onClick={() => decrementQuantity(dish.id)}
          >
            {"\u2212"}
          </button>
          <div>
            <p>{String(dish.quantity)}</p>
          </div>

          <button
            className="increment-cart-item"
            onClick={() => incrementQuantity(dish.id)}
          >
            {"\u002B"}
          </button>
        </div>
        <button
          className="remove-cart-item"
          onClick={() => removeDish(dish.id)}
        >
          <FaTrashAlt />
        </button>
      </div>
    );
  });

  return (
    <aside className="cart-comp">
      <h2>Your Order</h2>
      <button className="clear-cart" onClick={() => clearCart()}>
        Clear Cart
      </button>

      <>{cartElements}</>
      <p>Distinct Dishes: {String(cartItems.length)}</p>
      <p>Total Dishes: {String(totalItems)}</p>
      <p>Total Price: {totalPrice?.toLocaleString()} ETB</p>
    </aside>
  );
};
export default Cart;
