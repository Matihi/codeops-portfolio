import SearchBox from "./SearchBox/SearchBox";
import "./Header.css";

function Header() {
  return (
    <header>
      <h1 className="heading">Addis Eats</h1>
      <SearchBox />
    </header>
  );
}

export default Header;
