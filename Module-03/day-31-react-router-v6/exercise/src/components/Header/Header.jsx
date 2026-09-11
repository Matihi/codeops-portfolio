import CartBadge from "./CartBadge/CartBadge";
import NavigationBar from "./NavigationBar/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authentication/AuthProvider";
import "./Header.css";

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <Link to="/cart" className="badge-link">
        <CartBadge />
      </Link>
      <div className="reg-and-auth-wrapper">
        <Link
          to="/register"
          state={{ from: location }}
          className="register-link"
        >
          Register
        </Link>
        {!user ? (
          <Link to="/login" className="login-link">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>

      <h1 className="heading">Addis Eats</h1>
      <NavigationBar />
    </header>
  );
}

export default Header;
