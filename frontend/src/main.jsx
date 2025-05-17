import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import App from './App'
import './index.css'
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'
import {  ModalProvider } from './context/Modal'

const store = configureStore()


if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ModalProvider>
  </React.StrictMode>
)