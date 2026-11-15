import Header from "../Header/Header";
import { Outlet } from "react-router";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.structure}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
