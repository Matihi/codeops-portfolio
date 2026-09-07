import CategoryBar from "../../components/Main/Menu/CategoryBar/CategoryBar";
import DishList from "../../components/Main/Menu/DishList/DishList";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "All";
  const url = "/data/dishes.json";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.menu}>
      <CategoryBar
        key={category}
        selected={category}
        onSelect={setSearchParams}
      />
      <DishList dishes={dishes} />
    </div>
  );
}

export default Menu;
