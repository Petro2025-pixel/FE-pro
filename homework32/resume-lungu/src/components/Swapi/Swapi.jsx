import React from 'react';
import { 
  Container, Typography, Paper, Box, Button, Card, CardMedia, 
  Grid, Divider, Stack, Chip 
} from '@mui/material'; // Grid добавлен в импорт
import { useSelector } from 'react-redux';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Swapi = () => {
  const lang = useSelector((state) => state.language.lang);

  const content = {
    en: {
      title: "Star Wars API 🛸",
      subtitle: "Async Logic with Redux-Thunk",
      description: "An explorer for the Star Wars universe. Fetches real-time data about planets, characters, and starships using thunk-actions. 🌌",
      techTitle: "Key Capabilities:",
      features: ["Redux-Thunk", "REST API", "Filtering", "Error Handling"],
      viewLive: "Live Demo",
      viewCode: "Source Code",
    },
    ua: {
      title: "Star Wars API 🛸",
      subtitle: "Асинхронна логіка з Redux-Thunk",
      description: "Провідник всесвітом Зоряних Війн. Отримує дані про планети, героїв та кораблі в реальному часі через thunk-екшени. 🌌",
      techTitle: "Ключові можливості:",
      features: ["Redux-Thunk", "REST API", "Фільтрація", "Помилки"],
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
            <Typography variant="h5" color="secondary" gutterBottom sx={{ mb: 3 }}>
              {t.subtitle}
            </Typography>
            <Divider sx={{ mb: 3, width: '60px', height: '4px', bgcolor: 'secondary.main' }} />
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t.description}
            </Typography>
            <Typography variant="h6" gutterBottom>{t.techTitle}</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
              {t.features.map((f) => (
                <Chip key={f} label={`⚡ ${f}`} variant="outlined" color="secondary" />
              ))}
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="secondary" startIcon={<LaunchIcon />} href="https://petro2025-pixel.github.io/SWAPI-redux-thunk/" target="_blank">
                {t.viewLive}
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<GitHubIcon />} href="https://github.com/Petro2025-pixel/SWAPI-redux-thunk" target="_blank">
                {t.viewCode}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 2, width: '100%' }}>
              <CardMedia component="img" image="./images/swapi-desktop.png" alt="Desktop" />
            </Card>
            <Card sx={{ width: '180px', borderRadius: '20px', border: '4px solid #333', boxShadow: 10 }}>
              <CardMedia component="img" image="./images/swapi-mobile.png" alt="Mobile" />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Swapi;