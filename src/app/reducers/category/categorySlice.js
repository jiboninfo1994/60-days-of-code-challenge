import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'http://localhost:3000/categories';

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw Error('Data fatching problem');
      }

      return response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (name) => {
    const newCat = {
      id: Date.now() + '',
      name
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newCat)
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id) => {

    const response = await fetch(`${URL}/${id}?_dependent=authors`, {
      method: 'DELETE'
    });

    return id;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ editableCat, catName }) => {
    const { id, ...rest } = editableCat;
    const updateNote = { ...rest, name: catName };

    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateNote)
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: null,
  categories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem!';
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = [...state.categories, action.payload];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem!';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem!';
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.categories = [...state.categories].map((item) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          }
          return item;
        });

        state.editMode = false;
        state.editableCat = null;
        state.catName = '';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message || 'Data fatching problem!';
      });
  }
});

export const categoryReducerState = (state) => state.categoryReducer;

export default categorySlice.reducer;
