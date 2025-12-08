import ChangeButtonColor from '../ChangeButtonColor/ChangeButtonColor';
import Link from '../Link/Link';

const Footer = () => {
    return (
        <footer className='footer'>
            <h1 className='logo'>Name/Last name</h1>
            <ul>
                <li>
                    Phone number: <Link href='tel:+12433253'>+12433253</Link>
                </li>
                <li>
                    Email( '' )
                    <Link href='mailto:someone@example.com'>someone@example.com</Link>
                </li>
                <li>
                    Git <Link href='https://github.com/'>https://github.com/</Link>
                </li>
            </ul>
            <ChangeButtonColor />
        </footer>
    );
};

export default Footer;