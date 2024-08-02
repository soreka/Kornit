import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer.js';
import filterReducer from './reducers/filterReducer.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer
  }
});

export default store;
