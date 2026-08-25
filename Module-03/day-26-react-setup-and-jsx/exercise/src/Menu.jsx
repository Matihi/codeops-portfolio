import Dish from "./Dish";
import "./Menu.css";
import dishes from "./data/menu.json";

function Menu() {
  const foodCard = dishes.map((dish) => (
    <Dish key={dish.id} name={dish.name} price={dish.price} />
  ));
  return (
    <main>
      <h2>Our Menu</h2>
      <div className="menu-grid">{foodCard}</div>
    </main>
  );
}

export default Menu;
