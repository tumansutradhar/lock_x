import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; //new
import { getFaviconUrl } from "./getFaviconUrl";
import ArrowBack from "../assets/ArrowBack.svg";

const PasswordDetail = ({ passwords, onUpdate, onDelete }) => {
  const { id } = useParams(); //new
  const navigate = useNavigate(); //new
  const password = passwords.find((pwd) => pwd.id === Number(id)); //new
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editedPassword, setEditedPassword] = useState({ ...password });
  const passwordRef = useRef(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [password]);

  const handleSave = () => {
    onUpdate(editedPassword);
    setIsEditing(false);
    if (passwordRef.current) {
      passwordRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    onDelete(password.id);
    setShowConfirmDelete(false);
    navigate("/"); //new
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <>
      <div className="w-full h-screen relative p-3 flex flex-col gap-3" ref={passwordRef} >
        <div className="">
          <button className="" onClick={() => navigate("/")}>
            <img src={ArrowBack} alt="Back to list" />
          </button>
        </div>
        {isEditing ? (
          <>
            <input type="text" className="" value={editedPassword.sitename} onChange={(e) => setEditedPassword({ ...editedPassword, sitename: e.target.value })} />
            <input type="text" className="" value={editedPassword.site} onChange={(e) => setEditedPassword({ ...editedPassword, site: e.target.value })} />
            <input type="text" className="" value={editedPassword.username} onChange={(e) => setEditedPassword({ ...editedPassword, username: e.target.value })} />
            <input type="text" className="" value={editedPassword.email} onChange={(e) => setEditedPassword({ ...editedPassword, email: e.target.value })} />
            <input type="password" className="" value={editedPassword.password} onChange={(e) => setEditedPassword({ ...editedPassword, password: e.target.value })} />
            <button className="" onClick={handleSave}>
              Save
            </button>
            <button className="" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-3 flex-col pl-6">
              <div className="">
                <img src={getFaviconUrl(password.site)} alt="Site favicon" />
                <p>{password.sitename}</p>
              </div>
              <h3 className="">{password.site}</h3>
              <p className="">Username: {password.username}</p>
              <p>Email: {password.email}</p>
              <p>Password: {password.password}</p>
            </div>
            <div className="flex justify-end gap-3 bottom-0 absolute right-0 p-3">
              <button className="bg-[#38b000] px-3 py-2 rounded-md" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="bg-[#38b000] px-3 py-2 rounded-md" onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      {showConfirmDelete && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <p className="text-lg font-bold mb-4">Are you sure you want to delete this password?</p>
              <div className="flex mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PasswordDetail;
