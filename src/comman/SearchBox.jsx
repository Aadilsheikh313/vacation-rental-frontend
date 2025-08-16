// src/components/common/SearchBox.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../config/redux/action/propertyAction";

const SearchBox = ({ placeholder = "Search...", className = "" }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchPosts(query));
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded-l-md focus:outline-none w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
