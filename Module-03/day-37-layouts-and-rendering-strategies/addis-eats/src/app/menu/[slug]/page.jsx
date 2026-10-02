import { notFound } from "next/navigation";
import getDishes from "@/services/dishes";
const DishDetail = async ({ params }) => {
  const { slug } = await params;
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    notFound();
  }

  return <div>DishDetail {slug}</div>;
};

export default DishDetail;
