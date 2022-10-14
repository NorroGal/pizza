import { configureStore } from '@reduxjs/toolkit';
import filter from './sclices/filterSlice';
import cart from './sclices/cartSlice';
import pizza from './sclices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  },
});