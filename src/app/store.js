import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/category/categorySlice';
import userReducer from './reducers/users/usersSlice';
import postReducer from './reducers/posts/postsSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    userReducer,
    postReducer
  }
});

export default store;
