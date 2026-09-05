import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from "../../../context/cart/CartProvider";
import { useContext } from "react";

import "./CartBadge.css";

const CartBadge = () => {
  const cartContextValue = useContext(CartContext);
  const totalItems = cartContextValue.totalItems;
  const threshold = 100;
  return (
    <div className="cartbadge">
      <FaCartShopping />
      <>
        {totalItems > threshold ? (
          <span>{String(threshold)}+</span>
        ) : (
          <span>{String(totalItems)}</span>
        )}
      </>
    </div>
  );
};

export default CartBadge;
