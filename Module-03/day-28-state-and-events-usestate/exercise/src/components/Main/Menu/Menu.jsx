import Dish from "./Card/Dish/Dish";
import Card from "./Card/Card";

import "./Menu.css";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter((dish) => dish.category === category);
  if (filteredDishes.length === 0)
    return <p>Sorry, {category} dishes are not available</p>;

  const currency = "USD";

  const dishElements = filteredDishes.map((dish) => (
    <Card key={dish.id}>
      <Dish
        name={dish.name}
        category={dish.category}
        price={dish.price}
        spicy={dish.spicy}
        image={dish.image}
        // currency={currency} //If uncommented "USD" is shown;
      />
    </Card>
  ));

  return <div className="menu">{dishElements}</div>;
}

export default Menu;
