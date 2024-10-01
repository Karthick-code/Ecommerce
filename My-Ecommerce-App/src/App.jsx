// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar } from '@mui/material';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/productSlice'; // Import setSearchQuery action
import CategoryDropdown from './components/CategoryDropdown';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

const App = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || '');
    const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (searchTerm) {
            params.append('search', searchTerm);
            dispatch(setSearchQuery(searchTerm)); // Dispatch the search query
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }, [selectedCategory, searchTerm, dispatch]);

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Product App</Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" align="center" marginY={4}>
                Browse Products
            </Typography>
            <CategoryDropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ProductList selectedCategory={selectedCategory} search={searchTerm} />
        </Container>
    );
};

// Wrap the App component with Router in your index.js or main entry point
const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;


