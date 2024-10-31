// store/index.ts
import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart';
import productReducer from './products';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

// Define RootState and AppDispatch types to use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
