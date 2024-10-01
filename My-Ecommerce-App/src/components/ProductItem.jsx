import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const ProductItem = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
