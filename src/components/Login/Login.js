import { useEffect } from 'react';
import useFormValidation from '../../utils/hooks/useFormValidation';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';
import headerLogo from '../../images/logo.svg';

function Login({ onLogin, message }) {
    
    const {values, handleChange, resetForm, errors, isValid} = useFormValidation();
    const history = useHistory();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        onLogin({ 
            password: values.password, 
            email: values.email
        })
        .then(resetForm)
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
          history.push('/movies');
        }
    }, [history]);

    return (
        <section className="login">
            <div className="login__header">
                <Link to="/" className="login__header-link">
                    <img className="login__logo" alt="логотип" src={headerLogo}/>
                </Link>
                <h1 className="login__title">Рады видеть!</h1>
            </div>
            <div className="login__form">
                <form className="form form__user" onSubmit={handleSubmit}>
                    <div className="form__inputs">
                        <label className="form__label" htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            className="form__input form__input-email" 
                            type="email" 
                            name="email" 
                            value={values.email || ''} 
                            onChange={handleChange}  
                            required
                        />
                        <span className={`form__error ${errors.email && "form__error_visible"}`}>
                            {errors.email || ''}
                        </span>
                        <label className="form__label" htmlFor="password">Пароль</label>
                        <input 
                            id="password"
                            className="form__input form__input-password"
                            type="password"
                            name="password"
                            value={values.password || ''} 
                            onChange={handleChange} 
                            required
                        />
                        <span className={`form__error ${errors.password && "form__error_visible"}`}>
                            {errors.password || ''}
                        </span>
                    </div>
                    <span className={`form__server-error ${message && "form__server-error_visible"}`}>{message}</span>
                    <button type="submit" className={`form__button ${!isValid && "form__button_disabled"}`}>Войти</button>
                </form>
                <p className="login__subtitle">Ещё не зарегистрированы?
                    <Link className="login__link" to={"/signup"}> Регистрация</Link> 
                </p>
            </div>
        </section>
    );
}

export default Login;