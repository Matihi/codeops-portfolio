import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import styles from "./Layout.module.css";

const Layout = () => {
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  if (!hasHydrated) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.structure}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
