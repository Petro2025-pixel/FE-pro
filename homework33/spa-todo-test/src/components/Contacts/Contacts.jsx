import { useContext } from 'react';
import Link from '../Link/Link';
import { ThemeContext } from '../../themeContext'; 

const Contacts = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ color: theme.color }}>
      <h1>Contacts content</h1>
      <div className="w-75 mx-auto">
        <Link href='https://www.linkedin.com/in/petro-lungu-308477384'>https://www.linkedin.com/in/petro-lungu-308477384</Link>
      </div>
    </div>
  );
}

export default Contacts;