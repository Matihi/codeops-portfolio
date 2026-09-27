import { useMemo, useReducer } from "react";
import cartReducer from "./cartReducer";
import { CartContext } from "./useCart";

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const totalPrice = cart.cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0,
  );

  const totalItems = cart.cartItems.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0,
  );

  const value = useMemo(
    () => ({ cart, dispatch, totalPrice, totalItems }),
    [cart.cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
