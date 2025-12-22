export const APP_INIT = 'APP_INIT';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SET_TODOS = 'SET_TODOS'; 

export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const editTodo = (id, newText) => ({ type: EDIT_TODO, payload: { id, newText } });