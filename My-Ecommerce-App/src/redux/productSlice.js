


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch categories from backend API
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/api/categories'); // Updated URL to point to your backend
  return response.data; // Assuming response contains a list of categories
});


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = '', searchQuery = '', skip = 0, limit = 10 }) => {
    let url;

    if (searchQuery) {
      // Search products by title in the backend
      url = `https://dummyjson.com/products/search?q=${searchQuery}`; // Updated URL
    } else if (category) {
      // Fetch products from selected category in the backend
      url = `https://dummyjson.com/products/category/${category}`; // Updated URL
    } else {
      // Fetch all products from the backend
      url = `https://dummyjson.com/products`; // Updated URL
    }

    const response = await axios.get(url);
    return response.data.products; // Assuming response.data contains the array of products
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    selectedCategory: '',
    searchQuery: '',
    skip: 0,
    limit: 10,
    hasMore: true,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.skip = 0; // Reset skip when search changes
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload; // Set the selected category
        state.skip = 0; // Reset skip when category changes
        state.products = []; // Clear products when category changes
    },
    incrementSkip: (state) => {
      state.skip += state.limit;
    },
    resetProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload; // Set the fetched categories
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.products = [...state.products, ...action.payload]; // Append products to the list
          if (action.payload.length < state.limit) {
            state.hasMore = false; // If fewer products are fetched, stop fetching
          }
        } else {
          state.hasMore = false; // If no products are fetched, stop loading
        }
      });
  },
});

export const { setSearchQuery, setSelectedCategory, incrementSkip, resetProducts } = productSlice.actions;
export default productSlice.reducer;
