import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authentication/AuthProvider";
import styles from "./Layout.module.css";

const Layout = () => {
  const { loading } = useAuth();

  if (loading) {
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
