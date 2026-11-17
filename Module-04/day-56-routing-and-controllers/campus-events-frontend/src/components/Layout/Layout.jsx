import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.structure}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
