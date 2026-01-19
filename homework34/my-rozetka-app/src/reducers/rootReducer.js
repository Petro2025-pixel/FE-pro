import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer'; 


const appReducer = combineReducers({
  auth: authReducer,
  products: productsReducer 
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('token');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;