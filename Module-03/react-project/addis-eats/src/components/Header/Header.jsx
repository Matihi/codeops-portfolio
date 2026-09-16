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
      <NavigationBar />

      <div className="reg-and-auth-wrapper">
        {!user ? (
          <>
            <Link
              to="/register"
              state={{ from: location }}
              className="register-link"
            >
              Register
            </Link>
            <Link to="/login" state={{ from: location }} className="login-link">
              Login
            </Link>
          </>
        ) : (
          <>
            <p className="greetings">{`Selam, ${user.name}`}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
