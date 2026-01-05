import React from 'react';
import { 
  Container, Typography, Paper, Box, Button, Card, CardMedia, 
  Grid, Divider, Stack, Chip 
} from '@mui/material'; 
import { useSelector } from 'react-redux';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Todo = () => {
  const lang = useSelector((state) => state.language.lang);

  const content = {
    en: {
      title: "TodoSaga App 📝",
      subtitle: "State Management with Redux-Saga",
      description: "A robust task manager designed to handle complex asynchronous flows. It ensures data integrity and a smooth user experience even with heavy logic. 🚀",
      techTitle: "Core Features:",
      features: ["Redux-Saga", "Async Actions", "Local Storage", "Responsive UI"],
      viewLive: "Live Demo",
      viewCode: "Source Code",
    },
    ua: {
      title: "TodoSaga Додаток 📝",
      subtitle: "Управління станом через Redux-Saga",
      description: "Потужний менеджер завдань, розроблений для обробки складних асинхронних потоків. Забезпечує цілісність даних та плавний інтерфейс. 🚀",
      techTitle: "Ключові особливості:",
      features: ["Redux-Saga", "Асинхронні дії", "Local Storage", "Адаптивний UI"],
      viewLive: "Живе демо",
      viewCode: "Сирцевий код",
    }
  };

  const t = content[lang];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={6} sx={{ p: { xs: 3, md: 6 }, borderRadius: 5, overflow: 'hidden' }}>
        <Grid container spacing={6}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
              {t.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
              {t.subtitle}
            </Typography>
            <Divider sx={{ mb: 3, width: '60px', height: '4px', bgcolor: 'primary.main' }} />
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t.description}
            </Typography>
            <Typography variant="h6" gutterBottom>{t.techTitle}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
              {t.features.map((f) => (
                <Chip key={f} label={`✨ ${f}`} variant="outlined" color="primary" />
              ))}
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" startIcon={<LaunchIcon />} href="https://petro2025-pixel.github.io/TodoSaga/" target="_blank">
                {t.viewLive}
              </Button>
              <Button variant="outlined" startIcon={<GitHubIcon />} href="https://github.com/Petro2025-pixel/TodoSaga" target="_blank">
                {t.viewCode}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 2, width: '100%' }}>
              <CardMedia component="img" image="./images/todo-saga-screenshot-1.png" alt="Desktop" />
            </Card>
            <Card sx={{ width: '180px', borderRadius: '20px', border: '4px solid #333', boxShadow: 10 }}>
              <CardMedia component="img" image="./images/todo-mobile2.jpg" alt="Mobile" />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Todo;