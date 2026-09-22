import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DishDetailContent from "../../components/dishDetail/DishDetailContent/DishDetailContent";

const DishDetail = () => {
  const { slug } = useParams();
  const category = "All";
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p>{error}</p>;

  const shownDish = dishes.find((dish) => dish.slug === slug);
  if (!shownDish) return <p>Dish not found</p>;

  return <DishDetailContent shownDish={shownDish} />;
};

export default DishDetail;
