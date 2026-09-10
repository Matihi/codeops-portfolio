import CartBadge from "./CartBadge/CartBadge";
import NavigationBar from "./NavigationBar/NavigationBar";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/cart" className="badge-link">
        <CartBadge />
      </Link>
      <Link to="/register" className="register-link">
        Register
      </Link>
      <h1 className="heading">Addis Eats</h1>
      <NavigationBar />
    </header>
  );
}

export default Header;
