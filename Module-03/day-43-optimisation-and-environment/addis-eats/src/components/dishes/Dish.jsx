import Link from "next/link";
import CardButtons from "./CardButtons";
import Image from "next/image";

const Dish = ({ id, slug, nameEn, nameAm, price, image }) => {
  return (
    <div className="flex flex-col border-2 border-black p-1 h-fit">
      <Link
        href={`/menu/${slug}`}
        className="flex flex-col p-0.5 border border-black"
      >
        <Image
          src={image}
          width={300}
          height={300}
          alt={nameEn}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <p className="font-playfair-display">{nameEn}</p>
      <p>{nameAm}</p>
      <p>ETB {price}</p>
      <CardButtons id={id} price={price} />
    </div>
  );
};

export default Dish;
