"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CategoryBar = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pathPattern = /^\/menu\/?$/;
  if (!pathPattern.test(pathname)) {
    return null;
  }

  const activeCategory = searchParams.get("category");
  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    console.log(params.toString());

    replace(`${pathname}?${params.toString()}`);
  };
  const categoryButtons = categories.map((category) => {
    const isActive = activeCategory === category.category;
    return (
      <button
        className={`${isActive ? `bg-[#7a1401] text-white` : `bg-[#fceae4] `} rounded-sm p-1 text-xs hover:bg-[#7a1401] hover:text-white
    `}
        key={category.id}
        onClick={() => handleClick(category.category)}
      >
        {category.category}
      </button>
    );
  });

  return (
    <div className="category-bar flex flex-col space-y-1">
      {categoryButtons}
    </div>
  );
};

export default CategoryBar;
