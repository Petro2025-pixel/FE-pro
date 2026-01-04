import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../../store/themeSlice';
import { toggleLanguage } from '../../store/languageSlice';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка гамбургера

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mode = useSelector((state) => state.theme.mode);
  const lang = useSelector((state) => state.language.lang);

  const menuLabels = {
    en: { resume: 'Resume', todo: 'Todo', swapi: 'SWAPI' },
    ua: { resume: 'Резюме', todo: 'Todo', swapi: 'SWAPI' }
  };

  const t = menuLabels[lang];
  const navItems = [
    { label: t.resume, path: '/' },
    { label: t.todo, path: '/todo' },
    { label: t.swapi, path: '/swapi' },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <HistoryEduIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 800 }}
          >
            PORTFOLIO
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Десктопное меню (скрывается на мобильных) */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    variant={location.pathname === item.path ? "outlined" : "text"}
                    sx={{ textTransform: 'none' }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Button
              onClick={() => dispatch(toggleLanguage())}
              color="inherit"
              startIcon={<TranslateIcon />}
              sx={{ fontWeight: 'bold', minWidth: '70px' }}
            >
              {lang.toUpperCase()}
            </Button>

            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Кнопка гамбургера (появляется только на мобильных) */}
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </Container>

   <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
  {/* Этот Box создает отступ, равный высоте AppBar */}
  <Toolbar /> 
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    <List>
      {navItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton 
            component={RouterLink} 
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>
    </AppBar>
  );
};

export default Header;