



// src/components/CategoryDropdown.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory } from './categoriesSlice'; // Import selectCategory from categoriesSlice
import { fetchProducts } from '../redux/productSlice'; // Import fetchProducts for fetching products based on category
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function CategoryDropdown() {
    const dispatch = useDispatch();

    // Get categories and selected category from the Redux store
    const categories = useSelector((state) => state.categories.list); 
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        dispatch(selectCategory(category)); // Update selected category in the store
        dispatch(fetchProducts({ category })); // Fetch products based on the selected category
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange} // Handle category selection
                label="Category"
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.slug} value={category.slug}>
                        {category.name} {/* Use category.name for display */}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}




