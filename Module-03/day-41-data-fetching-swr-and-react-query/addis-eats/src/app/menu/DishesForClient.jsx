"use client";
import Dish from "@/components/dishes/Dish";
import { useState } from "react";

const DishesForClient = ({ category, initial }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(searchTerm);

  return (
    <div className="p-1">
      <search className="p-1 pb-3">
        <input
          type="text"
          placeholder="Search dishes"
          className="p-2  border"
          value={searchTerm}
          onChange={handleChange}
        />
      </search>
      <div className="grid grid-cols-4 gap-2.5">
        {initial.map((dish) => (
          <Dish
            key={dish.id}
            id={dish.id}
            slug={dish.slug}
            nameEn={dish.nameEn}
            nameAm={dish.nameAm}
            price={dish.priceETB}
          />
        ))}
      </div>
    </div>
  );
};

export default DishesForClient;
