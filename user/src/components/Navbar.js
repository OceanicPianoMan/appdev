import { Link } from 'react-router-dom'
import React, { useContext } from 'react';

import '../styles/navbarStyles.css';

import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { userID } = useContext(UserContext);

  return (
    <header>
      <div className="container">
        <Link to="/Home">
          <h1>DiscogDive</h1>
        </Link>
        <Link to={`/UserProfile/${userID}`}>
          <h1>User Profile</h1>
        </Link>
        <Link to="/Register">
          <h1>Register</h1>
        </Link>
        <Link to="/LogIn">
          <h1>Log In</h1>
        </Link>
        <Link to="/Albums">
          <h1>Albums</h1>
        </Link>
        <Link to="/Users">
          <h1>Users</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
