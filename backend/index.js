// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to fetch product categories
app.get('/api/categories', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

// Endpoint to fetch products with pagination
app.get('/api/products', async (req, res) => {
    const { category, page = 1, search = '' } = req.query;
    const limit = 10; // items per page
    const skip = (page - 1) * limit;

    try {
        const response = await axios.get('https://dummyjson.com/products', {
            params: {
                skip,
                limit,
                ...(category && { category }),
                ...(search && { q: search }),
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
