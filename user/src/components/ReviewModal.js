import React, { useState } from 'react';

import '../styles/ModalStyles.css';

const ReviewModal = ({ isOpen, onClose, onReviewSubmit }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    onReviewSubmit(reviewText);
    setReviewText(''); // Clear review text after submission
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Review album</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewModal;
