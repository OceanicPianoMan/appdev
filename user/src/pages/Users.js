import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/userroutes');
        if (!response.ok) {
          throw new Error('Failed to fetch users!');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>DiscogDive Users</h2>
      {error && <p className="error-message">{error}</p>}
      {users.map((user) => (
        <div key={user._id} className="user-card">
          <h3 className="user-username"><Link to={`/UserProfile/${user._id}`}>{user.username}</Link></h3>
          <p className="user-followers">Followers: {user.followers} / Following: {user.following}</p>
          <p className="user-followers">Lists: {user.listQuantity} / Reviews: {user.reviewQuantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
