import React, { useEffect, useState } from 'react';
import { useParams }           from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader                  from '../Loader';
import { useModal }            from '../../context/Modal';
import ReviewFormModal         from '../ReviewFormModal/ReviewFormModal';
import ConfirmModal            from '../ConfirmModal/ConfirmModal';
import BookingModal            from '../BookingModal/BookingModal';
import OpenModalButton         from '../OpenModalButton/OpenModalButton';
import './SpotDetailPage.css';
import { fetchSpotDetail, clearSpot }   from '../../store/spots';
import { fetchReviews, removeReview, addReviewAction } from '../../store/review';

export default function SpotDetailPage() {
  const { id: spotId } = useParams();
  const dispatch       = useDispatch();
  const { setModalContent } = useModal();
  const [posting, setPosting] = useState(false);

  const spot           = useSelector(state => state.spots.current);
  const rawReviews     = useSelector(state => state.reviews.bySpot?.[spotId]);
  const reviews        = Array.isArray(rawReviews) ? rawReviews : [];
  const loadingSpot    = useSelector(state => state.spots.loading);
  const loadingReviews = useSelector(state => state.reviews.loading);
  const sessionUser    = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
    dispatch(fetchReviews(spotId));
    return () => { dispatch(clearSpot()); };
  }, [dispatch, spotId]);

  if (loadingSpot || loadingReviews || posting || !spot) {
    return <Loader />;
  }

  const isOwner     = sessionUser?.id === spot.ownerId;
  const hasReviewed = sessionUser && reviews.some(r => r?.userId === sessionUser.id);
  const canPost     = sessionUser && !isOwner && !hasReviewed;

  const handleNewReview = newReview => {
    setPosting(true);
    dispatch(addReviewAction(spotId, newReview));
    setPosting(false);
  };

  const handleDelete = async reviewId => {
    setPosting(true);
    await dispatch(removeReview({ spotId, reviewId }));
    setPosting(false);
  };

  const avgStars = reviews.length
    ? reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / reviews.length
    : null;

  const previewImg = spot.SpotImages?.find(img => img.preview);
  const smallImgs  = spot.SpotImages?.filter(img => !img.preview) || [];

  return (
    <div className="detail-container">
      <h1>{spot.name}</h1>
      <p className="location">
        {spot.city}, {spot.state}, {spot.country}
      </p>

      <div className="images-grid">
        {previewImg && (
          <div
            className="main-image"
            style={{ backgroundImage: `url(${previewImg.url})` }}
          />
        )}
        <div className="small-images">
          {smallImgs.slice(0,4).map(img => (
            <div
              key={img.id}
              className="small-image"
              style={{ backgroundImage: `url(${img.url})` }}
            />
          ))}
        </div>
      </div>

      <div className="detail-main">
        <div className="reservation-box">
          <div className="price">
            ${spot.price}/<span>night</span>
          </div>
         
          {sessionUser && !isOwner && (
            <OpenModalButton
              buttonText="Reserve"
              modalComponent={
                <BookingModal
                  spotId={spotId}
                  onBookingMade={() => {}}
                />
              }
            />
          )}
          {sessionUser && isOwner && (
            <h3>You own this !</h3>
          )}
        </div>
        <div className="description-section">
          <h2>
            Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>

      </div>

      <div className="reviews-section">
        <div className="rating-header">
          <span>{avgStars ? avgStars.toFixed(1) : 'New'} ★</span>
          <span>
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
        </div>

        {canPost && (
          <button
            className="post-review-btn"
            onClick={() =>
              setModalContent(
                <ReviewFormModal spotId={spotId} onReviewAdded={handleNewReview} />
              )
            }
          >
            Post Your Review
          </button>
        )}

        <h3>Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet</p>}

        <ul className="reviews-list">
          {reviews.map(r => (
            <li key={r.id} className="review">
              <div className="review-content">
                <strong>
                  {r.User
                    ? `${r.User.firstName} ${r.User.lastName}`
                    : 'Unknown'}
                </strong>
                <span>{r.stars} ★</span>
                <p>{r.review}</p>
              </div>
              {sessionUser?.id === r.userId && (
                <button
                  className="delete-review-btn"
                  onClick={e => {
                    e.stopPropagation();
                    setModalContent(
                      <ConfirmModal
                        spotId={spotId}
                        reviewId={r.id}
                        onConfirm={handleDelete}
                      />
                    );
                  }}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}