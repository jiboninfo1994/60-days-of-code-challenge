import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/category/categorySlice';
import userReducer from './reducers/users/usersSlice';
import postReducer from './reducers/posts/postsSlice';
import tagsReducer from './reducers/tags/tagsSlice';
import commentsReducer from './reducers/comments/commentsSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    userReducer,
    postReducer,
    tagsReducer,
    commentsReducer
  }
});

export default store;
