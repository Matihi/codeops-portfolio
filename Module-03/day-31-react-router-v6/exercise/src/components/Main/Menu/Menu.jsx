import CategoryBar from "./CategoryBar/CategoryBar";
import DishList from "./DishList/DishList";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("All");
  const url = "/data/dishes.json";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="menu">
      <CategoryBar key={category} selected={category} onSelect={setCategory} />
      <DishList dishes={dishes} />
    </div>
  );
}

export default Menu;
