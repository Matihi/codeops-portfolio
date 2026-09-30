import DishList from "../../components/Main/Menu/DishList/DishList";
import useFetch from "../../hooks/useFetch";

import styles from "./Home.module.css";

const Home = () => {
  const category = "All";
  const url = "/data/dishes.json";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  if (loading) return <p>Loading special dishes...</p>;
  if (error) return <p>{error}</p>;

  const specialDishes = dishes.filter((dish) => dish.special === true);

  const headingText = "Special Dishes";
  const emptyMessage = "Sorry, special dishes are not available";

  return (
    <div className={styles.home}>
      <h2 className={styles.homeHeading}>
        Experience authentic and delicious Ethiopian cuisine
      </h2>
      <DishList
        dishes={specialDishes}
        headingText={headingText}
        emptyMessage={emptyMessage}
      />
    </div>
  );
};

export default Home;
