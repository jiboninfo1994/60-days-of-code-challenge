import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/Student';

const store = configureStore({
  reducer: studentReducer
});

export default store;
