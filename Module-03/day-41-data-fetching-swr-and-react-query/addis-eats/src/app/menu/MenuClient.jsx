"use client";
import DishesForClient from "./DishesForClient";

const MenuClient = ({ shown }) => {
  return <DishesForClient initial={shown} />;
};

export default MenuClient;
