import React, { useState } from "react";
import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className="search">
      <SearchIcon style={{ padding: 10 }} />
      <input
        type="text"
        placeholder="Search for posts"
        value={searchText}
        onChange={handleSearchInputChange}
      />
    </div>
  );
}

export default Search;
