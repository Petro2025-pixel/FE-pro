import '@fontsource/roboto';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material'; 
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer'; 
import Resume from './components/Resume/Resume';
import Todo from './components/Todo/Todo';
import Swapi from './components/Swapi/Swapi';
import NotFound from './components/NotFound/NotFound';

function App() {
  const mode = useSelector((state) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
          background: { default: mode === 'light' ? '#f5f5f5' : '#121212' },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
       
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          
          <Header />
          <Box component="main" sx={{ flex: 1 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Resume />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/swapi" element={<Swapi />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          <Footer /> 
          
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;