import { NavLink } from 'react-router-dom';
import './Navigation.css';
import profileIcon from '../../images/profile.svg';
import closeButton from '../../images/close-menu.svg'
import opneMenuBotton from '../../images/open-menu.svg';


function Navigation({ isOpen, onClose, onMenuClick }) {

    return (
        <div className={`navigation ${isOpen ? "burger-menu_background" : ""}`}>
            <button 
                className="burger-menu__button" 
                onClick={isOpen ? onClose : onMenuClick} 
                style={isOpen ? {backgroundImage: `url(${closeButton})`} : { backgroundImage: `url(${opneMenuBotton})`} } 
            />
            <nav className={`burger-menu ${isOpen ? "burger-menu_open" : ""}`}>
                <div className="burger-menu__container">
                    <NavLink  
                        className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link" )}
                        to="/"
                    >Главная</NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link" )} 
                        to="/movies"
                    >Фильмы</NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link" )} 
                        to="/saved-movies"
                    >Сохранённые фильмы</NavLink>
                </div>
                <div className="burger-menu__container">
                    <NavLink className="burger-menu__link burger-menu__link_type_profile" to="/profile">
                        <img className="burger-menu__link-icon" src={profileIcon} alt="иконка профиля"/>
                        Аккаун
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;