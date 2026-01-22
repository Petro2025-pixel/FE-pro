import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { productsAPI } from '../../api/productsAPI';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductOptimistic,
  editProductOptimistic,
  deleteProductOptimistic,
  updateProductId,
} from '../slices/productsSlice';

function* fetchProductsSaga() {
  try {
    yield delay(100);
    const response = yield call(productsAPI.getAll);

    const normalizedProducts = response.data.map(product => ({
      ...product,
      price: Number(product.price) || 0,
      quantity: Number(product.quantity) || 0,
    }));

    yield put(fetchProductsSuccess(normalizedProducts));
  } catch (error) {
    yield put(fetchProductsFailure(error.response?.data?.message || 'Не удалось загрузить товары'));
  }
}

function* addProductSaga(action) {
  try {
    const tempId = Date.now();
    const productWithTempId = {
      ...action.payload,
      id: tempId,
    };

    yield put(addProductOptimistic(productWithTempId));

    const response = yield call(productsAPI.create, action.payload);

    yield put(
      updateProductId({
        tempId,
        realProduct: response.data,
      })
    );
  } catch (_error) {
    // ignore error - optimistic update
  }
}

function* editProductSaga(action) {
  try {
    const { id, ...productData } = action.payload;

    yield put(editProductOptimistic(action.payload));
    yield call(productsAPI.update, id, productData);
  } catch (_error) {
    // ignore error - optimistic update
  }
}

function* deleteProductSaga(action) {
  try {
    const productId = action.payload;

    yield put(deleteProductOptimistic(productId));
    yield call(productsAPI.delete, productId);
  } catch (_error) {
    // ignore error - optimistic update
  }
}

export function* watchProductChanges() {
  yield takeLatest('products/fetchProductsRequest', fetchProductsSaga);
  yield takeLatest('products/addProductRequest', addProductSaga);
  yield takeLatest('products/editProductRequest', editProductSaga);
  yield takeLatest('products/deleteProductRequest', deleteProductSaga);
}
