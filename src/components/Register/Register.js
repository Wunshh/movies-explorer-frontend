import { useEffect } from 'react';
import useFormValidation from '../../utils/hooks/useFormValidation';
import { Link, useHistory } from "react-router-dom";
import './Register.css';
import headerLogo from '../../images/logo.svg';

function Register({ onRegister, message }) {

    const {values, handleChange, resetForm, errors, isValid} = useFormValidation();
    const history = useHistory();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        onRegister({ 
            password: values.password, 
            email: values.email, 
            name: values.name 
        })
          .then(resetForm)
          .catch((err) => {
              console.log(err)
          });
    };

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
          history.push('/movies');
        }
    }, [history]);

    return (
        <section className="register">
            <div className="register__header">
                <Link to="/" className="register__header-link">
                    <img className="register__logo" alt="логотип" src={headerLogo}/>
                </Link>
                <h1 className="register__title">Добро пожаловать!</h1>
            </div>
            <div className="register__form">
                <form className="form form__user" onSubmit={handleSubmit}>
                    <div className="form__inputs">
                        <label className="form__label" htmlFor="name">Имя</label>
                        <input 
                            minLength="2"
                            maxLength="30"
                            id="name"
                            className="form__input form__input-name"
                            type="text"
                            name="name"
                            required
                            value={values.name || ''}
                            onChange={handleChange}
                        />
                        <span className={`form__error ${errors.name && "form__error_visible"}`}>
                            {errors.name || ''}
                        </span>
                        <label className="form__label" htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            className="form__input form__input-email" 
                            type="email" 
                            name="email"    
                            required
                            value={values.email || ''}
                            onChange={handleChange}
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
                            required
                            value={values.password || ''}
                            onChange={handleChange}
                        />
                        <span className={`form__error ${errors.password && "form__error_visible"}`}>
                            {errors.password || ''}
                        </span>
                    </div>
                    <span className={`form__server-error ${message && "form__server-error_visible"}`}>{message}</span>
                    <button type="submit" className={`form__button ${!isValid && "form__button_disabled"}`}>Зарегистрироваться</button>
                </form>
                <p className="register__subtitle">Уже зарегистрированы? 
                    <Link className="register__link" to={"/signin"}> Войти</Link> 
                </p>
            </div>
        </section>
    );
}

export default Register;