import CategoryBar from "./CategoryBar/CategoryBar";
import DishList from "./DishList/DishList";
import { useEffect, useState } from "react";
import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    const load = async (signal) => {
      try {
        const res = await fetch("/data/dishes.json", { signal: signal });
        if (!res.ok)
          throw new Error("HTTP:" + res.status + "Could not load the menu");

        const rawText = await res.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (error) {
          throw new Error("Received an invalid response format");
        }
        if (!Array.isArray(data)) {
          throw new Error(
            "Server responded successfully, but data format was not an array",
          );
        }

        setDishes(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.log(error.message);
        setError(error.message);
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [category]);

  if (loading) return <p>Loading the menu...</p>;
  if (error) return <p>{error}</p>;
  if (dishes.length === 0) return <p>No dishes yet</p>;

  const filteredDishes = dishes.filter((dish) =>
    category === "All" ? true : dish.category === category,
  );

  return (
    <div className="menu">
      <CategoryBar key={category} selected={category} onSelect={setCategory} />
      <DishList dishes={filteredDishes} />
    </div>
  );
}

export default Menu;
