import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer'; 
import { watchAuth } from '../sagas/authSaga';
import { watchProductChanges } from '../sagas/productsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProductChanges);

export default store;