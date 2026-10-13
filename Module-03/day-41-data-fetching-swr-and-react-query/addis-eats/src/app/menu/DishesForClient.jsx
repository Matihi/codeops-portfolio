"use client";
import Dish from "@/components/dishes/Dish";

const DishesForClient = ({ initial }) => {
  return (
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
  );
};

export default DishesForClient;
