import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/category/categorySlice';

const store = configureStore({
  reducer: {
    categoryReducer
  }
});

export default store;
