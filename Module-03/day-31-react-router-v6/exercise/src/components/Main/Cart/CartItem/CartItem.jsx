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
      <p className={styles.dishName}>{dish.name}</p>
      <p className={styles.dishPrice}>{dish.price?.toLocaleString()} ETB</p>
      <div className={styles["change-quantity"]}>
        <div className={styles.decCountInc}>
          <button
            className={styles["decrement-cart-item"]}
            onClick={handleDecrement}
          >
            {"\u2212"}
          </button>
          <p className={styles.dishQuantity}>{String(dish.quantity)}</p>
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
    </div>
  );
};

export default CartItem;
