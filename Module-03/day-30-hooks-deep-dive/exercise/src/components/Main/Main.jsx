import Menu from "./Menu/Menu";
import SideBar from "./SideBar/SideBar";
import "./Main.css";
import Cart from "./Cart/Cart";

function Main() {
  return (
    <main>
      <Menu />
      <Cart />
      {/* <SideBar /> */}
    </main>
  );
}

export default Main;
