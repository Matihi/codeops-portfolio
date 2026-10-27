"use client";
import useSWR from "swr";
import Dish from "./Dish";
import getDishes from "@/services/dishes";

const DishList = ({ url, category }) => {
  const fetcher = async function (url) {
    const dishes = await getDishes(url);
    return dishes;
  };

  const { data, isLoading, error } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
  });

  if (isLoading) {
    console.log("Loading");
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {data?.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          slug={dish.slug}
          nameEn={dish.nameEn}
          nameAm={dish.nameAm}
          price={dish.priceETB}
          image={`/images/${dish.slug}.png`}
        />
      ))}
    </div>
  );
};

export default DishList;
