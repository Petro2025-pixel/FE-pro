const initialState = {
  items: []
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, items: action.payload };
    case 'ADD_TODO':
        const newTodo = { 
          id: crypto.randomUUID(), 
          text: action.payload, 
          completed: false 
         };
  return { ...state, items: [...state.items, newTodo] };
    case 'DELETE_TODO':
      return { ...state, items: state.items.filter(todo => todo.id !== action.payload) };
    case 'TOGGLE_TODO':
      return {
        ...state,
        items: state.items.map(todo => 
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'EDIT_TODO':
      return {
        ...state,
        items: state.items.map(todo => 
          todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
        )
      };
    default:
      return state;
  }
}