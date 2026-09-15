import { useEffect, useRef } from "react";
import "./SearchBox.css";

const SearchBox = ({ query, setQuery }) => {
  const searchBoxRef = useRef(null);

  useEffect(() => {
    searchBoxRef.current.focus();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <search className="search-container">
      <input
        ref={searchBoxRef}
        type="search"
        name="search"
        value={query}
        id="search"
        className="search"
        placeholder="Search dishes"
        onChange={handleSearch}
      />
    </search>
  );
};

export default SearchBox;
