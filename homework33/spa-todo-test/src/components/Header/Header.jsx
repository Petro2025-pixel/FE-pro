import Switch from "../Switch/Switch";
import Link from '../Link/Link';
import Logo from '../../assets/todo-list.svg';

const Header = () => (
  <header className='header'>
    <div className='header__content-wrapper'>
      
      {/* Используем класс header__brand для группировки лого и текста.
          Добавляем inline-стили для быстрого выравнивания:
          display: flex — ставит элементы в ряд
          alignItems: center — центрирует их по вертикали
          gap: 10px — делает отступ между картинкой и текстом
      */}
      <div className="header__brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={Logo} className="logo" alt="logo" style={{ margin: 0 }} />
        <h3 className="header__title" style={{ margin: 0, whiteSpace: 'nowrap' }}>
          TODO List
        </h3>
      </div>
      
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