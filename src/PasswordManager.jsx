import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({ siteName: '', url: '', email: '', username: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    setPasswords(savedPasswords);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSavePassword = () => {
    const updatedPasswords = [...passwords, { ...newPassword, id: passwords.length }];
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    closeModal();
  };

  const filteredPasswords = passwords.filter(password =>
    password.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="password-manager">
      <div className="password-list">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={openModal} className="add-button">Add</button>
        
        {filteredPasswords.length === 0 ? (
          <p className="no-passwords-message">Click the add button to save or store passwords.</p>
        ) : (
          <div className="password-scroll-list">
            {filteredPasswords.map((password, index) => (
              <div key={index} className="password-entry">
                <p>{password.siteName}</p>
                <Link to={`/details/${password.id}`} className="view-button">View</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Password</h2>
            <input
              type="text"
              placeholder="Site Name"
              value={newPassword.siteName}
              onChange={(e) => setNewPassword({ ...newPassword, siteName: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              value={newPassword.url}
              onChange={(e) => setNewPassword({ ...newPassword, url: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newPassword.email}
              onChange={(e) => setNewPassword({ ...newPassword, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Username"
              value={newPassword.username}
              onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword.password}
              onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
            />
            <button onClick={handleSavePassword} className="save-button">Save</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordManager;
