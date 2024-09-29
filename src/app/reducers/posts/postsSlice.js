import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleApiError } from '../../common/common';
import { toast } from 'react-toastify';
import moment from 'moment';

// let Base_URL = 'http://localhost:3000/blogs?_page=1&_limit=8';
let Base_URL = 'http://localhost:3000/blogs';

// Get post
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (filterValue, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    let url = Base_URL;

    console.log(filterValue);

    if (filterValue) {
      const { category, tag, author, search, postPerpage, currentPage } =
        filterValue;
      //   console.log('tag', tag);

      let queryParams = [];

      if (category) queryParams.push(`category_id=${category}`);
      //   if (tag && tag.length > 0) queryParams.push(`tag_id=${[tag]}`);
      if (tag) queryParams.push(`tags=${[tag]}`);
      if (author) queryParams.push(`author_id=${author}`);
      if (search) queryParams.push(`title=${search}`);

      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      if (postPerpage && currentPage) {
        url = `${url}?_page=${postPerpage}&_limit=${currentPage}`;
      }
    }

    console.log(url);

    try {
      const response = await fetch(url, signal);
      if (!response.ok) {
        const error = {
          response: {
            data: {
              statusCode: response.status,
              message: await response.text()
            }
          }
        };

        throw error;
      }

      //   toast.success('Post is successfully fatched!');

      return response.json();
    } catch (error) {
      handleApiError(error, 'Post fatchin problem!');
      rejectWithValue(error);
    }
  }
);

// Create post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await fetch(
        Base_URL,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newPost)
        },
        signal
      );

      if (!response.ok) {
        const error = {
          response: {
            data: {
              statusCode: response.status,
              message: await response.text()
            }
          }
        };

        throw error;
      }

      toast.success('Post is successfully created!');

      return response.json();
    } catch (error) {
      handleApiError(error, "Post does't create!");

      return rejectWithValue(error);
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await fetch(
        `${Base_URL}/${id}`,
        {
          method: 'Delete'
        },
        signal
      );
      if (!response.ok) {
        const error = {
          response: {
            data: {
              statusCode: response.status,
              message: await response.text()
            }
          }
        };
        throw error;
      }
      toast.success('Post is successfully deleted!');
      return id;
    } catch (error) {
      handleApiError(error, "Post does't create!");

      return rejectWithValue(error);
    }
  }
);

// Update Post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ editablePost, postValue, selectedTagsId }, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const { id, created_at, ...rest } = editablePost;
    const timeStamp = moment.utc().toISOString();
    const updateNote = {
      ...rest,
      title: postValue.postTitle,
      description: postValue.postDescription,
      author_id: postValue.authorId,
      category_id: postValue.categoryId,
      likes: postValue.likes,
      tags: selectedTagsId,
      updated_at: timeStamp
    };

    console.log(selectedTagsId);

    try {
      const response = await fetch(
        `${Base_URL}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updateNote)
        },
        signal
      );

      if (!response.ok) {
        const error = {
          response: {
            data: {
              statusCode: response.status,
              message: await response.text()
            }
          }
        };
        throw error;
      }

      toast.success('Post is succesfully updated!');

      return response.json();
    } catch (error) {
      handleApiError(error, "Post does't update!");
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: null,
  posts: []
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Post fatching problem!';
      })
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.posts = [action.payload, ...state.posts];
        state.posts.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Post created problem!';
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.posts = state.posts.filter((item) => item.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Post created problem!';
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.posts = state.posts.map((item) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          }

          return item;
        });
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Post created problem!';
      });
  }
});

export const postReducerState = (state) => state.postReducer;

export default postsSlice.reducer;
