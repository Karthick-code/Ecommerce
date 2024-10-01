


// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, incrementSkip, resetProducts } from '../redux/productSlice';
import {
    CircularProgress,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container
} from '@mui/material';

export default function ProductList() {
    const dispatch = useDispatch();

    // Selectors from Redux store
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const skip = useSelector((state) => state.products.skip);
    const limit = useSelector((state) => state.products.limit);
    const hasMore = useSelector((state) => state.products.hasMore);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory); // Get selected category from categories slice
    const searchQuery = useSelector((state) => state.products.searchQuery); // Get search query from products slice

    useEffect(() => {
        // Reset products and fetch based on selected category and search
        dispatch(resetProducts()); // Clear previous products
        dispatch(fetchProducts({ category: selectedCategory, searchQuery, skip: 0, limit }));
    }, [selectedCategory, searchQuery, dispatch, limit]);

    // Function to load more products
    const loadMoreProducts = () => {
        if (hasMore && !loading) {
            dispatch(incrementSkip()); // Increase the skip value
            dispatch(fetchProducts({ category: selectedCategory, searchQuery, skip, limit })); // Fetch more products
        }
    };

    if (loading && products.length === 0) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>

            <Grid container spacing={2}>
                {products.map((product,index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${product.id}-${index}`}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.thumbnail || product.image} // Use thumbnail or fallback to image
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Price: ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary">
                                    Buy Now
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="secondary" onClick={loadMoreProducts}>
                        Load More
                    </Button>
                </div>
            )}

            {loading && products.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <CircularProgress />
                </div>
            )}
        </Container>
    );
}
