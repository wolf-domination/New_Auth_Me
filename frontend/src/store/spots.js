import { csrfFetch } from './csrf';

const SET_SPOTS        = 'spots/SET_SPOTS';
const SET_CURRENT      = 'spots/SET_CURRENT';
const SET_USER_SPOTS   = 'spots/SET_USER_SPOTS';
const REMOVE_SPOT      = 'spots/REMOVE_SPOT';
const SPOTS_LOADING    = 'spots/SPOTS_LOADING';

const setSpots      = spots => ({ type: SET_SPOTS, spots });
const setCurrent    = spot  => ({ type: SET_CURRENT, spot });
const setUserSpots  = spots => ({ type: SET_USER_SPOTS, spots });
const removeSpot    = id    => ({ type: REMOVE_SPOT, spotId: id });
const setLoading    = loading => ({ type: SPOTS_LOADING, loading });

export const fetchSpots = ({ page, size }) => async dispatch => {
  dispatch(setLoading(true));
  const res  = await csrfFetch(`/api/spots?page=${page}&size=${size}`);
  const data = await res.json();
  dispatch(setSpots(data.spots));
  dispatch(setLoading(false));
};

export const fetchSpotDetail = id => async dispatch => {
  dispatch(setLoading(true));
  const res  = await csrfFetch(`/api/spots/${id}`);
  const spot = await res.json();
  dispatch(setCurrent(spot));
  dispatch(setLoading(false));
};

export const fetchUserSpots = () => async dispatch => {
  dispatch(setLoading(true));
  const res  = await csrfFetch('/api/spots/current');
  const data = await res.json();
  dispatch(setUserSpots(data.spots));
  dispatch(setLoading(false));
};

export const deleteSpot = spotId => async dispatch => {
  await csrfFetch(`/api/spots/${spotId}`, { method: 'DELETE' });
  dispatch(removeSpot(spotId));
};

export const clearSpot = () => ({ type: SET_CURRENT, spot: null });

export const createSpot = payload => async dispatch => {
  const res  = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  dispatch(setCurrent(data));
  return data;
};

export const updateSpot = (spotId, payload) => async dispatch => {
  const res  = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  dispatch(setCurrent(data));
  return data;
};

export const createSpotImage = ({ spotId, url, preview }) => async () => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify({ url, preview }),
  });
  return res.json();
};

const initialState = {
  list:     [],
  current:  null,
  userList: [],
  loading:  false
};

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, list: action.spots };
    case SET_CURRENT:
      return { ...state, current: action.spot };
    case SET_USER_SPOTS:
      return { ...state, userList: action.spots };
    case REMOVE_SPOT:
      return { ...state, userList: state.userList.filter(s => s.id !== action.spotId) };
    case SPOTS_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}