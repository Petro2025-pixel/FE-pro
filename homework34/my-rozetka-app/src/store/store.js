import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../reducers/authReducer';
import productsReducer from '../reducers/productsReducer'; 
import { watchAuth } from '../sagas/authSaga';
import { watchProductChanges } from '../sagas/productsSaga'; 

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ 
  auth: authReducer,
  products: productsReducer 
});

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProductChanges); 

export default store;