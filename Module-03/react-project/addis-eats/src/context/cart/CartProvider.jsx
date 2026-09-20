import { createContext, useMemo, useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);

const STORAGE_KEY = "addis-eats-cart";

const initialCart = { cartItems: [] };

const initializeCart = (defaultCart) => {
  const storedCart = localStorage.getItem(STORAGE_KEY);

  if (!storedCart) {
    return defaultCart;
  }

  try {
    return JSON.parse(storedCart);
  } catch (error) {
    console.log(error);
    return defaultCart;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart, initializeCart);

  useEffect(() => {
    try {
      const cartString = JSON.stringify(cart);
      localStorage.setItem(STORAGE_KEY, cartString);
    } catch (error) {
      console.log("Could not save cart to localStorage:", error);
    }
  }, [cart]);

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
