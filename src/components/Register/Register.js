import React, { useState, useEffect  } from "react";
import { Link, useHistory } from "react-router-dom";
import './Register.css';
import headerLogo from '../../images/logo.svg';

function Register({ onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const history = useHistory();
 
    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("")
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        onRegister({ password, email, name })
          .then(resetForm)
          .catch((err) => {
              console.log(err)
          });
    };

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
          history.push('/');
        }
    }, [history]);

    function handlePasswordAdd(evt) {
        setPassword(evt.target.value);
    }

    function handleEmailAdd(evt) {
        setEmail(evt.target.value);
    }

    function handleNameAdd(evt) {
        setName(evt.target.value);
    }

    return (
        <section className="register">
            <div className="register__header">
                <img className="register__logo" alt="логотип" src={headerLogo}/>
                <h1 className="register__title">Добро пожаловать!</h1>
            </div>
            <div className="register__form">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__inputs">
                        <label className="form__label" for="name">Имя</label>
                        <input 
                            id="name"
                            className="form__input form__input-name"
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={handleNameAdd}
                        />
                        <span className="form__error"> sdgsdg</span>
                        <label className="form__label" for="email">E-mail</label>
                        <input 
                            id="email"
                            className="form__input form__input-email" 
                            type="email" 
                            name="email"    
                            required
                            value={email}
                            onChange={handleEmailAdd}
                        />
                        <span className="form__error"></span>
                        <label className="form__label" for="password">Пароль</label>
                        <input 
                            id="password"
                            className="form__input form__input-password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={handlePasswordAdd}
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