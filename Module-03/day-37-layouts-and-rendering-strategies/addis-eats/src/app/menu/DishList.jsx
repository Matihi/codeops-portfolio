import Link from "next/link";
import getDishes from "@/services/dishes";

const DishList = async ({ url }) => {
  const dishes = await getDishes(url);
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {dishes.map((dish) => (
        <Link
          href={`/menu/${dish.slug}`}
          className="border-2 border-black"
          key={dish.id}
        >
          <p>{dish.nameEn}</p>
          <p>{dish.nameAm}</p>
        </Link>
      ))}
    </div>
  );
};

export default DishList;
