import Dish from "./Dish";
import getDishes from "@/services/dishes";

const DishList = async ({ category }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const dishes = await getDishes(url);

  const shown =
    !category || category === "All Dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  console.log(category);

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {shown.map((dish) => (
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

export default DishList;
