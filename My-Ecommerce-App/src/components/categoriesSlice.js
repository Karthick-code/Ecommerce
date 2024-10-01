// src/redux/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('https://ecommerce-k6g8.onrender.com/api/categories');
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    selectedCategory: '',
    status: 'idle',
  },
  reducers: {
    selectCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
