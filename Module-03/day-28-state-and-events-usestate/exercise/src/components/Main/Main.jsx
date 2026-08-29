import Menu from "./Menu/Menu";
import dishes from "../../data/menu.json";
import "./Main.css";

function Main() {
  return (
    <main>
      <Menu dishes={dishes} />
    </main>
  );
}

export default Main;
