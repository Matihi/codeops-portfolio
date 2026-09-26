import NavigationBar from "./NavigationBar/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import "./Header.css";

function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
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
            {location.pathname !== "/register" && (
              <Link
                to="/register"
                state={{ from: location }}
                className="register-link"
              >
                Register
              </Link>
            )}
            {location.pathname !== "/login" && (
              <Link
                to="/login"
                state={{ from: location }}
                className="login-link"
              >
                Login
              </Link>
            )}
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
