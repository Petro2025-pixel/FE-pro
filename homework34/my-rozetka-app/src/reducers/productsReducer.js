const initialState = {
  list: [],
  loading: false,
  error: null
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        list: action.payload,
        loading: false
      };

    case 'ADD_PRODUCT':
      const newProduct = {
        ...action.payload,
        price: Number(action.payload.price) || 0,
        quantity: Number(action.payload.quantity) || 0
      };
      return { 
        ...state, 
        list: [...state.list, newProduct],
        loading: false
      };

    case 'DELETE_PRODUCT':
      return { 
        ...state, 
        list: state.list.filter(p => p.id !== action.payload),
        loading: false
      };

    case 'UPDATE_PRODUCT':
      const updatedProduct = {
        ...action.payload,
        price: Number(action.payload.price) || 0,
        quantity: Number(action.payload.quantity) || 0
      };
      return {
        ...state,
        list: state.list.map(p => p.id === updatedProduct.id ? updatedProduct : p),
        loading: false
      };

    case 'ADD_PRODUCT_REQUEST':
    case 'EDIT_PRODUCT_REQUEST':
    case 'DELETE_PRODUCT_REQUEST':
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'ADD_PRODUCT_FAILURE':
    case 'EDIT_PRODUCT_FAILURE':
    case 'DELETE_PRODUCT_FAILURE':
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}