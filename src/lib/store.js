import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import filtersReducer from './slices/filtersSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
 
  },
});

