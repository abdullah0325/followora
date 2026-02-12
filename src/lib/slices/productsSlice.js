import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callPublicApi } from "@/services/callApis";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (query = "") => {
    try {
      const res = await callPublicApi(`/products${query}`, "GET");
      console.log("API Response:", res);
      // API returns { success: true, data: [...], facets: {...}, pagination: {...} }
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    loading: true,
    page: 1,
  },

  reducers: {
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilteredProducts, setPage } = productSlice.actions;
export default productSlice.reducer;
