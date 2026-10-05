import DishList from "./DishList";
import FilterShell from "./FilterShell";
import { Suspense } from "react";

const Menu = async ({ searchParams }) => {
  const { category } = await searchParams;

  return (
    <section>
      <h1>Menu</h1>
      <FilterShell>
        <Suspense fallback={<p>Loading Dishes...</p>}>
          <DishList category={category} />
        </Suspense>
      </FilterShell>
    </section>
  );
};

export default Menu;
