import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, order, sortBy, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6338275d132b46ee0beb384a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  // https://6348f1f20b382d796c7a79b1.mockapi.io
  return data;
});

const initialState = {
  items: [],
  status: 'loading',             // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    extraReducers: {
      [fetchPizzas.pending]: (state) => {
        state.status = 'loading';
        state.items = [];
        // console.log('Идет отправка, подождите ...');
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = 'success';
        // console.log(state, 'Все ок');
      },
      [fetchPizzas.rejected]: (state) => {
        state.status = 'error';
        state.items = [];
        // console.log('Была ошибка ...');
      },
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
