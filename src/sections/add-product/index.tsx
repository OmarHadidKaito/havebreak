'use client';

import { useForm } from 'react-hook-form';

import { Box, Button, TextField, Typography } from '@mui/material';

import axios from 'src/utils/axios';

export const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/api/add-product', data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mt: 5, px: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Product name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />
        <TextField label="Description" fullWidth margin="normal" {...register('description')} />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          {...register('price', { required: 'Price is required', min: 0 })}
          error={!!errors.price}
          helperText={errors.price?.message as string}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          {...register('stock', { required: 'Stock quantity is required', min: 0 })}
          error={!!errors.stock}
          helperText={errors.stock?.message as string}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Product
        </Button>
      </form>
    </Box>
  );
};
