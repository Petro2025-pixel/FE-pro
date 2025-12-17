import { useDispatch } from 'react-redux';
import { clearSwapis } from '../../store/rootReducer';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className='footer p-3 text-start'>
        <button 
          className="btn btn-warning" 
          onClick={() => dispatch(clearSwapis())}>
          Clear Results
        </button>
    </footer>
  );
};

export default Footer;