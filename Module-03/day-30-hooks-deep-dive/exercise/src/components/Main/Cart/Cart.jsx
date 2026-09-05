import { useContext } from "react";
import { CartContext } from "../../../context/cart/CartProvider";
import { FaTrashAlt } from "react-icons/fa";

import "./Cart.css";

const Cart = () => {
  const cartContextValue = useContext(CartContext);
  const cartItems = cartContextValue.cart.cartItems;
  console.log("cart cartItems");
  console.log(cartItems);

  const cartElements = cartContextValue.cart.cartItems.map((dish) => {
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
            className="increment-cart-item"
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
          className="remove-cart-item"
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
    <aside className="cart-comp">
      <h2>Your Order</h2>
      <button
        className="clear-cart"
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
