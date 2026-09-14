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
      <FaCartShopping className="cart-icon" />
      <>
        {totalItems > threshold ? (
          <span className="badge-count">{String(threshold)}+</span>
        ) : (
          <span className="badge-count">{String(totalItems)}</span>
        )}
      </>
    </div>
  );
};

export default CartBadge;
