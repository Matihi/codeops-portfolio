import Dish from "./Dish";

const DishList = ({ dishes }) => {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          slug={dish.slug}
          nameEn={dish.nameEn}
          nameAm={dish.nameAm}
        />
      ))}
    </div>
  );
};

export default DishList;
