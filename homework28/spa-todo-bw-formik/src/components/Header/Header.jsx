import Switch from "../Switch/Switch";
import Link from '../Link/Link';
import Logo from '../../assets/todo-list.svg';

const Header = () => (
  <header className='header'>
      
    <div className='header__content-wrapper'>
      <img src={Logo} className="logo" alt="logo" />
      <ul className='header__logo'>
        <li>
          <Link href='/'>Main</Link>
        </li>
        <li>
          <Link href='/contacts'>Contacts</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>
      <Switch />

    </div>
  </header>
);

export default Header;