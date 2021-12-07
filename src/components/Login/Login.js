import './Login.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <section className="login">
            <div className="login__header">
                <img className="login__logo" alt="логотип" src={headerLogo}/>
                <h1 className="login__title">Рады видеть!</h1>
            </div>
            <div className="login__form">
                <form className="form">
                    <div className="form__inputs">
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
                    <button className="form__button">Войти</button>
                </form>
                <p className="login__subtitle">Ещё не зарегистрированы?
                    <Link className="login__link" to={"/signup"}>Регистрация</Link> 
                </p>
            </div>
        </section>
    );
}

export default Login;