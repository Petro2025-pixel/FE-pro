import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchProductChanges } from './productsSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchProductChanges()]);
}
