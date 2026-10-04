export const revalidate = 3600;
import getDishes from "@/services/dishes";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";
import { Suspense } from "react";

const Menu = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const dishes = await getDishes(url);

  const categories = [
    { id: 0, category: "All Dishes" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  return (
    <section>
      <h1>Menu</h1>
      <FilterShell>
        <CategoryBar categories={categories} />
        <Suspense fallback={<p>Loading Dishes...</p>}>
          <DishList dishes={dishes} />
        </Suspense>
      </FilterShell>
    </section>
  );
};

export default Menu;
