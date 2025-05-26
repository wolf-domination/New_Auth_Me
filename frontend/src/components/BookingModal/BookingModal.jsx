// frontend/src/components/BookingModal/BookingModal.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './BookingModal.css';
import { createBooking, updateBooking } from '../../store/booking';

export default function BookingModal({ spotId, booking, onBookingMade }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState(booking?.startDate || '');
  const [endDate, setEndDate] = useState(booking?.endDate || '');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!startDate) errs.startDate = 'Start date is required';
    if (!endDate) errs.endDate = 'End date is required';
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      errs.dateOrder = 'End date must be after start date';
    }
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setIsLoading(true);
    try {
      let saved;
      if (booking) {
        saved = await dispatch(
          updateBooking({ bookingId: booking.id, spotId, startDate, endDate })
        );
        closeModal()
      } else {
        saved = await dispatch(
          createBooking({ spotId, startDate, endDate })
        );
      }
      onBookingMade(saved);
      closeModal();
    } catch (res) {
      const data = await res.json();
      setErrors({ server: data.message || 'Booking failed' });
    } finally {
      setIsLoading(false);
    
    }
  };

  return (
    <div className="booking-modal">
      <h1>{booking ? 'Edit Reservation' : 'Reserve Spot'}</h1>
      {errors.server && <div className="server-error">{errors.server}</div>}
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </label>
        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
        </label>
        {errors.dateOrder && <p className="error">{errors.dateOrder}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading
            ? booking
              ? 'Saving…'
              : 'Booking…'
            : booking
            ? 'Save Changes'
            : 'Book'}
        </button>
      </form>
    </div>
  );
}