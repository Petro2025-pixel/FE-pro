import { createTheme } from '@mui/material/styles';

const rozetkaTheme = createTheme({
  palette: {
    primary: {
      main: '#6db37e', 
    },
  },
  components: {
    
    MuiTextField: {
      defaultProps: {
        variant: 'filled', 
        hiddenLabel: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#dadada',
          borderRadius: 0, 
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            borderRadius: 0,
            '&:before, &:after': {
              display: 'none', 
            },
          },
          '& .MuiInputBase-input': {
            padding: '15px 12px',
            color: '#6db37e', 
          },
        },
      },
    },
   
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, 
          padding: '12px 0',
          fontSize: '1.2rem',
          fontWeight: 900,
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#5da16d',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default rozetkaTheme;