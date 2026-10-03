import Link from "next/link";

const Dish = ({ id, slug, nameEn, nameAm }) => {
  return (
    <Link href={`/menu/${slug}`} className="border-2 border-black" key={id}>
      <p>{nameEn}</p>
      <p>{nameAm}</p>
    </Link>
  );
};

export default Dish;
