import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, deleteBooking } from '../../store/booking';
import Loader from '../Loader';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import BookingModal from '../BookingModal/BookingModal';
import { format } from 'date-fns';
import './ManageBooking.css';

export default function ManageBooking() {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.list);
  const loading  = useSelector(state => state.bookings.loading);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <Loader />;

const handleDelete = async (bookingId) => {
   
    await dispatch(deleteBooking({ bookingId }));
    fetchBookings(); // Refresh bookings after deletion

};

return (
    <div className="manage-booking-container">
        <h1>Manage Bookings</h1>
        {bookings.length === 0 ? (
            <p>You have no bookings.</p>
        ) : (
            <ul className="booking-list">
                {bookings.map(booking => (
                    <li key={booking.id} className="booking-item">
                        {booking.Spot?.previewImage && (
                            <div
                                className="booking-image"
                                style={{ backgroundImage: `url(${booking.Spot.previewImage})` }}
                            />
                        )}
                        <div className="booking-details">
                            <h2>{booking.Spot?.name || `Spot #${booking.spotId}`}</h2>
                            <p>
                                {format(new Date(booking.startDate), 'MMM d, yyyy')} &ndash;{' '}
                                {format(new Date(booking.endDate), 'MMM d, yyyy')}
                            </p>
                        </div>
                        <div className="booking-actions">
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={
                                    <BookingModal
                                        spotId={booking.spotId}
                                        booking={booking}
                                        onSaved={() => dispatch(fetchBookings())}
                                    />
                                }
                            />
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(booking.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}