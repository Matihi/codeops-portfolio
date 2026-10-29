import Link from "next/link";
import CardButtons from "./CardButtons";
import Image from "next/image";
import { etb } from "@/lib/format";

const Dish = ({
  id,
  slug,
  nameEn,
  nameAm,
  price,
  image,
  description,
  spiceLevel,
  isFasting,
  isSpecial,
}) => {
  return (
    <div className="flex flex-col border-2 border-black p-1 h-[20.34rem]">
      <Link
        href={`/menu/${slug}`}
        className="flex flex-col p-0.5 border border-black  aspect-video w-full relative overflow-hidden"
      >
        <Image
          className="h-full object-cover"
          src={image}
          fill={true}
          priority={true}
          alt={nameEn}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-col">
        <p className="font-playfair-display">{nameEn}</p>
        <p>{nameAm}</p>
        <p>{etb.format(price)}</p>
      </div>
      <CardButtons
        id={id}
        price={price}
        nameEn={nameEn}
        nameAm={nameAm}
        description={description}
        image={image}
      />
    </div>
  );
};

export default Dish;
