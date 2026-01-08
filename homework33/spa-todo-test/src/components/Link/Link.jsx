import { useContext } from 'react';
import { ThemeContext } from '../../themeContext';
import { NavLink } from 'react-router-dom';

const Link = ({ children, href }) => {
  const { theme } = useContext(ThemeContext);
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

  if (isExternal) {
    return (
      <a 
        href={href} 
        style={{ color: theme.color }} 
        target="_blank"
        rel="noopener noreferrer" 
      >
        {children}
      </a>
    );
  }
  return (
    <NavLink to={href} style={{ color: theme.color }}>
      {children}
    </NavLink>
  );
};

export default Link;