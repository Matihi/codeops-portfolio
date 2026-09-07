import SearchBox from "./SearchBox/SearchBox";
import CartBadge from "./CartBadge/CartBadge";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <CartBadge />
      <h1 className="heading">Addis Eats</h1>
      <SearchBox />
    </header>
  );
}

export default Header;
