import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import '../styles/ModalStyles.css';

const RatingModal = ({ isOpen, onClose, onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onRate(rating);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Rate this album</h2>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={ratingValue}
                className={ratingValue <= rating ? 'star-selected' : 'star-unselected'}
                onMouseEnter={() => handleRate(ratingValue)}
                onMouseLeave={() => handleRate(0)}
                onClick={() => onRate(ratingValue)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
