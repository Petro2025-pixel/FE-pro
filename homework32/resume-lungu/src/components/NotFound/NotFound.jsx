import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Container, CircularProgress, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const translations = {
  en: {
    title: "404",
    subtitle: "Page Not Found",
    message: "The page you are looking for doesn't exist or has been moved.",
    redirect: "Redirecting to home in",
    sec: "sec",
    button: "Go Home Now"
  },
  ua: {
    title: "404",
    subtitle: "Сторінку не знайдено",
    message: "Сторінка, яку ви шукаєте, не існує або її було переміщено.",
    redirect: "Повернення на головну через",
    sec: "сек",
    button: "На головну"
  }
};

const NotFound = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  
  // 1. Проверка языка
  const lang = useSelector((state) => state.language.lang);
  const t = translations[lang] || translations.en;

  // 2. Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (seconds === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [seconds, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 4,
          // Использование системных цветов темы для фона
          bgcolor: 'background.paper',
          backgroundImage: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #1e1e1e 0%, #121212 100%)' 
            : 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h1" sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}>
          {t.title}
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          {t.subtitle}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          {t.message}
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={2}
            sx={{ color: 'action.disabled', position: 'absolute' }}
          />
          <CircularProgress 
            variant="determinate" 
            value={(seconds / 5) * 100} 
            size={120}
            thickness={4}
            sx={{ 
              strokeLinecap: 'round',
              transform: 'rotate(-90deg) !important'
            }} 
          />
          <Box
            sx={{
              top: 0, left: 0, bottom: 0, right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" component="div" fontWeight="bold" color="text.primary">
              {seconds}
            </Typography>
            <Typography variant="caption" color="text.secondary">{t.sec}</Typography>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 8, px: 4, textTransform: 'none' }}
        >
          {t.button}
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;