import { useState, useEffect } from "react";

function useFetch(url, category) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    const load = async (signal) => {
      try {
        const res = await fetch(url, { signal: signal });

        if (!res.ok) {
          throw new Error(`HTTP:${res.status}. Could not load the menu.`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("We didn't get JSON back from the server!");
        }

        const data = await res.json();

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

  const filteredDishes = dishes.filter((dish) =>
    category === "All" ? true : dish.category === category,
  );

  return { filteredDishes, loading, error };
}

export default useFetch;
