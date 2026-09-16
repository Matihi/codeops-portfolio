import { useSearchParams } from "react-router-dom";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import DishList from "../../components/DishList/DishList";
import useFetch from "../../hooks/useFetch";

import styles from "./Home.module.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "All";
  const url = "https://addis-eats-backend.onrender.com/menu/specials";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  const categories = [
    { id: 0, category: "All Specials" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  if (loading) return <p>Loading special dishes...</p>;
  if (error) return <p>{error}</p>;

  const headingText = "Special Dishes";
  const emptyMessage = "Sorry, special dishes are not available";

  return (
    <div className={styles.home}>
      <div className={styles.homeHeading}>
        <h1>
          Communal Warmth, <span>Slow-Cooked Heritage</span>
        </h1>
        <p>
          Handcrafted wats, ancient stone-ground teff injera, and velvety kitfo
          simmered in 72-hour infused niter kibbeh and heirloom berbere
          harvested from the Ethiopian highlands.
        </p>
      </div>
      <CategoryBar
        key={category}
        selected={category}
        onSelect={setSearchParams}
        categories={categories}
      />
      <DishList
        dishes={dishes}
        headingText={headingText}
        emptyMessage={emptyMessage}
      />
    </div>
  );
};

export default Home;
