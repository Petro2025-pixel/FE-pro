import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Add, InfoOutlined, LogoutOutlined, PersonOutline } from '@mui/icons-material'; 
import rozetkaLogo from '../../assets/rozetka2.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const Header = ({ title, onAddClick }) => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
  dispatch(logout()); 
  navigate('/login');
};

  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mb: 2 }}>
      
      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <img 
          src={rozetkaLogo} 
          alt="Rozetka" 
          style={{ width: '200px', display: 'block', cursor: 'pointer' }} 
          onClick={() => navigate('/dashboard')} 
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, minHeight: '56px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {location.pathname === '/about' ? (
            <Button 
              variant="contained" 
              onClick={handleBack}
              startIcon={<ArrowBackIosNewIcon sx={{ color: 'black', fontSize: '1rem' }}/>}
              sx={{ bgcolor: 'white', color: '#6db37e', fontWeight: 'bold', px: 3, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' } }}
            > Back </Button>
          ) : (
            <>
              
              <Button 
                variant="contained" 
                onClick={() => navigate(location.pathname === '/preview' ? '/dashboard' : '/preview')}
                startIcon={
                  location.pathname === '/preview' 
                    ? <ArrowBackIosNewIcon sx={{ color: 'black', fontSize: '1rem' }}/> 
                    : <PersonOutline sx={{ color: 'black' }}/>
                }
                sx={{ bgcolor: 'white', color: '#6db37e', fontWeight: 'bold', px: 3, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' } }}
              > 
                {location.pathname === '/preview' ? 'Table' : 'Preview'} 
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => navigate('/about')}
                startIcon={<InfoOutlined sx={{ color: 'black' }}/>}
                sx={{ bgcolor: 'white', color: '#6db37e', fontWeight: 'bold', px: 3, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' } }}
              > About Tech </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {onAddClick && (
            <Button 
              variant="contained" 
              startIcon={<Add sx={{ color: 'black' }}/>} 
              onClick={onAddClick}
              sx={{ bgcolor: 'white', color: '#6db37e', fontWeight: 'bold', px: 4, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' } }}
            > Add product </Button>
          )}
          <Button 
            variant="contained" 
            onClick={handleLogout}
            startIcon={<LogoutOutlined sx={{ color: 'black' }}/>}
            sx={{ bgcolor: 'white', color: '#f44336', fontWeight: 'bold', px: 3, py: 1.5, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' } }}
          > Logout </Button>
        </Box>
      </Box>

      
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;