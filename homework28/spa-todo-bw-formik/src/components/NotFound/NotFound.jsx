import { useContext } from 'react';
import { ThemeContext } from '../../themeContext'; 

const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  return (
      <div style={{ 
      color: theme.color, 
      background: theme.background, 
      minHeight: '80vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}> 
      <h1>404 | Page is not found</h1>
    </div>
  );
}

export default NotFound;