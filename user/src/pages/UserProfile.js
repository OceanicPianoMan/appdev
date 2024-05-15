import React, { useState, useContext, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CreateList from '../components/CreateList';

import '../styles/UserProfile.css';

const UserProfile = () => {
  const { sessionID, userID, dispatch } = useContext(UserContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUsernameForm, setShowUsernameForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/userroutes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserData(userData);
      setFollowing(userData.following);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (action) => {
    try {
      if (action === 'add' && following) {
        return;
      }

      const response = await fetch(`/api/userroutes/${id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionID,
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Failed to update followers');
      }

      if (action === 'add') {
        setFollowing(true);
        setUserData((prevUserData) => ({
          ...prevUserData,
          followers: prevUserData.followers + 1,
        }));
      } else if (action === 'remove') {
        setFollowing(false);
        setUserData((prevUserData) => ({
          ...prevUserData,
          followers: prevUserData.followers - 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateList = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    fetchUserData();
  };

  const handleDeleteList = async (listId) => {
    try {
      const response = await fetch(`/api/userroutes/${id}/lists/${listId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionID,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete list');
      }

      fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLists = () => {
    setShowLists(!showLists);
  };

  const handleUpdateNameClick = () => {
    setErrorMessage('');
    setShowUsernameForm(true);
  };

  const handleUpdateUsername = async () => {
    try {
      const trimmedUsername = newUsername.trim();
      const response = await fetch(`/api/userroutes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionID,
        },
        body: JSON.stringify({ newUsername: trimmedUsername }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update username');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setNewUsername('');
      setErrorMessage('');
      setShowUsernameForm(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`/api/userroutes/${userID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionID,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete account');
        }

        // Dispatch logout action to reset user context
        dispatch({ type: 'LOGOUT' });

        window.location.href = "/";

        // Navigate to main index after deletion
      } catch (error) {
        console.error(error);
        // Handle error...
      }
    }
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-info">
          <h2>{userData.username}</h2>
          {userData._id === userID && (
            <div className="update-username">
              {showUsernameForm ? (
                <>
                  <input
                    type="text"
                    placeholder="New username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button onClick={handleUpdateUsername}>Submit</button>
                  <button onClick={() => setShowUsernameForm(false)}>Cancel</button>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </>
              ) : (
                <button onClick={handleUpdateNameClick}>Settings</button>
              )}
              <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          )}
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p className="profile-actions">
            Followers: {userData.followers}{' '}
            {userData._id !== userID && (
              <>
                {following ? (
                  <button onClick={() => handleFollow('remove')}>Unfollow</button>
                ) : (
                  <button onClick={() => handleFollow('add')}>Follow</button>
                )}
              </>
            )}
          </p>
          <p>Following: {userData.following}</p>
          <p>Lists: {userData.listQuantity}</p>
          {userData._id === userID && <button onClick={handleCreateList} className="profile-button">Create Playlist</button>}
          {userData.lists.length > 0 && (
            <div>
              <button onClick={toggleLists} className="profile-button">Show Playlists</button>
              {showLists && (
                <ul className="lists-container">
                  {userData.lists.map((list, index) => (
                    <li className="list-item" key={index}>
                      <h3>{list.name}</h3>
                      <ul>
                        {list.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                      {userData._id === userID && <button onClick={() => handleDeleteList(list._id)} className="profile-button">Delete List</button>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <p>Albums: {userData.albumQuantity}</p>
          <p>Reviews: {userData.reviewQuantity}</p>
        </div>
      ) : (
        <p>Please login or register!</p>
      )}
      {showPopup && <CreateList onClose={handleClosePopup} />}
    </div>
  );
};

export default UserProfile;
