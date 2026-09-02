import CategoryBar from "./CategoryBar/CategoryBar";
import DishList from "./DishList/DishList";
import dishes from "../../../data/menu.json";
import { useState } from "react";

import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("All");

  const filteredDishes = dishes.filter((dish) =>
    category === "All" ? true : dish.category === category,
  );

  return (
    <div className="menu">
      <CategoryBar key={category} selected={category} onSelect={setCategory} />
      <DishList dishes={filteredDishes} />
    </div>
  );
}

export default Menu;
