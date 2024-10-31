'use client';

import type { FC } from 'react';
import type { RootState, AppDispatch } from 'src/store';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, Grid, List, Button, ListItem, Typography, CardContent } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { addToCart } from 'src/store/cart';
import { fetchProducts } from 'src/store/products';

export const ProductList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 5, px: 4 }}>
      {loading && <Typography variant="h6">Loading products...</Typography>}
      {!loading && (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid md={4} sm={6} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">${product.price.toFixed(2)}</Typography>
                  <Button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                        })
                      )
                    }
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {cartItems.length !== 0 && (
        <Box sx={{ mt: 5, px: 4 }}>
          <Typography variant="h4">Order Summary</Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <Typography>{item.name}</Typography>
                <Typography>
                  {item.quantity} x ${item.price}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${totalAmount.toFixed(2)}
          </Typography>
          <Button color="primary" variant="contained" sx={{ mt: 2 }}>
            <RouterLink href="/dashboard/payment-done"> Confirm Order & Pay</RouterLink>
          </Button>
        </Box>
      )}
    </Box>
  );
};
