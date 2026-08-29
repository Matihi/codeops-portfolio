import Menu from "./Menu/Menu";
import dishes from "../../data/menu.json";
import "./Main.css";

function Main() {
  return (
    <main>
      <h2>Our Menu</h2>
      <Menu dishes={dishes} category="Breakfast" />
    </main>
  );
}

export default Main;
