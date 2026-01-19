import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const NotFound = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    if (countdown === 0) navigate('/dashboard');
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <Box sx={{ height: '100vh', bgcolor: '#6db37e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <WarningAmberIcon sx={{ fontSize: 100, mb: 2 }} />
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>404</Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>Page Not Found</Typography>
      
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress variant="determinate" value={(countdown / 5) * 100} size={80} sx={{ color: 'white' }} />
        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6">{countdown}</Typography>
        </Box>
      </Box>
      <Typography>Redirecting to Dashboard in {countdown} seconds...</Typography>
    </Box>
  );
};

export default NotFound;