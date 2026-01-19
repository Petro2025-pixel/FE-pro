const initialState = {
  list: [] 
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        list: action.payload
      };

    
    case 'ADD_PRODUCT':
      return { 
        ...state, 
        list: [...state.list, { ...action.payload, id: Date.now() }] 
      };

   
    case 'DELETE_PRODUCT':
      return { 
        ...state, 
        list: state.list.filter(p => p.id !== action.payload) 
      };

    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        list: state.list.map(p => p.id === action.payload.id ? action.payload : p)
      };

    default:
      return state;
  }
}