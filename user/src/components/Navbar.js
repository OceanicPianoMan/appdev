// Navbar.js
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/navbarStyles.css';

const Navbar = () => {
  const { userID, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    // Dispatch action to nullify userID
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header>
      <div className="container">
        <Link to="/Home">
          <h1>DiscogDive</h1>
        </Link>
        {userID && ( // Render only if userID exists
          <>
            <Link to={`/UserProfile/${userID}`}>
              <h1>User Profile</h1>
            </Link>
            <Link to="/" onClick={handleLogout}>
              <h1>Log out</h1>
            </Link>
          </>
        )}
        {!userID && ( // Render only if userID doesn't exist
          <>
            <Link to="/">
              <h1>Login/Register</h1>
            </Link>
          </>
        )}
        <Link to="/Albums">
          <h1>Albums</h1>
        </Link>
        <Link to="/Users">
          <h1>Users</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
