export const revalidate = 3600;
import DishList from "./DishList";
import { Suspense } from "react";

const Menu = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";

  return (
    <section>
      <h1>Menu</h1>
      <Suspense fallback={<p>Loading Dishes...</p>}>
        <DishList url={url} />
      </Suspense>
    </section>
  );
};

export default Menu;
