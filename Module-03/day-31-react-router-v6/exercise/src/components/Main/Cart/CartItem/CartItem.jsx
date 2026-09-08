import { FaTrashAlt } from "react-icons/fa";

import styles from "./CartItem.module.css";

const CartItem = ({ dish, increment, decrement, remove }) => {
  const handleIncrement = () =>
    increment({
      type: "quantity_incremented",
      id: dish.id,
    });

  const handleDecrement = () =>
    decrement({
      type: "quantity_decremented",
      id: dish.id,
    });

  const handleRemove = () =>
    remove({
      type: "dish_removed",
      id: dish.id,
    });

  return (
    <div className={styles["cart-item"]}>
      <div>
        <p>{dish.name}</p>
      </div>
      <div>
        <p>{dish.price?.toLocaleString()} ETB</p>
      </div>
      <div className={styles["change-quantity"]}>
        <button
          className={styles["decrement-cart-item"]}
          onClick={handleDecrement}
        >
          {"\u2212"}
        </button>
        <div>
          <p>{String(dish.quantity)}</p>
        </div>

        <button
          className={styles["increment-cart-item"]}
          onClick={handleIncrement}
        >
          {"\u002B"}
        </button>
      </div>
      <button className={styles["remove-cart-item"]} onClick={handleRemove}>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default CartItem;
