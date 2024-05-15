// Index.js
import React, { useState } from 'react';
import LoginForm from "../components/LoginForm";
import UserForm from "../components/UserForm";
import "../styles/mainIndex.css"; // Import the main stylesheet

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className="index-container">
      <div className="button-container">
        <button onClick={handleShowLogin}>Login</button>
        <button onClick={handleShowRegister}>Register</button>
      </div>
      <div className={`form-container ${showLogin || showRegister ? 'active' : ''}`}>
        {showLogin && <LoginForm />}
        {showRegister && <UserForm />}
      </div>
    </div>
  );
}

export default Index;
