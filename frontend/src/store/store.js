import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {thunk} from 'redux-thunk'
import sessionReducer from './session'
import spotsReducer from './spots'
import reviewsReducer from './review'
import bookingsReducer from './booking'

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer
})

let enhancer = applyMiddleware(thunk)
if (import.meta.env.MODE !== 'production') {
  const { default: logger }               = await import('redux-logger')
  const composeEnhancers                   = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  enhancer                                 = composeEnhancers(applyMiddleware(thunk, logger))
}

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer)
}