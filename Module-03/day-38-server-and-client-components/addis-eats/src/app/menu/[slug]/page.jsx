import { notFound } from "next/navigation";
import getDishes from "@/services/dishes";

const url = "https://addis-eats-backend.onrender.com/menu/";

export async function generateStaticParams() {
  const dishes = await getDishes(url);

  return dishes.map((dish) => ({ slug: dish.slug }));
}

const DishDetail = async ({ params }) => {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    notFound();
  }

  return <div>DishDetail {slug}</div>;
};

export default DishDetail;
