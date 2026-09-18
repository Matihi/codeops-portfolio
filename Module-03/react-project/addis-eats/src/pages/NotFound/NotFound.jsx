import DishList from "../../components/DishList/DishList";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import {
  MdLocalFireDepartment,
  MdOutlineMenuBook,
  MdShoppingBag,
} from "react-icons/md";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const category = "All";
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { filteredDishes: dishes, loading, error } = useFetch(url, category);

  const loadingMessage = "Loading the dishes...";
  const emptyMessage = "Sorry, dishes are not available";

  const shown = dishes.slice(0, 4);

  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.textAndImageWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/Traditional_Mesob_Lid_Floating_Illustration_margin.svg"
            alt="Traditional mesob lid image"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.notFoundStatus}>404</p>
          <h1 className={styles.notFoundText}>Page Not Found</h1>
          <p className={styles.notFoundTextAm}>ይቅርታ! ይህ ገጽ አልተገኘም</p>
          <p className={styles.message}>
            Looks like this dish has already been enjoyed or never made it to
            the kitchen!
          </p>

          <p className={styles.brandVoice}>
            <span>Even the best Gursha sometimes slips! </span>Don't let your
            appetite wait — our Addis kitchen has hot clay pot wats and freshly
            rolled teff injera ready for your table right now.
          </p>
        </div>

        <div className={styles.linkWrapper}>
          <NavLink to="/" className={styles.navLink}>
            <MdLocalFireDepartment />
            <p>Return to Today's Specials</p>
          </NavLink>
          <NavLink to="/menu" className={styles.navLink}>
            <MdOutlineMenuBook />
            <p>Explore Full Menu</p>
          </NavLink>
          <NavLink to="/cart" className={styles.navLink}>
            <MdShoppingBag />
            <p>Check Current Order</p>
          </NavLink>
        </div>
      </div>
      <div className={styles.dishesWrapper}>
        <p>Hungry? Here's What Our Guests Love Today</p>
        <DishList
          dishes={shown}
          loading={loading}
          loadingMessage={loadingMessage}
          error={error}
          emptyMessage={emptyMessage}
        />
      </div>
    </div>
  );
};

export default NotFound;
