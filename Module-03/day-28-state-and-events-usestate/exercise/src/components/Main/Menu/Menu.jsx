import CategoryBar from "./CategoryBar/CategoryBar";
import DishList from "./DishList/DishList";
import { useState } from "react";

import "./Menu.css";

function Menu({ dishes }) {
  const [category, setCategory] = useState("All");

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <div className="menu">
      <CategoryBar selected={category} onSelect={setCategory} />
      <DishList dishes={filteredDishes} />
    </div>
  );
}

export default Menu;
