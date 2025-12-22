import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound'; // Импортируйте новый компонент
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { APP_INIT } from './store/actions';
import './App.css';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import EditModal from './components/EditModal';

function App() {
 
const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
});

useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}, [darkMode]);

  const [editingTodo, setEditingTodo] = useState(null);

  const todos = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_INIT });
  }, [dispatch]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
       <div className="app-container" data-theme={darkMode ? 'dark' : 'light'}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={
            <div className="container py-4">
              <h2 className="text-center mb-4">Todo List</h2>
              <TodoForm />
              <ul className="list-group">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onEdit={setEditingTodo} />
                ))}
              </ul>
              {todos.length === 0 && <p className="text-center text-muted mt-5">Your list is empty.</p>}
            </div>
          } />
          
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {editingTodo && <EditModal todo={editingTodo} onClose={() => setEditingTodo(null)} />}
      </div>
    </Router>
  );
}

export default App;