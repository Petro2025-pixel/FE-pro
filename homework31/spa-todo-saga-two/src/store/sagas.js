import { put, takeEvery, select, call } from 'redux-saga/effects';

const storage = {
  save: (todos) => localStorage.setItem('my_todos', JSON.stringify(todos)),
  load: () => JSON.parse(localStorage.getItem('my_todos')) || []
};

function* saveTodosSaga() {
  const state = yield select(state => state.items);
  yield call(storage.save, state);
}

function* loadTodosSaga() {
  try {
    const todos = yield call(storage.load);
    yield put({ type: 'SET_TODOS', payload: todos });
  } catch (e) {
    console.error("Failed to load todos", e);
  }
}

export default function* rootSaga() {
  yield takeEvery('APP_INIT', loadTodosSaga);
  yield takeEvery(['ADD_TODO', 'DELETE_TODO', 'TOGGLE_TODO', 'EDIT_TODO'], saveTodosSaga);
}