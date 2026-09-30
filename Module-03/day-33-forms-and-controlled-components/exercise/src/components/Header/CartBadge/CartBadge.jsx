import { FaCartShopping } from "react-icons/fa6";
import useCartStore from "../../../stores/cartStore";

import "./CartBadge.css";

const CartBadge = () => {
  const totalItems = useCartStore((s) =>
    s.cartItems.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0,
    ),
  );
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
