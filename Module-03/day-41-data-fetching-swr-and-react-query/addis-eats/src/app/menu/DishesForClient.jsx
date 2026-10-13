"use client";
import Dish from "@/components/dishes/Dish";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useDebounce } from "use-debounce";

const DishesForClient = ({ category, initial }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced] = useDebounce(searchTerm, 300);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultCat = category ? category : "All Dishes";

  const key =
    `/api/dishes?category=${encodeURIComponent(defaultCat)}` +
    `&q=${encodeURIComponent(debounced)}`;

  const { data, error, isLoading } = useSWR(debounced ? key : null, fetcher, {
    fallbackData: initial,
  });

  const noDishes = data.length === 0;

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
      {isLoading ? (
        <p>Loading dishes...</p>
      ) : error ? (
        <p>Could not load dishes.</p>
      ) : noDishes ? (
        <p>{`Sorry, dishes in this category are not available`}</p>
      ) : (
        <div className="grid grid-cols-4 gap-2.5">
          {data.map((dish) => (
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
      )}
    </div>
  );
};

export default DishesForClient;
