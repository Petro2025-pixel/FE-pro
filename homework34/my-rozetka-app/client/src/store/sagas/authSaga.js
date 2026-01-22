import { takeLatest, call, put } from 'redux-saga/effects';
import { authAPI } from '../../api/authAPI';
import { loginSuccess, loginFailure } from '../slices/authSlice';

function* handleLogin(action) {
  try {
    const response = yield call(authAPI.login, action.payload);
    const { token } = response.data;

    localStorage.setItem('token', token);
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* handleLogout() {
  yield;
  localStorage.removeItem('token');
}

export function* watchAuth() {
  yield takeLatest('auth/loginRequest', handleLogin);
  yield takeLatest('auth/logout', handleLogout);
}
