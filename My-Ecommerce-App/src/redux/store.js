



import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import categoriesSlice from '../components/categoriesSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesSlice
    },
});

export default store;
