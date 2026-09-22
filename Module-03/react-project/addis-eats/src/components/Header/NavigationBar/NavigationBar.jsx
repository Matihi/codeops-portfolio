import { NavLink } from "react-router-dom";
import { MdOutlineRestaurantMenu, MdShoppingBag } from "react-icons/md";
import useCartStore from "../../../stores/cartStore";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const totalItems = useCartStore((s) => s.cartItems.length);
  const threshold = 60;
  return (
    <div className={styles.navigationBar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.navLink} ${styles.name} ${isActive ? styles.on : ""}`.trim()
        }
      >
        <p>Addis</p>
        <p>Eats</p>
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `${styles.navLink} ${styles.menuLink} ${isActive ? styles.on : ""}`.trim()
        }
      >
        <MdOutlineRestaurantMenu className={styles.menuIcon} />
        <p>Menu</p>
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${styles.navLink} ${styles.cartLink} ${isActive ? styles.on : ""}`.trim()
        }
      >
        <div className={styles.cartContainer}>
          <MdShoppingBag className={styles.shoppingBag} />
          <>
            {totalItems > threshold ? (
              <span className={styles.badgeCount}>{String(threshold)}+</span>
            ) : (
              <span className={styles.badgeCount}>{String(totalItems)}</span>
            )}
          </>
        </div>
        <p>Cart</p>
      </NavLink>
    </div>
  );
};

export default NavigationBar;
