import React, { useState } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}
