import './Register.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="register">
            <div className="register__header">
                <img className="register__logo" alt="логотип" src={headerLogo}/>
                <h1 className="register__title">Добро пожаловать!</h1>
            </div>
            <div className="register__form">
                <form className="form">
                    <div className="form__inputs">
                        <label className="form__label" for="name">Имя</label>
                        <input 
                            id="name"
                            className="form__input form__input-name"
                            type="text"
                            name="name"
                            required
                        />
                        <span className="form__error"> sdgsdg</span>
                        <label className="form__label" for="email">E-mail</label>
                        <input 
                            id="email"
                            className="form__input form__input-email" 
                            type="email" 
                            name="email"    
                            required
                        />
                        <span className="form__error"></span>
                        <label className="form__label" for="password">Пароль</label>
                        <input 
                            id="password"
                            className="form__input form__input-password"
                            type="password"
                            name="password"
                            required
                        />
                        <span className="form__error"></span>
                    </div>
                    <button className="form__button">Зарегистрироваться</button>
                </form>
                <p className="register__subtitle">Уже зарегистрированы? 
                    <Link className="register__link" to={"/signin"}> Войти</Link> 
                </p>
            </div>
        </section>
    );
}

export default Register;