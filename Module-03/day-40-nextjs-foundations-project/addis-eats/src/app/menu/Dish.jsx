import Link from "next/link";
import CardButtons from "./CardButtons";

const Dish = ({ id, slug, nameEn, nameAm, price }) => {
  return (
    <div className="flex flex-col border-2 border-black p-1">
      <Link
        href={`/menu/${slug}`}
        className="flex flex-col p-0.5 border border-black"
      >
        <p>{nameEn}</p>
        <p>{nameAm}</p>
        <p>ETB {price}</p>
      </Link>
      <CardButtons id={id} price={price} />
    </div>
  );
};

export default Dish;
