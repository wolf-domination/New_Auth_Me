// frontend/src/store/booking.js

import { csrfFetch } from './csrf';

// Action types
const SET_USER_BOOKINGS   = 'bookings/SET_USER_BOOKINGS';
const CREATE_BOOKING      = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING      = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING      = 'bookings/DELETE_BOOKING';
const BOOKINGS_LOADING    = 'bookings/BOOKINGS_LOADING';

// Action creators
const setUserBookings     = bookings => ({ type: SET_USER_BOOKINGS, bookings });
const createBookingAc     = booking => ({ type: CREATE_BOOKING, booking });
const updateBookingAc     = booking => ({ type: UPDATE_BOOKING, booking });
const deleteBookingAc     = bookingId => ({ type: DELETE_BOOKING, bookingId });
const setBookingsLoading  = loading => ({ type: BOOKINGS_LOADING, loading });


export const fetchBookings = () => async dispatch => {
  dispatch(setBookingsLoading(true));
  try {
    const res  = await csrfFetch('/api/bookings');
    const data = await res.json();
    dispatch(setUserBookings(data.Bookings));
  } finally {
    dispatch(setBookingsLoading(false));
  }
};

export const createBooking = ({ spotId, startDate, endDate }) => async dispatch => {
  dispatch(setBookingsLoading(true));
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate })
    });
    if (!res.ok) throw res;
    const booking = await res.json();
    dispatch(createBookingAc(booking));
    return booking;
  } finally {
    dispatch(setBookingsLoading(false));
  }
};


export const updateBooking = ({ bookingId, spotId, startDate, endDate }) => async dispatch => {
  dispatch(setBookingsLoading(true));
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate })
    });
    if (!res.ok) throw res;
    const booking = await res.json();
    dispatch(updateBookingAc(booking));
    return booking;
  } finally {
    dispatch(setBookingsLoading(false));
  }
};

export const deleteBooking = ({ bookingId }) => async dispatch => {
  dispatch(setBookingsLoading(true));
  try {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw res;
    // Don't call res.json() on 204 No Content
    dispatch(deleteBookingAc(bookingId));
  } finally {
    dispatch(setBookingsLoading(false));
  }
};

// edit booking
export const editBooking = (bookingId, startDate, endDate) => async dispatch => {
  dispatch(setBookingsLoading(true));
  try {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate })
    });
    if (!res.ok) throw res;
    const booking = await res.json();
    dispatch(updateBookingAc(booking));
    return booking;
  } finally {
    dispatch(setBookingsLoading(false));
  }
}

const initialState = {
  list: [],    
  byId: {},    
  loading: false
};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_BOOKINGS: {
      const byId = {};
      action.bookings.forEach(b => { byId[b.id] = b });
      return { ...state, list: action.bookings, byId };
    }
    case CREATE_BOOKING:
      return {
        ...state,
        list: [...state.list, action.booking],
        byId: { ...state.byId, [action.booking.id]: action.booking }
      };
    case UPDATE_BOOKING:
      return {
        ...state,
        list: state.list.map(b => b.id === action.booking.id ? action.booking : b),
        byId: { ...state.byId, [action.booking.id]: action.booking }
      };
    case DELETE_BOOKING: {
      const { [action.bookingId]: _, ...rest } = state.byId;
      return {
        ...state,
        list: state.list.filter(b => b.id !== action.bookingId),
        byId: rest
      };
    }
    case BOOKINGS_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}