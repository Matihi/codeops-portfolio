import Dish from "./Dish/Dish";

import "./Menu.css";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter((dish) => dish.category === category);
  if (filteredDishes.length === 0)
    return <p>Sorry, {category} dishes are not available</p>;

  const currency = "USD";

  const dishElements = filteredDishes.map((dish) => (
    <Dish
      key={dish.id}
      name={dish.name}
      category={dish.category}
      price={dish.price}
      spicy={dish.spicy}
      image={dish.image}
      // currency={currency} //If uncommented "USD" is shown;
    />
  ));

  return <div className="menu">{dishElements}</div>;
}

export default Menu;
