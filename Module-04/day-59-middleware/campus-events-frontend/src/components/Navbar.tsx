import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={`${styles.navHeader}`}>
      <p>CAMPUS EVENTS</p>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/create-event">Create</Link>
      </nav>
    </header>
  );
};

export default Navbar;
