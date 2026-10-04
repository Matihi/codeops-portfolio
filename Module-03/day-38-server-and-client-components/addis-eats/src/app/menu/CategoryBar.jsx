"use client";
import { useState } from "react";

const CategoryBar = ({ categories }) => {
  const [selected, setSelected] = useState(undefined);
  const handleClick = (category) => {
    setSelected(category);
  };
  const categoryButtons = categories.map((category) => (
    <button
      className={`${selected === category.category ? `bg-[#7a1401] text-white` : `bg-[#fceae4] `} rounded-sm p-1 text-xs hover:bg-[#7a1401] hover:text-white
    `}
      key={category.id}
      onClick={() => handleClick(category.category)}
    >
      {category.category}
    </button>
  ));

  return <div className="category-bar flex space-x-1">{categoryButtons}</div>;
};

export default CategoryBar;
