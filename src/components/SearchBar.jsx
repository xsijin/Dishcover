import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/searchresult/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for a recipe"
            className="input input-bordered w-24 md:w-auto"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
