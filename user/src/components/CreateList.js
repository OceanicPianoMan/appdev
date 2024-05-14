import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/ListStyles.css';

const CreateList = ({ onClose }) => {
  const { sessionID, userID } = useContext(UserContext);
  const [listName, setListName] = useState('');
  const [newListItem, setNewListItem] = useState('');
  const [listItems, setListItems] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/albumroutes')
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setFilteredSongs(data.flatMap(album => ({ ...album, songs: album.songs })));
      })
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  const handleAddSongToList = (song) => {
    setListItems([...listItems, song]);
  };

  const handleRemoveItem = (index) => {
    const newListItems = [...listItems];
    newListItems.splice(index, 1);
    setListItems(newListItems);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setNewListItem(input);

    // Filter songs based on input
    const filtered = albums.flatMap((album) => {
      const filteredSongs = album.songs.filter((song) =>
        song.toLowerCase().startsWith(input.toLowerCase())
      );
      return filteredSongs.length
        ? [{ ...album, songs: filteredSongs }]
        : [];
    });
    setFilteredSongs(filtered);
  };

  const handleMoveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < listItems.length) {
      const newListItems = [...listItems];
      const temp = newListItems[newIndex];
      newListItems[newIndex] = newListItems[index];
      newListItems[index] = temp;
      setListItems(newListItems);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!listName.trim()) {
        throw new Error('Playlist name cannot be empty!');
      }

      if (listItems.length === 0) {
        throw new Error('Playlist must have at least one song!');
      }

      const response = await fetch(`/api/userroutes/${userID}/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionID,
        },
        body: JSON.stringify({ listName: listName, listItems: listItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-list-container">
      <div className="create-list-inner">
        <h2>Make New playlist</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Playlist name..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search song..."
          value={newListItem}
          onChange={handleInputChange}
        />
        <div className="buttons">
          <button className="create-button" onClick={handleSubmit}>Create List</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
        <h3>Songs:</h3>
        <ul className="list-items">
          {listItems.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleMoveItem(index, -1)}>↑</button>
              <button onClick={() => handleMoveItem(index, 1)}>↓</button>
              <button onClick={() => handleRemoveItem(index)}>X</button>
            </li>
          ))}
        </ul>
        <h3>Albums:</h3>
        <div className="albums-list">
          {filteredSongs.map(({ _id, title, songs, band, release }) => (
            <div key={_id}>
              <h4>{title} - {band} ({release})</h4>
              <ul>
                {songs.map((song, index) => (
                  <li key={index}>
                    {song}
                    <button onClick={() => handleAddSongToList(song)}>Add</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateList;
