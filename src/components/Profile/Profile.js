import { useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormValidation from '../../utils/hooks/useFormValidation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ loggedIn, onSignOut, onUpdateUser, changeProfileError, changeProfileSuccess }) {

    const {values, handleChange, resetForm, errors, isValid} = useFormValidation();

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        resetForm({ email: currentUser.email, name: currentUser.name }, {}, false);
    }, [currentUser, resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        
        onUpdateUser({
          name: values.name,
          email: values.email,
        });
    }

    return (
        <section className="profile">
            <Header loggedIn={loggedIn}/>
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <div className="profile__form">
                <form className="form form-info form-user__info" onSubmit={handleSubmit} >
                    <div className="form-info__inputs">
                        <div className="form__user form__user-name">
                            <div className="form__user form__user_container">
                                <p className="form__title">Имя</p>
                                <input 
                                    type="text" 
                                    className="form__input-user form__input_type_profile"  
                                    name="name"
                                    required
                                    onChange={handleChange}
                                    value={values.name || ''}
                                /> 
                            </div>
                            <span className={`form-user_error ${errors.name && "form-user_error_visible"}`}>
                                {errors.name || ''}
                            </span>
                        </div>
                        <div className="form__user form__user-email">
                            <div className="form__user form__user_container">
                                <p className="form__title">E-mail</p>
                                <input 
                                    type="email" 
                                    className="form__input-user form__input_type_profile" 
                                    name="email" 
                                    required
                                    onChange={handleChange}
                                    value={values.email || ''}
                                />
                            </div>
                            <span className={`form-user_error ${errors.email && "form-user_error_visible"}`}>
                                {errors.email || ''}
                            </span>
                        </div>
                    </div>
                    <div className="profile__buttons">
                        {changeProfileSuccess && <span className="profile__form-error">Данные успешно изменены!</span>}
                        {changeProfileError && <span className="profile__form-error">Что-то пошло не так! Попробуйте ещё раз.</span>}
                        <button type="submit" className={`profile__change-button button ${!isValid && "profile__change-button_disabled"}`} >Редактировать</button>
                        <button className="profile__exit-button button" onClick={onSignOut}>Выйти из аккаунта</button>
                    </div>
                </form>
            </div>
        </section>
    ); 
}

export default Profile;
