import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../themeContext'; 

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [navigate]);

  return (
    <div style={{ 
      color: theme.color, 
      backgroundColor: theme.background, 
      minHeight: '80vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}> 
      <h1>404 | Page is not found</h1>
      <p>You will be redirected to the main page in <strong>{seconds}</strong> seconds.</p>
    </div>
  );
}

export default NotFound;