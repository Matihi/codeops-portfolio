import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <div className={styles.navigationBar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.on : ""}`.trim()
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.on : ""}`.trim()
        }
      >
        Menu
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.on : ""}`.trim()
        }
      >
        Cart
      </NavLink>
    </div>
  );
};

export default NavigationBar;
