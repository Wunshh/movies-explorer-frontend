import { useState } from 'react';
import './Header.css';
import headerLogo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/profile.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleMenuClick() {
        setIsMenuOpen(true);
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    return (
        //для смены header в App.js заменить на const [loggedIn] = useState(false);
        <header className='header'>
            {loggedIn ? 
                <div className="header__main header__main_page_movies">
                    <div className='header__logo-container'>
                        <img className="header__logo" src={headerLogo} alt='Логотип' />
                    </div>
                    <div className="header__nav">
                        <NavLink 
                            className={({ isActive }) => (isActive ? "header__link_active header__link_type_movies" : "header__link header__link_type_movies" )}
                            to="/movies"
                        >Фильмы</NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? "header__link_active header__link_type_saved" : "header__link header__link_type_saved" )}
                            to="/saved-movies"
                        >Сохранённые фильмы</NavLink>
                        <NavLink 
                            className={({ isActive }) => (isActive ? "header__link_active header__link_type_profile" : "header__link header__link_type_profile" )}
                            to="/profile"
                        >
                            <img className="header__link-icon" src={profileIcon} alt="иконка профиля"/>
                            Аккаун
                        </NavLink>
                    </div>
                    <Navigation                     
                        isOpen={isMenuOpen} 
                        onMenuClick={handleMenuClick}
                        onClose={closeMenu} 
                    />
                </div>
                :
                <div className="header__main">
                    <div className='header__logo-container'>
                        <img className="header__logo" src={headerLogo} alt='Логотип' />
                    </div>
                    <div className='header__container'>
                        <NavLink to="/signup" className="header__link header__link_type_signup">Регистрация</NavLink>
                        <NavLink to="/signin" className="header__link header__link_type_signin">Войти</NavLink>
                    </div>
                </div> 
            }
        </header>
    )
}

export default Header;