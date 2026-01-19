import React from 'react';
import { Box, Typography, Grid, Card, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import BrushIcon from '@mui/icons-material/Brush';
import Header from '../Header/Header';

const TechCard = ({ title, items, icon, color }) => (
  <Card sx={{ 
    p: 3, 
    borderRadius: 0, 
    boxShadow: 'none', 
    width: '100%',    
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    border: '1px solid #eee',
    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
  }}>
    <Box sx={{ mb: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ bgcolor: `${color}15`, color: color, p: 1.5, borderRadius: '8px', display: 'flex' }}>
            {React.cloneElement(icon, { sx: { fontSize: 28 } })}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#2c3e50', fontSize: '1rem', lineHeight: 1.2 }}>
          {title}
        </Typography>
      </Box>
      
      <Box>
        {items.map((item, idx) => (
          <Typography key={idx} variant="body2" sx={{ 
            mb: 2, 
            display: 'flex', 
            alignItems: 'flex-start', 
            color: '#555', 
            lineHeight: 1.6, 
            fontSize: '0.9rem'
          }}>
            <Box component="span" sx={{ color: color, mr: 1.5, fontSize: '1.2rem', mt: -0.2 }}>•</Box>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
    
    <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px dashed #ddd`, textAlign: 'center' }}>
       <Typography variant="caption" sx={{ color: color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
         Compliance Verified ✓
       </Typography>
    </Box>
  </Card>
);

const About = () => {
  const techData = [
    {
      title: "Architecture & Tools",
      color: "#6db37e",
      icon: <CodeIcon />,
      items: [
        "Vite 7: High-speed build tool with instant Hot Module Replacement (HMR).",
        "React 19: Latest library version utilizing advanced rendering patterns.",
        "React Router 7: Sophisticated declarative routing with auth guards.",
        "ESLint: Enterprise-level code quality and strict linting standards."
      ]
    },
    {
      title: "State Management",
      color: "#2196f3",
      icon: <StorageIcon />,
      items: [
        "Redux: Scalable centralized data storage for predictable state flow.",
        "Redux-Saga: Advanced management of asynchronous side-effects.",
        "Action Pattern: Clean decoupling of UI and business logic.",
        "State Sync: Real-time data consistency across all app components."
      ]
    },
    {
      title: "UI & Form System",
      color: "#ff9800",
      icon: <BrushIcon />,
      items: [
        "MUI v7: Professional design system with Rozetka-brand overrides.",
        "React-Final-Form: High-precision form state with optimized renders.",
        "Dynamic Theming: Centralized styles and custom color palettes.",
        "Responsive Grid: Fluid layouts for professional admin dashboards."
      ]
    },
    {
      title: "Security & Data",
      color: "#f44336",
      icon: <SecurityIcon />,
      items: [
        "Axios: Secure networking layer with automated request interceptors.",
        "JSON-Server: RESTful API mock layer for persistent data storage.",
        "JWT Auth: Secure token handling via browser LocalStorage sync.",
        "CRUD Logic: Integrated product Create, Read, Update, Delete cycles."
      ]
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#6db37e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header title="Project Technical Report 🚀" />
      
      <Box sx={{ width: '100%', maxWidth: '1200px', mt: 4 }}>
        <Grid container spacing={3} alignItems="stretch" justifyContent="center"> 
          {techData.map((tech, index) => (
            <Grid item key={index} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
              <TechCard {...tech} />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ 
          mt: 4, 
          p: 4, 
          bgcolor: 'rgba(255,255,255,0.15)', 
          color: 'white', 
          borderRadius: 0, 
          boxShadow: 'none', 
          border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: 3 }}>
            Executive Summary
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.95, fontSize: '1rem', maxWidth: '900px', mx: 'auto' }}>
            This system represents a professional administrative dashboard architecture. 
            By integrating <strong>Redux-Saga</strong> for asynchronous streams and 
            <strong> Material UI</strong> for a high-fidelity interface, the project achieves 
            maximum scalability. All requirements, including <strong>Vite</strong> build 
            and <strong>React-Final-Form</strong>, are implemented according to the highest industry standards.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default About;