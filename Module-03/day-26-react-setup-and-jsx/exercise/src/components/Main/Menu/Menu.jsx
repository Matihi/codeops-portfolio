import Dish from "./Dish/Dish";
import menu from "../../../data/menu.json";

import "./Menu.css";

function Menu() {
  const dishCard = menu.map((dish) => (
    <Dish
      key={dish.id}
      image={dish.image}
      name={dish.name}
      price={dish.price}
    />
  ));

  return <div className="menu">{dishCard}</div>;
}

export default Menu;
