import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await getAllProducts();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
