import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/authActions';

const API_URL = 'http://localhost:3001';

const apiLogin = (credentials) => 
  axios.post(`${API_URL}/login`, credentials);

function* handleLogin(action) {
  try {
    const response = yield call(apiLogin, action.payload);
    const { token } = response.data;
    localStorage.setItem('token', token);
    yield put(loginSuccess(token));
    yield put({ type: 'FETCH_PRODUCTS_REQUEST' }); 
  } catch (e) {
    console.error('Login error:', e);
    yield put(loginFailure('Incorrect login or password'));
  }
}

function* handleLogout() {
  localStorage.removeItem('token');
  yield put({ type: 'SET_PRODUCTS', payload: [] });
}

export function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest('LOGOUT', handleLogout); 
}