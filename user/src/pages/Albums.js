import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const { userID } = useContext(UserContext);

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/albumroutes');
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleRating = async (id, rating) => {
    try {
      // Check if the user is logged in
      if (!userID) {
        throw new Error('You must be logged in to rate an album');
      }

      const response = await fetch(`/api/albumroutes/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
      // Reload albums after rating submission
      fetchAlbums();
    } catch (error) {
      console.error('Error rating album:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Albums</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {albums.map((album) => (
        <div key={album._id}>
          <h3>{album.title} - {album.band}</h3>
          <p>Release year: {album.release} / Genre: {album.genre}</p>
          <p>Rating: {album.ratings.length > 0 ? (album.ratings.reduce((a, b) => a + b, 0) / album.ratings.length).toFixed(1) : 'No ratings yet'}</p>
          <div>
            <span>Rate this album:</span>
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
              <button key={rate} onClick={() => handleRating(album._id, rate)} disabled={!userID}>
                {rate}
              </button>
            ))}
          </div>
          <ul>
            {album.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Albums;
