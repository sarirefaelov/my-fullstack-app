import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store.js';
import userReducer from './features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);