import { useEffect, useRef } from "react";
import "./SearchBox.css";

const SearchBox = () => {
  const searchBoxRef = useRef(null);

  useEffect(() => {
    searchBoxRef.current.focus();
  }, []);

  return (
    <search className="search-container">
      <input
        ref={searchBoxRef}
        type="search"
        id="search"
        className="search"
        placeholder="Search dishes"
      />
    </search>
  );
};

export default SearchBox;
