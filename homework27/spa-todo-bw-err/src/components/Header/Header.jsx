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
        <Link href='/contacts'>Contacts</Link>
      </li>
      <li>
        <Link href='/about'>About</Link>
      </li>
    </ul>
    <ChangeButtonColor />
  </header>
);

export default Header;