import Link from "next/link";

const Dish = ({ id, slug, nameEn, nameAm, price }) => {
  return (
    <div className="border-2 border-black p-1">
      <Link
        href={`/menu/${slug}`}
        className="flex flex-col p-0.5 border border-black"
      >
        <p>{nameEn}</p>
        <p>{nameAm}</p>
        <p>ETB {price}</p>
      </Link>
    </div>
  );
};

export default Dish;
