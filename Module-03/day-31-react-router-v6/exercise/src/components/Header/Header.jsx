import CartBadge from "./CartBadge/CartBadge";
import NavigationBar from "./NavigationBar/NavigationBar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authentication/AuthProvider";
import "./Header.css";

function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <Link to="/cart" className="badge-link">
        <CartBadge />
      </Link>
      <div className="reg-and-auth-wrapper">
        <Link to="/register" className="register-link">
          Register
        </Link>
        {!user && (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>

      <h1 className="heading">Addis Eats</h1>
      <NavigationBar />
    </header>
  );
}

export default Header;
