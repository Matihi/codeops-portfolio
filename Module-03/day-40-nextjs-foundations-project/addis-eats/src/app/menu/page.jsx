import DishList from "@/components/dishes/DishList";
import FilterShell from "./FilterShell";
import { Suspense } from "react";

const Menu = async ({ searchParams }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { category } = await searchParams;

  return (
    <section className="p-1">
      <h1>Menu</h1>
      <FilterShell>
        <Suspense fallback={<p>Loading Dishes...</p>}>
          <DishList url={url} category={category} />
        </Suspense>
      </FilterShell>
    </section>
  );
};

export default Menu;
