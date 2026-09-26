import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./DishDetail.module.css";

const DishDetail = () => {
  const { slug } = useParams();
  const category = "All";
  const url = "/data/dishes.json";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);
  const cartContextValue = useContext(CartContext);
  console.log(cartContextValue);

  const currency = "ETB";

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p>{error}</p>;

  const shownDish = dishes.find((dish) => dish.slug === slug);
  if (!shownDish) return <p>Dish not found</p>;

  const dishForCart = {
    id: shownDish.id,
    name: shownDish.name,
    price: shownDish.price,
    quantity: 0,
  };
  console.log(dishForCart);

  const cartDish = cartContextValue.cart.cartItems.find(
    (dish) => dish.id === shownDish.id,
  );

  console.log("cartDish");
  console.log(cartDish);

  const count = cartDish?.quantity ?? 0;

  const handleAddingToCart = () => {
    cartContextValue.dispatch({
      type: "dish_added",
      dish: dishForCart,
    });
  };

  const handleIncrement = () => {
    cartContextValue.dispatch({
      type: "quantity_incremented",
      id: shownDish.id,
    });
  };

  const handleDecrement = () => {
    cartContextValue.dispatch({
      type: "quantity_decremented",
      id: shownDish.id,
    });
  };

  const handleRemove = () => {
    cartContextValue.dispatch({
      type: "dish_removed",
      id: shownDish.id,
    });
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

export default DishDetail;
