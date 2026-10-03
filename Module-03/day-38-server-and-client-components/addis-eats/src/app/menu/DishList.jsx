import Link from "next/link";

const DishList = ({ dishes }) => {
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
