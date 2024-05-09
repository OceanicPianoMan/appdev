import { Link } from 'react-router-dom'

import '../styles/navbarStyles.css';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>DiscogDive</h1>
        </Link>
        <Link to="/UserProfile">
          <h1>User Profile</h1>
        </Link>
        <Link to="/Register">
          <h1>Register</h1>
        </Link>
        <Link to="/LogIn">
          <h1>Log In</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar