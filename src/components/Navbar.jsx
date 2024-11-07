import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import Search from "../assets/Search.svg";
import Close from "../assets/Close.svg";
import Add from "../assets/Add.svg";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [isFocused, setIsFocused] = useState(false);
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-3 border-b-2 border-black">
      <img src={Logo} alt="logo" className="w-24" />

      <div className="flex w-full sm:w-auto justify-between items-center">
        <div className="relative flex items-center justify-between">
          <input
            type="search"
            name="search"
            id="search"
            className="w-full border-2 border-black h-10 rounded-full pl-3 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 h-6 w-6 flex items-center justify-center"
              onClick={handleClearSearch}
            >
              <img src={Close} alt="Clear Search" className="w-4 h-4" />
            </button>
          )}
          {!searchQuery && !isFocused && (
            <div className="absolute left-3 flex items-center gap-1 pointer-events-none cursor-none">
              <img src={Search} alt="search-icon" className="w-4" />
              <p>Search</p>
            </div>
          )}
        </div>
        <button className="bg-blue-600 p-3 rounded-full block sm:hidden relative ml-3">
          <img src={Add} alt="add-icon" className="w-4" />
        </button>
      </div>
      <button className="bg-blue-600 p-3 rounded-full hidden sm:block">
        <img src={Add} alt="add-icon" className="w-4" />
      </button>
    </nav>
  );
}
