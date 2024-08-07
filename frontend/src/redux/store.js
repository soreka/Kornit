import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer.js';
import filterReducer from './reducers/filterReducer.js';
import templateReducer from './reducers/templateReducer.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,
    templates: templateReducer


  }
});

export default store;
