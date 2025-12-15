import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [
    { id: 1, description: "Todo 1", completed: false }, 
    { id: 2, description: "Todo 2", completed: true },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
    reducers: {
    addTodo: (state, action) => {
      const maxId = state.todos.length > 0
        ? Math.max(...state.todos.map(todo => todo.id))
        : 0;
      const newId = maxId + 1; 
      state.todos.push({ 
          id: newId, 
          description: action.payload,
          completed: false 
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  }
})
export const { addTodo, deleteTodo, toggleTodoCompletion } = todoSlice.actions;
export const { reducer } = todoSlice;