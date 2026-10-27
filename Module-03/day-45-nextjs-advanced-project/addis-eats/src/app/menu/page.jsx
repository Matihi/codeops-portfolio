import DishesForClient from "./DishesForClient";
import getDishes from "@/services/dishes";

const Menu = async ({ searchParams }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { category } = await searchParams;

  const dishes = await getDishes(url);

  //give DishesForClient same number of dishes as paginated result on the first render, otherwise it will render all dishes.
  const shown =
    !category || category === "All Dishes"
      ? dishes.slice(0, 4)
      : dishes.filter((dish) => dish.category === category).slice(0, 4);

  return (
    <section className="p-1">
      <h1>Menu</h1>
      <DishesForClient category={category} initial={shown} />
    </section>
  );
};

export default Menu;
