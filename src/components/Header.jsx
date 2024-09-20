import React from "react";
import Logo from "../assets/Logo.svg";
import Search from "../assets/Search.svg";
import Close from "../assets/Close.svg";
import Add from "../assets/Add.svg";

function Header({ searchQuery, setSearchQuery, setShowAddForm }) {
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="w-full h-auto flex flex-col justify-between p-3 gap-3 sm:flex-row border-b border-black">
      <img className="w-24" src={Logo} alt="Logo" />
      <div className="flex items-center gap-3 justify-between">
        <div className="relative flex items-center flex-grow h-10">
          <input className="border-black border-[1px] h-10 rounded-full p-3 w-full sm:w-[300px] md:w-[500px] lg:w-[600px]" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {searchQuery ? (
            <button className="absolute right-0 p-3" onClick={handleClearSearch} >
              <img className="bg-white" src={Close} alt="Clear Search" />
            </button>
          ) : (
            <div className="absolute flex items-center justify-center inset-0 pointer-events-none">
              <img src={Search} alt="Search" />
              <p className="">Search</p>
            </div>
          )}
        </div>
        <button className="w-9 h-9 flex items-center justify-center bg-[#0a85ed] rounded-full sm:hidden" type="submit" onClick={() => setShowAddForm(true)} >
          <img src={Add} alt="Add" />
        </button>
      </div>
      <button className="w-9 h-9 items-center justify-center bg-[#0a85ed] rounded-full hidden sm:flex" type="submit" onClick={() => setShowAddForm(true)} >
        <img src={Add} alt="Add" />
      </button>
    </header>
  );
}

export default Header;
