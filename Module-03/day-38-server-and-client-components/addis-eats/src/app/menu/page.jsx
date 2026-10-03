export const revalidate = 3600;
import getDishes from "@/services/dishes";
import DishList from "./DishList";
import { Suspense } from "react";

const Menu = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const dishes = await getDishes(url);

  return (
    <section>
      <h1>Menu</h1>
      <Suspense fallback={<p>Loading Dishes...</p>}>
        <DishList dishes={dishes} />
      </Suspense>
    </section>
  );
};

export default Menu;
