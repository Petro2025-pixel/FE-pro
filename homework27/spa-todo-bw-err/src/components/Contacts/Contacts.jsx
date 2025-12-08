import { useContext } from 'react';
import { ThemeContext } from '../../themeContext'; 

const Contacts = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ color: theme.color }}>
      <h1>Contacts content</h1>
      <div className="w-75 mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus asperiores eaque qui inventore quam architecto nesciunt non, aliquam illum voluptates eligendi officiis vel sequi natus placeat, eos minima iste alias?</div>
    </div>
  );
}

export default Contacts;