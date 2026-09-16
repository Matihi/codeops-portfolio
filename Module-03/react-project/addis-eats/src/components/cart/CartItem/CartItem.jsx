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
    //   <div className={styles["cart-item"]}>
    //     <p className={styles.dishName}>{dish.name}</p>
    //     <p className={styles.dishPrice}>{dish.price?.toLocaleString()} ETB</p>
    //     <div className={styles["change-quantity"]}>
    //       <div className={styles.decCountInc}>
    //         <button
    //           className={styles["decrement-cart-item"]}
    //           onClick={handleDecrement}
    //         >
    //           {"\u2212"}
    //         </button>
    //         <p className={styles.dishQuantity}>{String(dish.quantity)}</p>
    //         <button
    //           className={styles["increment-cart-item"]}
    //           onClick={handleIncrement}
    //         >
    //           {"\u002B"}
    //         </button>
    //       </div>

    //       <button className={styles["remove-cart-item"]} onClick={handleRemove}>
    //         <FaTrashAlt />
    //       </button>
    //     </div>
    //   </div>

    <div className={styles.cartItem}>
      <div className={styles.imageAndTextWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={dish.image}
            alt={dish.name}
            width={100}
            height={100}
            className={styles.cartImage}
          />
        </div>
        <div className={styles.textwrapper}>
          <div className={styles.nameWrapper}>
            <h3>{dish.name}</h3>
            <p>{`${dish.nameAm}`}</p>
          </div>
          <p className={styles.description}>{dish.description}</p>
        </div>
      </div>

      <div className={styles.priceAndButtonWrapper}>
        <p className={styles.price}>{`ETB ${dish.price}`}</p>
        <div className={styles.decCountInc}>
          <button className={styles.decrement} onClick={handleDecrement}>
            {"\u2212"}
          </button>
          <p className={styles.count}>{String(dish.quantity)}</p>
          <button className={styles.increment} onClick={handleIncrement}>
            {"\u002B"}
          </button>
        </div>
        <button className={styles.remove} onClick={handleRemove}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
