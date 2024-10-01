




// src/components/SearchBar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/productSlice';
import { TextField } from '@mui/material';

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.products.searchQuery);

    const handleSearchChange = (event) => {
        dispatch(setSearchQuery(event.target.value)); // Update the search query in Redux
    };

    return (
        <TextField
            label="Search Products"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
            variant="outlined"
        />
    );
}
