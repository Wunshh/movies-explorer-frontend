import {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';
import headerLogo from '../../images/logo.svg';

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const resetForm = () => {
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        onLogin({ password, email })
          .then(resetForm)
          .catch((err) => {
              console.log(err);
          });
    }

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

    return (
        <section className="login">
            <div className="login__header">
                <img className="login__logo" alt="логотип" src={headerLogo}/>
                <h1 className="login__title">Рады видеть!</h1>
            </div>
            <div className="login__form">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__inputs">
                        <label className="form__label" for="email">E-mail</label>
                        <input 
                            id="email"
                            className="form__input form__input-email" 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handleEmailAdd}  
                            required
                        />
                        <span className="form__error"></span>
                        <label className="form__label" for="password">Пароль</label>
                        <input 
                            id="password"
                            className="form__input form__input-password"
                            type="password"
                            name="password"
                            value={password} 
                            onChange={handlePasswordAdd} 
                            required
                        />
                        <span className="form__error"></span>
                    </div>
                    <button className="form__button">Войти</button>
                </form>
                <p className="login__subtitle">Ещё не зарегистрированы?
                    <Link className="login__link" to={"/signup"}> Регистрация</Link> 
                </p>
            </div>
        </section>
    );
}

export default Login;