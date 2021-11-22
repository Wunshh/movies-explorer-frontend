import './Header.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <img className="header__logo" src={headerLogo} alt='Логотип' />
            </div>
            <div className='header__container'>
                <Link to={"/signup"} className="header__link header__link_type_signup">Регистрация</Link>
                <Link to={"/signin"} className="header__link header__link_type_signin">Войти</Link>
            </div>

        </header>
    )
}

export default Header;