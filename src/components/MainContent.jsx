import React from "react";
import PasswordList from "./PasswordList.jsx";
import PasswordDetail from "./PasswordDetail.jsx";
import AddPassword from "./AddPassword.jsx";

const MainContent = ({ passwords, filteredPasswords, selectedPassword, setSelectedPassword, showAddForm, setShowAddForm, addPassword, updatePassword, deletePassword }) => {
  return (
    <div className="">
      <PasswordList passwords={filteredPasswords} onSelect={(password) => setSelectedPassword(password)} />
      {selectedPassword && (
        <PasswordDetail password={selectedPassword} onUpdate={updatePassword} onDelete={deletePassword} />
      )}
      {showAddForm && (
        <AddPassword onSave={(newPassword) => { addPassword(newPassword); setShowAddForm(false) }} onCancel={() => setShowAddForm(false)} />
      )}
    </div>
  );
};

export default MainContent;
