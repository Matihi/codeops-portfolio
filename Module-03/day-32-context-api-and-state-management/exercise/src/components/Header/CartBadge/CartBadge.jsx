import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../context/cart/useCart";

import "./CartBadge.css";

const CartBadge = () => {
  const cartContextValue = useCart();
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
