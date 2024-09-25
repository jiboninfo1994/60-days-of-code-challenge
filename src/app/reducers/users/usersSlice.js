import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleApiError } from '../../common/common';
import { toast } from 'react-toastify';

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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ editableUser, inputValue }, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    const { id, ...rest } = editableUser;
    const updatedUser = {
      ...rest,
      name: inputValue.userName,
      category_id: inputValue.selectedCategory
    };

    try {
      const response = await fetch(
        `${URL}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
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

      toast.success('User is successfully Updated!');

      return response.json();
    } catch (error) {
      handleApiError(error, "User isn't Updated!");
      rejectWithValue(error);
    }
  }
);

// Filter author by category id
export const selectedAuthorsByCatId = createAsyncThunk(
  'posts/selectedAuthorsByCatId',
  async (id, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await fetch(`${URL}?category_id=${id}`, signal);
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
      //   toast.success('Post is succesfully updated!');
      return response.json();
    } catch (error) {
      handleApiError(error, 'Category id could not fetch!');
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: null,
  users: [],
  authorByCategories: []
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
      })
      .addCase(selectedAuthorsByCatId.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(selectedAuthorsByCatId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.authorByCategories = action.payload;
      })
      .addCase(selectedAuthorsByCatId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Author fatched problem!';
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.users = state.users.map((item) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          }

          return item;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Author fatched problem!';
      });
  }
});

export const userReducerState = (state) => state.userReducer;

export default usersSlice.reducer;
