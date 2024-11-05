import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordManager from './PasswordManager';
import PasswordDetails from './PasswordDetails';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PasswordManager />} />
          <Route path="/details/:id" element={<PasswordDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
