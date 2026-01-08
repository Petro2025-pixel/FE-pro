import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import TodoList from "./components/TodoList/TodoList";
import Contacts from "./components/Contacts/Contacts";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/NotFound/NotFound";
import { ThemeContext, themes } from "./themeContext";

const getInitialState = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error reading localStorage key:", key, error);
  }
  return defaultValue;
};


function App() {
  
  const initialTheme = getInitialState('appTheme', themes.light);
  const [theme, setTheme] = useState(initialTheme); 
  const initialTodos = getInitialState('appTodos', [
    { id: 1, description: "Todo 1", completed: false }, 
    { id: 2, description: "Todo 2", completed: true },
  ]);
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('appTheme', JSON.stringify(theme)); 
    document.body.style.backgroundColor = theme.background; 
    document.body.style.color = theme.color; 
  }, [theme]); 

  useEffect(() => {
    localStorage.setItem('appTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (description) => {
    setTodos((prevTodos) => {
      const maxId = prevTodos.length > 0
        ? Math.max(...prevTodos.map(todo => todo.id))
        : 0;
      const newId = maxId + 1; 
      return [...prevTodos, { id: newId, description, completed: false }];
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };
  
  const toggleTodoCompletion = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const contextValue = { 
    theme, 
    setTheme 
  };
  
  return (
   <ThemeContext.Provider value={contextValue}>
      <BrowserRouter>
        <div className="content">
          <Header />
          <ErrorBoundary>
            <main>
              <Routes>
                <Route 
                   path="/" 
                   element={<TodoList 
                              todos={todos} 
                              addTodo={addTodo} 
                              deleteTodo={deleteTodo} 
                              toggleTodoCompletion={toggleTodoCompletion} 
                            />} 
                /> 
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;