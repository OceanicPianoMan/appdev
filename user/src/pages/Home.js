import React from 'react';
import Users from './Users';
import Albums from './Albums';
import '../styles/Home.css'; // Import the new CSS file

const Home = () => {
  return (
    <div className="home">
      <div className="section">
        <h2>WELCOME TO DISCOG DIVE!</h2>
        <div className="home-users-container">
          <Users />
        </div>
      </div>
      <div className="section">
        <h2>Albums</h2>
        <Albums />
      </div>
    </div>
  );
}

export default Home;
