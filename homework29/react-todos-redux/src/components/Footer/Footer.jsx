import { useSelector } from 'react-redux'; 
const Footer = () => {
  const todos = useSelector((state) => state.todos);
  const theme = { color: 'black' }; 

  return (
    <footer className='footer'>
        <h3 style={{ color: theme.color }}>Total tasks: {todos.length}</h3> 
    </footer>
  );
};

export default Footer;