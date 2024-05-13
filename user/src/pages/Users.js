import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.map((user) => (
        <div key={user._id}>
          <h3>USER ID: {user._id}</h3>
          <h3><Link to={`/UserProfile/${user._id}`}>{user.username}</Link></h3>
          <p>Followers: {user.followers} / Following: {user.following}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
