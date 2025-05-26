import React, { useState } from 'react';
import { useModal }          from '../../context/Modal';
import { csrfFetch }         from '../../store/csrf';
import './ReviewFormModal.css';

export default function ReviewFormModal({ spotId, onReviewAdded }) {
  const { closeModal } = useModal();
  const [comment, setComment] = useState('');
  const [stars, setStars]     = useState(0);
  const [errors, setErrors]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = comment.length >= 10 && stars > 0;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);
    try {
      const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: comment, stars })
      });
      const newReview = await res.json();
      await onReviewAdded(newReview);
      closeModal();
    } catch (err) {
      setErrors(err.message || 'Error submitting review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      {errors && <div className="server-error">{errors}</div>}
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Leave your review here..."
        />
        <div className="stars-input">
          <label>Stars</label>
          <select value={stars} onChange={e => setStars(+e.target.value)}>
            <option value={0}>Select</option>
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Your Review'}
        </button>
      </form>
    </div>
  );
}