import Menu from "./Menu/Menu";
import SideBar from "./SideBar/SideBar";
import dishes from "../../data/menu.json";
import "./Main.css";

function Main() {
  return (
    <main>
      <Menu dishes={dishes} />
      {/* <SideBar /> */}
    </main>
  );
}

export default Main;
