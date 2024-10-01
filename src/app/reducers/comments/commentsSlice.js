import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { handleApiError } from '../../common/common';

const BASE_URL = 'http://localhost:3000';

// Get comments
export const getComments = createAsyncThunk(
  'comments/getComments',
  async (id, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}/comments`, signal);

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

      return response.json();
    } catch (error) {
      handleApiError(error, 'Comments not found!');
      rejectWithValue(error);
    }
  }
);

// Create comment
export const createComment = createAsyncThunk(
  'comments/createComment',
  async (data, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await fetch(
        `${BASE_URL}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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

      toast.success('Comment is successfully created!');

      return response.json();
    } catch (error) {
      handleApiError(error, "Comment doesn't created!");
      rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: null,
  comments: []
};
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Comment fatching problem!';
      })
      .addCase(getComments.pending, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Comment fatching problem!';
      });
  }
});

export const commentsReducerState = (state) => state.commentsReducer;
export default commentsSlice.reducer;
