import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import rozetkaTheme from './theme';
import LoginPage from './components/LoginPage/LoginPage';
import ProductsTable from './components/ProductsTable/ProductsTable'; 
import ProductPreview from './components/ProductPreview/ProductPreview';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound'; 

function App() {
  const token = useSelector(state => state.auth.token);
  const isAuth = Boolean(token);

  return (
    <ThemeProvider theme={rozetkaTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
         
          <Route 
            path="/login" 
            element={isAuth ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          
          <Route 
            path="/dashboard" 
            element={isAuth ? <ProductsTable /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/preview" 
            element={isAuth ? <ProductPreview /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/about" 
            element={isAuth ? <About /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/" 
            element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />} 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;