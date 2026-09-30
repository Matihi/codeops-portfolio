import { FaTrashAlt } from "react-icons/fa";
import useCartStore from "../../../stores/cartStore";
import styles from "./DishDetailContent.module.css";

const DishDetailContent = ({ shownDish }) => {
  const addDish = useCartStore((s) => s.addDish);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);

  const currency = "ETB";

  const dishForCart = {
    id: shownDish.id,
    name: shownDish.name,
    price: shownDish.price,
    quantity: 0,
  };
  console.log(dishForCart);

  const cartDish = useCartStore((s) =>
    s.cartItems.find((dish) => dish.id === shownDish.id),
  );

  console.log("cartDish");
  console.log(cartDish);

  const count = cartDish?.quantity ?? 0;

  const handleAddingToCart = () => {
    addDish(dishForCart);
  };

  const handleIncrement = () => {
    incrementQuantity(shownDish.id);
  };

  const handleDecrement = () => {
    decrementQuantity(shownDish.id);
  };

  const handleRemove = () => {
    removeDish(shownDish.id);
  };

  return (
    <section className={styles.dishDetail}>
      <h1 className={styles.dishName}>{shownDish.name}</h1>
      <div className={styles.restWrapper}>
        <div className={styles.imageAndButton}>
          <div className={styles.imageWrapper}>
            <img
              src={shownDish.image}
              alt={shownDish.name}
              className={styles.image}
              width={300}
              height={300}
            />
          </div>
          <div className={styles.buttonWrapper}>
            {cartDish === undefined ? (
              <button className={styles.addToCart} onClick={handleAddingToCart}>
                Add to Cart
              </button>
            ) : (
              <div className={styles.countContainer}>
                <button className={styles.remove} onClick={handleRemove}>
                  <FaTrashAlt />
                </button>
                <div className={styles.decCountInc}>
                  <button
                    className={styles.decrement}
                    onClick={handleDecrement}
                  >
                    {"\u2212"}
                  </button>
                  {count > 0 ? (
                    <p className={styles.count}>{count}</p>
                  ) : (
                    <p className={styles.count}></p>
                  )}
                  <button
                    className={styles.increment}
                    onClick={handleIncrement}
                  >
                    {"\u002B"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.otherWrapper}>
          <div className={styles.priceCategoryAndSpicy}>
            <p>{shownDish.category}</p>
            {shownDish.spicy ? <p>Spicy</p> : <></>}
            <p className={styles.price}>{`${currency} ${shownDish.price}`}</p>
          </div>

          <p className={styles.description}>{shownDish.description}</p>
        </div>
      </div>
    </section>
  );
};

export default DishDetailContent;
