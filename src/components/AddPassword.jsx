import React, { useState } from "react";

const AddPassword = ({ onSave, onCancel }) => {
  const [newPassword, setNewPassword] = useState({ id: Date.now(), sitename:"", site: "", username: "", email: "", password: "", });

  const handleSave = () => {
    if (newPassword.site && newPassword.password) {
      onSave(newPassword);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center gap-3 bg-white px-10 py-10 rounded-md ">
        <h3 className="text-xl font-semibold">Add new password</h3>
        <input type="text" className="rounded-[3px] h-10 p-3 border-black border" placeholder="Site name" value={newPassword.sitename} onChange={(e) => setNewPassword({ ...newPassword, sitename: e.target.value })} />
        <input type="text" className="rounded-[3px] h-10 p-3 border-black border" placeholder="Site" value={newPassword.site} onChange={(e) => setNewPassword({ ...newPassword, site: e.target.value })} />
        <input type="text" className="rounded-[3px] h-10 p-3 border-black border" placeholder="Username" value={newPassword.username} onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })} />
        <input type="text" className="rounded-[3px] h-10 p-3 border-black border" placeholder="Email" value={newPassword.email} onChange={(e) => setNewPassword({ ...newPassword, email: e.target.value })} />
        <input type="password" className="rounded-[3px] h-10 p-3 border-black border" placeholder="Password" value={newPassword.password} onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })} />
        {/* show password and hide password icon add */}
        <div className="flex gap-3 text-white">
          <button className="bg-[#38b000] px-3 py-2 rounded-md" onClick={handleSave} >
            Save
          </button>
          <button className="bg-[#adb5bd] px-3 py-2 rounded-md" onClick={onCancel} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPassword;
