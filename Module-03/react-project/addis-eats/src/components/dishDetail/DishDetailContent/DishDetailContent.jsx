import { FaTrashAlt } from "react-icons/fa";
import useCartStore from "../../../stores/cartStore";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./DishDetailContent.module.css";

const dishDetailContentFormSchema = z.object({
  spiceLevelCart: z.enum(["mild", "traditional", "fiery-awaze"], {
    errorMap: () => ({ message: "Please choose spice level" }),
  }),
});

const DishDetailContent = ({ shownDish }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dishDetailContentFormSchema),
    mode: "onChange",
    defaultValues: {
      spiceLevelCart: "traditional",
    },
  });

  const selectedSpiceLevel = useWatch({
    control,
    name: "spiceLevelCart",
  });

  const currency = "ETB";

  const ingredientElements = shownDish.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  const dishForCart = {
    id: shownDish.id,
    name: shownDish.nameEn,
    nameAm: shownDish.nameAm,
    price: shownDish.priceETB,
    description: shownDish.description,
    image: `/images/${shownDish.slug}.png`,
    quantity: 0,
    spiceLevelCart: selectedSpiceLevel,
  };

  const cartDish = useCartStore((s) =>
    s.cartItems.find((dish) => dish.id === shownDish.id),
  );

  const count = cartDish?.quantity ?? 0;
  const addDish = useCartStore((s) => s.addDish);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeDish = useCartStore((s) => s.removeDish);

  const handleAddingToCart = () => addDish(dishForCart);

  const handleIncrement = () => {
    if (!cartDish) {
      addDish(dishForCart);
    } else {
      incrementQuantity(shownDish.id);
    }
  };

  const handleDecrement = () => decrementQuantity(shownDish.id);

  const handleRemove = () => removeDish(shownDish.id);

  return (
    <section className={styles.dishDetail}>
      <div className={styles.imageAndIngredients}>
        <div className={styles.imageWrapper}>
          <img
            src={`/images/${shownDish.slug}.png`}
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
                  id="mild"
                  value="mild"
                  {...register("spiceLevelCart")}
                  className={styles.mild}
                />
                <label htmlFor="mild">{`Mild (1/3)`}</label>
              </div>
              <div className={styles.traditionalContainer}>
                <input
                  type="radio"
                  id="traditional"
                  value="traditional"
                  {...register("spiceLevelCart")}
                  className={styles.traditional}
                />
                <label htmlFor="traditional">{`Traditional (2/3)`}</label>
              </div>
              <div className={styles.fieryAwazeContainer}>
                <input
                  type="radio"
                  id="fieryAwaze"
                  value="fiery-awaze"
                  {...register("spiceLevelCart")}
                  className={styles.fieryAwaze}
                />
                <label htmlFor="fieryAwaze">{`Fiery Awaze (3/3)`}</label>
              </div>
              {errors.spiceLevelCart && (
                <p className={styles.errorMessage}>
                  {errors.spiceLevelCart.message}
                </p>
              )}
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

export default DishDetailContent;
