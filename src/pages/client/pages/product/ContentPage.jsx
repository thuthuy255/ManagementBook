import { Card, CardContent, CardMedia, Typography, IconButton, Skeleton } from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { useProduct } from './context/ProductContext';
import { formatPrice } from 'utils/format';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';

export default function ContentPage() {
  const { products, addToCart, fetchProducts } = useProduct();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, []);

  const getImage = (product) => {
    if (product.img_src) {
      const images = JSON.parse(product.img_src);
      return images?.length ? images[0] : images[1];
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {loading
        ? Array.from(new Array(8)).map((_, index) => (
            <Box key={index} sx={{ width: { xs: '100%', sm: '48%', md: '31%', lg: '23%' } }}>
              <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
            </Box>
          ))
        : products.map((product) => (
            <Box key={product.id} sx={{ width: { xs: '100%', sm: '48%', md: '31%', lg: '23%' } }}>
              <Card sx={{ height: '100%' }}>
                <CardMedia component="img" height="200" image={getImage(product)} alt={product.name} />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatPrice(product.price)}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <IconButton color="primary" onClick={() => addToCart(product)}>
                      <ShoppingCart />
                    </IconButton>
                    <IconButton color="secondary">
                      <Visibility />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
    </Box>
  );
}