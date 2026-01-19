import React from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, Chip,
  Container, Divider, alpha, useTheme
} from '@mui/material';
import {
  RocketLaunch, Security, Palette, Code,
  Storage, Bolt, Api, Dashboard,
  CheckCircle, Speed, Devices, CloudDone
} from '@mui/icons-material';
import Header from '../Header/Header';

const TechFeatureCard = ({ icon, title, description, color, techList }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      height: '100%',
      background: 'white',
      border: `1px solid ${alpha(color, 0.2)}`,
      borderRadius: 2,
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 24px ${alpha(color, 0.15)}`,
        border: `1px solid ${color}`,
      }
    }}>
      <CardContent sx={{ 
        p: 2.5,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        <Box sx={{ 
          mb: 2,
          color: color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Box sx={{
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: alpha(color, 0.1),
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(icon, { sx: { fontSize: 24 } })}
          </Box>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            fontSize: '1rem',
            color: color
          }}>
            {title}
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ 
          mb: 2, 
          color: 'text.secondary',
          lineHeight: 1.5,
          fontSize: '0.85rem',
          flexGrow: 1
        }}>
          {description}
        </Typography>
        
        <Divider sx={{ 
          my: 1.5, 
          borderColor: alpha('#ddd', 0.5),
          width: '80%'
        }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 0.5,
          justifyContent: 'center'
        }}>
          {techList.map((tech, idx) => (
            <Chip
              key={idx}
              label={tech}
              size="small"
              sx={{
                bgcolor: alpha(color, 0.08),
                color: color,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 22,
                '& .MuiChip-label': {
                  px: 0.75,
                  py: 0.1
                }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};


const EnhancedAbout = () => {
  const theme = useTheme();
  
  const techFeatures = [
    {
      icon: <RocketLaunch />,
      title: 'Blazing Fast Build',
      color: '#FF6B6B',
      description: 'Vite-powered with instant HMR and optimized builds.',
      techList: ['Vite 7', 'React 19', 'ESBuild']
    },
    {
      icon: <Security />,
      title: 'Enterprise Security',
      color: '#4ECDC4',
      description: 'JWT authentication with protected routes.',
      techList: ['JWT Tokens', 'Axios', 'Auth Guards']
    },
    {
      icon: <Storage />,
      title: 'State Management',
      color: '#45B7D1',
      description: 'Redux-Saga for side effects and optimistic UI.',
      techList: ['Redux', 'Redux-Saga', 'Optimistic']
    },
    {
      icon: <Palette />,
      title: 'Design System',
      color: '#96CEB4',
      description: 'Custom MUI theme with Rozetka branding.',
      techList: ['MUI v7', 'Custom Theme', 'Responsive']
    },
    {
      icon: <Code />,
      title: 'Form Management',
      color: '#FFD166',
      description: 'High-performance forms with validation.',
      techList: ['Final-Form', 'Validation', 'Dynamic']
    },
    {
      icon: <Api />,
      title: 'REST API Layer',
      color: '#A882DD',
      description: 'Express.js server with CRUD operations.',
      techList: ['Express.js', 'REST API', 'JSON DB']
    },
    {
      icon: <Dashboard />,
      title: 'Dashboard UX',
      color: '#06D6A0',
      description: 'Real-time updates and interactive tables.',
      techList: ['Data Tables', 'Modals', 'Real-time']
    },
    {
      icon: <Bolt />,
      title: 'Performance',
      color: '#EF476F',
      description: 'Optimized rendering and code splitting.',
      techList: ['Code Split', 'Lazy Load', 'Optimized']
    }
  ];

  return (
    <Box sx={{ 
      p: 4,  
      bgcolor: '#6db37e',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      <Header />
      
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4, width: '100%', maxWidth: '1200px' }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 'bold', 
          color: 'white', 
          fontSize: { xs: '2.5rem', md: '3.5rem' } 
        }}>
          Technical Dashboard 🚀
        </Typography>
      </Box>

      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Typography variant="h5" sx={{
          textAlign: 'center',
          mb: 3,
          color: 'white',
          fontWeight: 700,
          fontSize: '1.3rem'
        }}>
          🏆 ROZETKA ADMIN DASHBOARD (TECHNOLOGY STACK)
        </Typography>
        
        <Grid container spacing={2} justifyContent="center">
          {techFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
              <TechFeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{
          mt: 5,
          p: 4,
          borderRadius: 2,
          background: 'white',
          boxShadow: '0 4px 20px rgba(109, 179, 126, 0.15)',
          border: '1px solid rgba(109, 179, 126, 0.2)'
        }}>
          <Typography variant="h5" sx={{
            mb: 4,
            fontWeight: 700,
            color: '#2E7D32',
            fontSize: '1.3rem',
            textAlign: 'center'
          }}>
            🏗️ ARCHITECTURE HIGHLIGHTS
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRight: { md: '1px solid #eee' },
                borderBottom: { xs: '1px solid #eee', md: 'none' },
                pb: { xs: 3, md: 0 }
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: '#6db37e',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <CheckCircle /> Beyond Requirements
                </Typography>
                <Box sx={{ textAlign: 'left', display: 'inline-block' }}>
                  {[
                    'Enhanced Preview Modal',
                    'Optimistic UI Updates', 
                    'Comprehensive Error Handling',
                    'Professional Loading States',
                    'Responsive Design'
                  ].map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ 
                      color: 'text.secondary',
                      mb: 1.5,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <Box component="span" sx={{ 
                        color: '#6db37e', 
                        mr: 1.5, 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        lineHeight: 0.8
                      }}>•</Box>
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: '#6db37e',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <Bolt /> Technical Mastery
                </Typography>
                <Box sx={{ textAlign: 'left', display: 'inline-block' }}>
                  {[
                    'Redux-Saga Middleware',
                    'JWT Authentication',
                    'Axios Interceptors',
                    'MUI Theme Customization',
                    'React-Final-Form'
                  ].map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ 
                      color: 'text.secondary',
                      mb: 1.5,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <Box component="span" sx={{ 
                        color: '#6db37e', 
                        mr: 1.5, 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        lineHeight: 0.8
                      }}>•</Box>
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedAbout;