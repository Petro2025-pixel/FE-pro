import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  IconButton, 
  Divider, 
  Grid 
} from '@mui/material';
import { useSelector } from 'react-redux';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
  const lang = useSelector((state) => state.language.lang);

  const content = {
    en: {
      about: "Petro Lungu — Front-End Developer. Focused on creating modern and responsive web applications.",
      contact: "Contacts",
      rights: `© ${new Date().getFullYear()} Petro Lungu. All rights reserved.`,
      location: "Ukraine"
    },
    ua: {
      about: "Петро Лунгу — Front-End розробник. Фокусуюся на створенні сучасних та адаптивних веб-додатків.",
      contact: "Контакти",
      rights: `© ${new Date().getFullYear()} Петро Лунгу. Всі права захищені.`,
      location: "Україна"
    }
  };

  const t = content[lang];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto', // Важно для прижатия к низу
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? '#f8f9fa' : '#121212',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Левая колонка: Имя и Описание */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Petro Lungu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t.about}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📍 {t.location}
            </Typography>
          </Grid>

          {/* Правая колонка: Соцсети и Почта */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t.contact}
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              sx={{ mb: 2 }}
            >
              <IconButton 
                component="a" 
                href="mailto:polo200875@gmail.com" 
                color="primary"
                title="Email"
              >
                <EmailIcon />
              </IconButton>
              
              <IconButton 
                component="a" 
                href="https://www.linkedin.com/in/petro-lungu-308477384/" 
                target="_blank" 
                color="primary"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton 
                component="a" 
                href="https://github.com/Petro2025-pixel" 
                target="_blank" 
                color="inherit"
                title="GitHub"
              >
                <GitHubIcon />
              </IconButton>

              <IconButton 
                component="a" 
                href="https://t.me/your_telegram" // Можете заменить на свой ник
                target="_blank" 
                color="primary"
                title="Telegram"
              >
                <TelegramIcon />
              </IconButton>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
              polo200875@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t.rights}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;