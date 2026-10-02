import React from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

const Menu = async () => {
  // throw new Error("test");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="flex flex-col items-center">
      <CategoryBar />
      <DishList />
    </div>
  );
};

export default Menu;
