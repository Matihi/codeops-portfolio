import DishesForClient from "./DishesForClient";
import getDishes from "@/services/dishes";

const Menu = async ({ searchParams }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { category } = await searchParams;

  const dishes = await getDishes(url);

  const shown =
    !category || category === "All Dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section className="p-1">
      <h1>Menu</h1>
      <DishesForClient initial={shown} />
    </section>
  );
};

export default Menu;
