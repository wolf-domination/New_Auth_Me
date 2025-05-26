// frontend/src/store/review.js
import { csrfFetch } from './csrf';

const SET_REVIEWS     = 'reviews/SET_REVIEWS';
const ADD_REVIEW      = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW   = 'reviews/REMOVE_REVIEW';
const REVIEWS_LOADING = 'reviews/REVIEWS_LOADING';

const setReviews        = (spotId, reviews) => ({ type: SET_REVIEWS, spotId, reviews });
const addReviewAction   = (spotId, review)   => ({ type: ADD_REVIEW, spotId, review });
const removeReviewAction= (spotId, reviewId) => ({ type: REMOVE_REVIEW, spotId, reviewId });
export { addReviewAction, removeReviewAction };
const setLoading        = loading            => ({ type: REVIEWS_LOADING, loading });

// Load all reviews for a spot
export const fetchReviews = spotId => async dispatch => {
  dispatch(setLoading(true));
  const res  = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await res.json();
  dispatch(setReviews(spotId, data.Reviews));
  dispatch(setLoading(false));
};

// Add a review: POST then dispatch only the new review
export const addReview = ({ spotId, review }) => async dispatch => {
  const res       = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  const newReview = await res.json();
  dispatch(addReviewAction(spotId, newReview));
  return newReview;
};

// Delete a review
export const removeReview = ({ spotId, reviewId }) => async dispatch => {
  await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`, { method: 'DELETE' });
  dispatch(removeReviewAction(spotId, reviewId));
};

const initialState = {
  bySpot: {},
  loading: false
};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        bySpot: { ...state.bySpot, [action.spotId]: action.reviews }
      };
    case ADD_REVIEW:
      return {
        ...state,
        bySpot: {
          ...state.bySpot,
          [action.spotId]: [action.review, ...(state.bySpot[action.spotId] || [])]
        }
      };
    case REMOVE_REVIEW:
      return {
        ...state,
        bySpot: {
          ...state.bySpot,
          [action.spotId]: state.bySpot[action.spotId].filter(r => r.id !== action.reviewId)
        }
      };
    case REVIEWS_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}