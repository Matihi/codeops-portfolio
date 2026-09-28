import React from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

const Menu = async () => {
  return (
    <div className="flex flex-col items-center">
      <CategoryBar />
      <DishList />
    </div>
  );
};

export default Menu;
