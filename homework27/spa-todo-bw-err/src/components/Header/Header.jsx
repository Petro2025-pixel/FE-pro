import ChangeButtonColor from '../ChangeButtonColor/ChangeButtonColor';
import Link from '../Link/Link';
import Logo from '../../assets/react.svg';

const Header = () => (
  <header className='header'>
    <img src={Logo} className="logo" alt="logo" />
    <ul className='header__logo'>
      <li>
        <Link href='/'>Main</Link>
      </li>
      <li>
        <Link href='/todos'>Todo list</Link>
      </li>
      <li>
        <Link href='/contacts'>Contacts</Link>
      </li>
    </ul>
    <ChangeButtonColor />
  </header>
);

export default Header;