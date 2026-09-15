import CategoryBar from "../../components/CategoryBar/CategoryBar";
import DishList from "../../components/DishList/DishList";
import SearchBox from "../../components/SearchBox/SearchBox";
import useFetch from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import styles from "./Menu.module.css";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "All";
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);
  const [query, setQuery] = useState("");

  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p>{error}</p>;

  const searchQuery = query.trim().toLowerCase();
  const shown = dishes.filter(
    (dish) =>
      dish?.nameEn?.toLowerCase().includes(searchQuery) ||
      dish?.nameAm?.toLowerCase().includes(searchQuery),
  );

  const headingText = "Our Menu";
  const emptyMessage = "Sorry, dishes in this category are not available";

  return (
    <div className={styles.menu}>
      <CategoryBar
        key={category}
        selected={category}
        onSelect={setSearchParams}
      />
      <SearchBox query={query} setQuery={setQuery} />
      <DishList
        dishes={shown}
        headingText={headingText}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

export default Menu;
