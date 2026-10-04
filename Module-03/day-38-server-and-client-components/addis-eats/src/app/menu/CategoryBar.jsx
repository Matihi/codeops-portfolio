"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CategoryBar = ({ categories }) => {
  const [selected, setSelected] = useState(undefined);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    setSelected(category);
    replace(`${pathname}?${params.toString()}`);
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
