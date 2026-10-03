import Link from "next/link";

const Dish = ({ id, slug, nameEn, nameAm }) => {
  return (
    <div className="border-2 border-black p-1">
      <Link
        href={`/menu/${slug}`}
        className="flex flex-col p-0.5 border border-black"
      >
        <p>{nameEn}</p>
        <p>{nameAm}</p>
      </Link>
    </div>
  );
};

export default Dish;
