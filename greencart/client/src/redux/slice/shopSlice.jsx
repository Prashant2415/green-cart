// src/redux/slice/shopSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../thunk/productThunkAPI";
// import { fetchAllProducts } from "../thunk/fetchProducts";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // (Optional) Other synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
