import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import axiosInstance from '../api/axiosConfig'; 

const API_URL = 'http://localhost:3001/products';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { 'Authorization': `Bearer ${token}` }
  };
};

function* fetchProductsFromServer() {
  try {
    const header = getAuthHeader();
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, skipping fetch');
      return;
    }

    const response = yield call(axios.get, API_URL, header);
    const normalizedProducts = response.data.map(product => ({
      ...product,
      price: Number(product.price) || 0,
      quantity: Number(product.quantity) || 0
    }));
    
    yield put({ type: 'SET_PRODUCTS', payload: normalizedProducts });
  } catch (e) {
    console.error('Error loading products:', e.response?.data || e.message);
  }
}

function* deleteProductSaga(action) {
  try {
    const productId = action.payload;
    
    yield put({ type: 'DELETE_PRODUCT', payload: productId });
    
    yield call(axiosInstance.delete, `/products/${productId}`);
    
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
    
  } catch (e) {
    console.error('Error deleting product:', e.response?.data || e.message);
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
  }
}

function* addProductSaga(action) {
  try {
  
    const productToSend = {
      ...action.payload,
      price: String(action.payload.price || 0), 
      quantity: String(action.payload.quantity || 0) 
    };
    
    yield put({ 
      type: 'ADD_PRODUCT', 
      payload: {
        ...action.payload,
        price: Number(action.payload.price || 0),
        quantity: Number(action.payload.quantity || 0)
      }
    });
    
    yield call(axiosInstance.post, '/products', productToSend);
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
    
  } catch (e) {
    console.error("Error adding product:", e.response?.data || e.message);
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
  }
}
function* editProductSaga(action) {
  try {
    const { id, ...updateData } = action.payload;
    const productToSend = {
      ...updateData,
      price: String(updateData.price || 0),
      quantity: String(updateData.quantity || 0)
    };
    
    yield put({ 
      type: 'UPDATE_PRODUCT', 
      payload: {
        ...action.payload,
        price: Number(updateData.price || 0),
        quantity: Number(updateData.quantity || 0)
      }
    });
    
    yield call(axiosInstance.put, `/products/${id}`, productToSend);
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
    
  } catch (e) {
    console.error("Error editing product:", e.response?.data || e.message);
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' });
  }
}

export function* watchProductChanges() {
  yield call(fetchProductsFromServer);
  yield takeLatest('FETCH_PRODUCTS_REQUEST', fetchProductsFromServer);
  yield takeEvery('ADD_PRODUCT_REQUEST', addProductSaga);
  yield takeEvery('DELETE_PRODUCT_REQUEST', deleteProductSaga);
  yield takeEvery('EDIT_PRODUCT_REQUEST', editProductSaga);
}
