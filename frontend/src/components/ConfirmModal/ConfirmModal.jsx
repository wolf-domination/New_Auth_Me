import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import './ConfirmModal.css';

export default function ConfirmModal({ reviewId, onConfirm }) {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onConfirm(reviewId);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="confirm-modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <div className="buttons">
        <button
          className="btn-danger"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Yes (Delete Review)'}
        </button>
        <button className="btn-cancel" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}