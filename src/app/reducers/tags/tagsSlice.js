import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleApiError } from '../../common/common';
import { toast } from 'react-toastify';
import moment from 'moment';

const URL = 'http://localhost:3000/tags';

// Get tags
export const getTags = createAsyncThunk('tags/getTags', async (_, thunkAPI) => {
  const { rejectWithValue, signal } = thunkAPI;

  try {
    const response = await fetch(URL, signal);

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

    // toast.success('Post succesfully featched');

    return response.json();
  } catch (error) {
    handleApiError(error, 'Tag featcing problem!');
    rejectWithValue(error);
  }
});

// Create tag
export const crateTag = createAsyncThunk(
  'tags/crateTag',
  async (data, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await fetch(
        URL,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
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

      toast.success('Tag is successfully created!');

      return response.json();
    } catch (error) {
      handleApiError(error, "Tag does't created!");
      rejectWithValue(error);
    }
  }
);

// Delete tag
export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async (id, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await fetch(
        `${URL}/${id}`,
        {
          method: 'DELETE'
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

      toast.success('Tag is successfully deleted!');

      return id;
    } catch (error) {
      handleApiError(error, "Tag isn't deleted!");
      rejectWithValue(error);
    }
    return id;
  }
);

// Update tag
export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async (data, thunkAPI) => {
    const timeStamp = moment.utc().toISOString();
    const { rejectWithValue, signal } = thunkAPI;
    const { tagName, editableTag } = data;
    const { id, ...rest } = editableTag;
    const updateNote = { ...rest, name: tagName, updatedAt: timeStamp };

    // console.log(updateNote);

    try {
      const response = await fetch(
        `${URL}/${id}`,
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

      toast.success('Tag is successfully Updated!');

      return response.json();
    } catch (error) {
      handleApiError(error, "Tag does't Updated!");
      rejectWithValue(error);
    }
  }
);

// Search tag by title
export const searchTagByTitle = createAsyncThunk(
  'tags/searchTagByTitle',
  async (data, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await fetch(`${URL}?name=${data}`, signal);

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
      handleApiError(error, 'Tag search is not possible!');
      rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: null,
  tags: [],
  searchTags: []
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: (state) => {
    state.searchTags = [];
  },
  extraReducers: (builder) => {
    builder
      .addCase(crateTag.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(crateTag.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.isLoading = false;
        state.isError = null;
        state.tags = [...state.tags, action.payload];
      })
      .addCase(crateTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Tag is not created!';
      })
      .addCase(getTags.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Tag is not created!';
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.tags = state.tags.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Tag is not created!';
      })
      .addCase(updateTag.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.tags = state.tags.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Tag is not created!';
      })
      .addCase(searchTagByTitle.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(searchTagByTitle.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.isError = null;
        state.tags = action.payload;
      })
      .addCase(searchTagByTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Tag featch issue!';
      });
  }
});

export const tagsReducerState = (state) => state.tagsReducer;
export const { updateSearchTags } = tagsSlice.actions;

export default tagsSlice.reducer;
