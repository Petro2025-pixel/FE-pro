import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: state => {
      state.loading = true;
      state.error = null;
    },

    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = null;
    },

    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductRequest: (_state, _action) => {},

    editProductRequest: (_state, _action) => {},

    deleteProductRequest: (_state, _action) => {},

    addProductOptimistic: (state, action) => {
      state.list.push(action.payload);
    },

    editProductOptimistic: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    deleteProductOptimistic: (state, action) => {
      state.list = state.list.filter(product => product.id !== action.payload);
    },

    updateProductId: (state, action) => {
      const { tempId, realProduct } = action.payload;
      const index = state.list.findIndex(p => p.id === tempId);
      if (index !== -1) {
        state.list[index] = { ...realProduct, id: realProduct.id };
      }
    },

    clearProducts: state => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  editProductRequest,
  deleteProductRequest,
  addProductOptimistic,
  editProductOptimistic,
  deleteProductOptimistic,
  updateProductId,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
