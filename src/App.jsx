import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //new
import Header from "./components/Header.jsx";
import PasswordDetail from "./components/PasswordDetail.jsx"; //new
import MainContent from "./components/MainContent.jsx";

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(storedPasswords);
  }, []);

  const addPassword = (newPassword) => {
    const updatedPasswords = [...passwords, newPassword];
    setPasswords(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const updatePassword = (updatedPassword) => {
    const updatedPasswords = passwords.map((pwd) =>
      pwd.id === updatedPassword.id ? updatedPassword : pwd
    );
    setPasswords(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwords.filter((pwd) => pwd.id !== id);
    setPasswords(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setSelectedPassword(null);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.sitename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router> {/* new */}
      <div className="w-full h-screen">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setShowAddForm={setShowAddForm} />
        <Routes> {/* new */}
          <Route path="/" element={ //new
            <MainContent passwords={passwords} filteredPasswords={filteredPasswords} selectedPassword={selectedPassword} setSelectedPassword={setSelectedPassword} showAddForm={showAddForm} setShowAddForm={setShowAddForm} addPassword={addPassword} updatePassword={updatePassword} deletePassword={deletePassword} />
          } /> {/* new */}
          <Route path="/password/:id" element={ //new
            <PasswordDetail passwords={passwords} updatePassword={updatePassword} deletePassword={deletePassword} />
          } /> {/* new */}
        </Routes> {/* new */}
      </div>
    </Router> //new
  );
};

export default App;
