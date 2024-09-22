import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleApiError } from '../../common/common';

const URL = 'http://localhost:3000/authors';
export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await fetch(URL, { signal });
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
      handleApiError(error, 'Data featching problem');

      return rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    return response.json();
  }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE'
  });

  return id;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({}) => {
  //
});

const initialState = {
  isLoading: false,
  isError: null,
  users: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem';
      })
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem';
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log('action', action.payload);

        state.isLoading = false;
        state.isError = null;
        state.users = state.users.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem';
      });
  }
});

export const userReducerState = (state) => state.userReducer;

export default usersSlice.reducer;
