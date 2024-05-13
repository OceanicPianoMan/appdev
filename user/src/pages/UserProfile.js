import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CreateList from '../components/CreateList';

const UserProfile = () => {
  const { sessionID, userID } = useContext(UserContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [following, setFollowing] = useState(false);

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
      console.log("USER DATA:", userData);
      setFollowing(userData.following);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (action) => {
    try {
      // Check if the user is already followed to prevent the odd runtime error
      if (action === 'add' && following) {
        return; // Exit early if already followed
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

      // Update following state based on action
      if (action === 'add') {
        setFollowing(true);
        setUserData(prevUserData => ({ ...prevUserData, followers: prevUserData.followers + 1 }));
      } else if (action === 'remove') {
        setFollowing(false);
        setUserData(prevUserData => ({ ...prevUserData, followers: prevUserData.followers - 1 }));
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
    fetchUserData(); // Refresh user data after closing popup
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

      // Refresh user data to reflect changes
      fetchUserData();
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>
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
          <p>
            Following: {userData.following}{' '}     
          </p>
          <p>
            Lists: {userData.listQuantity}{' '}
            {userData._id === userID && <button onClick={handleCreateList}>Add List</button>}
          </p>
          <ul>
            {userData.lists.map((list, index) => (
              <li key={index}>
                <h3>List Name: {list.name}</h3>
                <ul>
                  {list.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
                {userData._id === userID && <button onClick={() => handleDeleteList(list._id)}>Delete List</button>}
              </li>
            ))}
          </ul>
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
