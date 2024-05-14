import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/Albums.css';
import RatingModal from '../components/RatingModal';
import ReviewModal from '../components/ReviewModal';

import Homework from '../styles/images/Homework.jpg';
import IronMaiden from '../styles/images/IronMaiden.jpg';
import Lateralus from '../styles/images/Lateralus.jpg';
import SafeAsMilk from '../styles/images/SafeAsMilk.jpg';
import TheSound from '../styles/images/TheSound.jpg';
import Vol4 from '../styles/images/Vol4.png';
import TVGirl from '../styles/images/TVGirl.jpg';
import TheMollusk from '../styles/images/TheMollusk.jpg';

const albumCovers = {
  "Iron Maiden": IronMaiden,
  "Lateralus": Lateralus,
  "Homework": Homework,
  "The Sound of Perseverance": TheSound,
  "Safe As Milk": SafeAsMilk,
  "Vol. 4" : Vol4,
  "Who Really Cares" : TVGirl,
  "The Mollusk" : TheMollusk,
};

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [reviewText, setReviewText] = useState('');
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

  const handleOpenRatingModal = (album) => {
    setSelectedAlbum(album);
    setRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setSelectedAlbum(null);
    setRatingModalOpen(false);
  };

  const handleOpenReviewModal = (album) => {
    setSelectedAlbum(album);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedAlbum(null);
    setReviewModalOpen(false);
  };

  const handleRating = async (rating) => {
    try {
      if (!selectedAlbum || !userID) {
        throw new Error('Unable to rate the album');
      }

      const response = await fetch(`/api/albumroutes/${selectedAlbum._id}/rate`, {
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
      handleCloseRatingModal();
    } catch (error) {
      console.error('Error rating album:', error);
      setError(error.message);
    }
  };

  const handleReviewSubmit = async (reviewText) => {
    try {
      console.log('Selected album:', selectedAlbum);
      console.log('User ID:', userID);
      console.log('Review text:', reviewText);

      if (!selectedAlbum || !userID || !reviewText) {
        throw new Error('Unable to submit review: Selected album, user ID, or review text is missing');
      }

      const response = await fetch(`/api/albumroutes/${selectedAlbum._id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: reviewText }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Reload albums after review submission
      fetchAlbums();
      setReviewText('');
      handleCloseReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error.message); // Log the error message
      setError(error.message);
    }
  };

  return (
    <div className="album-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {albums.map((album) => (
        <div key={album._id} className="album-card">
          <div>
            <img className="album-cover" src={albumCovers[album.title]} alt={`${album.title} cover`} />
          </div>
          <div className="album-details">
            <h3 className="album-title">{album.title} - {album.band}</h3>
            <p className="album-info">Release year: {album.release} / Genre: {album.genre}</p>
            <p className="album-rating">Rating: {album.ratings.length > 0 ? (album.ratings.reduce((a, b) => a + b, 0) / album.ratings.length).toFixed(1) : 'No ratings yet'}</p>
            <div className="album-actions">
              <button onClick={() => handleOpenRatingModal(album)} disabled={!userID}>Rate</button>
              <button onClick={() => handleOpenReviewModal(album)} disabled={!userID}>Add Review</button>
            </div>
          </div>
          <ul className="songs-list">
            {album.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
          <div className="reviews">
            <h4>Reviews:</h4>
            <ul>
              {album.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <RatingModal isOpen={ratingModalOpen} onClose={handleCloseRatingModal} onRate={handleRating} />
      <ReviewModal isOpen={reviewModalOpen} onClose={handleCloseReviewModal} onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

export default Albums;
