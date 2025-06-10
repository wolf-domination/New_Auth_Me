import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';
import './ConfirmDeleteSpotModal.css';

export default function ConfirmDeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteSpot(spotId));
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this spot?</p>
      <p>This action cannot be undone.</p>
      <div className="confirm-buttons">
        <button
          className="btn-danger"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Yes (Delete Spot)'}
        </button>
        <button
          className="btn-cancel"
          onClick={closeModal}
          disabled={isLoading}
        >
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}