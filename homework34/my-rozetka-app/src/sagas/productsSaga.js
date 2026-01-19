import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios'; 


const API_URL = 'http://localhost:3001/products';


const getProducts = (state) => state.products.list;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};


function* fetchProductsFromServer() {
  try {
   
    const response = yield call(axios.get, API_URL, getAuthHeader());
    
    yield put({ type: 'SET_PRODUCTS', payload: response.data });
  } catch (e) {
    console.error('Error loading products:', e.response?.data?.message || e.message);
    
   
    if (e.response?.status === 401 || e.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
}


function* syncProductsWithServer() {
  try {
    
    const currentList = yield select(getProducts);
    
    yield call(axios.post, API_URL, currentList, getAuthHeader());
    
    console.log('Data has been successfully synchronized with the database (products.json)');
  } catch (e) {
    console.error('Sync error:', e.response?.data?.message || e.message);
  }
}

export function* watchProductChanges() {
  
  yield call(fetchProductsFromServer);

  yield takeLatest('FETCH_PRODUCTS_REQUEST', fetchProductsFromServer);

  yield takeLatest([
    'ADD_PRODUCT', 
    'DELETE_PRODUCT', 
    'UPDATE_PRODUCT'
  ], syncProductsWithServer);
}