import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
  const [keyword, setKeyword] = useState();
  const nevigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      nevigate(`/products/${keyword}`);
    } else {
      nevigate("/products");
    }
  };
  return (
    <>
      <form className="searchbox" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Search Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
}

export default Search;
