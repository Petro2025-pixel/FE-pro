import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import TodoList from "./components/TodoList/TodoList";
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/NotFound/NotFound";
import { ThemeContext, themes } from "./themeContext";

function App() {
  
  const [theme, setTheme] = useState(themes.light); 
  const contextValue = { 
    theme, 
    setTheme 
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      <BrowserRouter>
        <div className="content" style={{ background: theme.background }}>
          <Header />
          <ErrorBoundary>
            <main>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </ErrorBoundary>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
