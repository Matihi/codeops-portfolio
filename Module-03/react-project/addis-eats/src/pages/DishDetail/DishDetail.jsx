import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart/CartProvider";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./DishDetail.module.css";

const initialFormData = {
  spiceLevelCart: "traditional",
};

const DishDetail = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { slug } = useParams();
  const category = "All";
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);
  const cartContextValue = useContext(CartContext);
  console.log(cartContextValue);

  const currency = "ETB";

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p>{error}</p>;

  const shownDish = dishes.find((dish) => dish.slug === slug);
  if (!shownDish) return <p>Dish not found</p>;

  const ingredientElements = shownDish.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  const handleChange = (e) => {
    setFormData((previous) => {
      const { name, value } = e.target;
      return { ...previous, [name]: value };
    });
  };

  console.log(formData);

  const dishForCart = {
    id: shownDish.id,
    name: shownDish.nameEn,
    nameAm: shownDish.nameAm,
    price: shownDish.priceETB,
    description: shownDish.description,
    image: "/images/doro-wot.jpg",
    quantity: 0,
    spiceLevelCart: formData.spiceLevelCart,
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
    if (!cartDish) {
      cartContextValue.dispatch({
        type: "dish_added",
        dish: dishForCart,
      });
    } else {
      cartContextValue.dispatch({
        type: "quantity_incremented",
        id: shownDish.id,
      });
    }
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
      <div className={styles.imageAndIngredients}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/doro-wot.jpg"
            alt={shownDish.nameEn}
            width={300}
            height={300}
            className={styles.image}
          />
        </div>
        <div className={styles.ingredientsWrapper}>
          <p>Ingredients</p>
          <ul className={styles.ingredients}>{ingredientElements}</ul>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.namePriceAndDescription}>
          <div className={styles.nameAndPrice}>
            <div className={styles.name}>
              <h1>{shownDish.nameEn}</h1>
              <p>{shownDish.nameAm}</p>
            </div>
            <p className={styles.price}>
              {`${currency}  `}
              <span>{shownDish.priceETB}</span>
            </p>
          </div>

          <div className={styles.descriptionAndServing}>
            <p className={styles.description}>{shownDish.description}</p>
            <p className={styles.servings}>{shownDish.servings}</p>
          </div>
        </div>
        {shownDish.category !== "Beverages & Tej" && (
          <form className={styles.choicesForm}>
            <p>Heat and Spice Level</p>
            <div className={styles.spiceChoicesContainer}>
              <div className={styles.mildContainer}>
                <input
                  type="radio"
                  name="spiceLevelCart"
                  id="mild"
                  value="mild"
                  checked={formData.spiceLevelCart === "mild"}
                  className={styles.mild}
                  onChange={handleChange}
                />
                <label htmlFor="mild">{`Mild (1/3)`}</label>
              </div>
              <div className={styles.traditionalContainer}>
                <input
                  type="radio"
                  name="spiceLevelCart"
                  id="traditional"
                  value="traditional"
                  className={styles.traditional}
                  checked={formData.spiceLevelCart === "traditional"}
                  onChange={handleChange}
                />
                <label htmlFor="traditional">{`Traditional (2/3)`}</label>
              </div>
              <div className={styles.fieryAwazeContainer}>
                <input
                  type="radio"
                  name="spiceLevelCart"
                  id="fieryAwaze"
                  value="fiery-awaze"
                  className={styles.fieryAwaze}
                  checked={formData.spiceLevelCart === "fiery-awaze"}
                  onChange={handleChange}
                />
                <label htmlFor="fieryAwaze">{`Fiery Awaze (3/3)`}</label>
              </div>
            </div>
          </form>
        )}

        <div className={styles.buttonWrapper}>
          <div className={styles.countContainer}>
            <button className={styles.remove} onClick={handleRemove}>
              <FaTrashAlt />
            </button>
            <div className={styles.decCountInc}>
              <button className={styles.decrement} onClick={handleDecrement}>
                {"\u2212"}
              </button>

              <p className={styles.count}>{count}</p>

              <button className={styles.increment} onClick={handleIncrement}>
                {"\u002B"}
              </button>
            </div>
          </div>
          <button className={styles.addToCart} onClick={handleAddingToCart}>
            {shownDish.category !== "Beverages & Tej"
              ? !cartDish
                ? `Add to Cart`
                : `Update Spice Level`
              : `Add to Cart`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DishDetail;
