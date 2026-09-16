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

  const categories = [
    { id: 0, category: "All Dishes" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  const searchQuery = query.trim().toLowerCase();
  const shown = dishes.filter(
    (dish) =>
      dish?.nameEn?.toLowerCase().includes(searchQuery) ||
      dish?.nameAm?.toLowerCase().includes(searchQuery),
  );

  const loadingMessage = "Loading the menu...";
  const emptyMessage = "Sorry, dishes in this category are not available";

  return (
    <div className={styles.menu}>
      <div className={styles.heading}>
        <h1>Our Complete Culinary Heritage</h1>
        <p>
          Every dish is prepared daily from scratch using sun-dried spices,
          stone-ground legume flours, and clarified herbal butter sourced
          directly from highland farm cooperatives.
        </p>
      </div>

      <SearchBox query={query} setQuery={setQuery} />
      <CategoryBar
        selected={category}
        onSelect={setSearchParams}
        categories={categories}
      />
      <DishList
        dishes={shown}
        loading={loading}
        loadingMessage={loadingMessage}
        error={error}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

export default Menu;
