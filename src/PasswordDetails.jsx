import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    const selectedPassword = savedPasswords.find(p => p.id === parseInt(id));
    setPassword(selectedPassword);
  }, [id]);

  const handleSave = () => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    const updatedPasswords = savedPasswords.map(p => (p.id === password.id ? password : p));
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    navigate('/');
  };

  const handleDelete = () => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    const updatedPasswords = savedPasswords.filter(p => p.id !== password.id);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    navigate('/');
  };

  return password ? (
    <div className="password-details">
      <input
        type="text"
        value={password.siteName}
        onChange={(e) => setPassword({ ...password, siteName: e.target.value })}
      />
      <input
        type="text"
        value={password.url}
        onChange={(e) => setPassword({ ...password, url: e.target.value })}
      />
      <input
        type="email"
        value={password.email}
        onChange={(e) => setPassword({ ...password, email: e.target.value })}
      />
      <input
        type="text"
        value={password.username}
        onChange={(e) => setPassword({ ...password, username: e.target.value })}
      />
      <input
        type="password"
        value={password.password}
        onChange={(e) => setPassword({ ...password, password: e.target.value })}
      />
      <button onClick={handleSave} className="save-button">Save</button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
      <button onClick={() => navigate('/')} className="back-button">Back</button>
    </div>
  ) : (
    <p className="no-selection-message">Click the view button to view the saved password and edit or delete.</p>
  );
};

export default PasswordDetails;
