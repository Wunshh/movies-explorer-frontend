import './Profile.css';
import Header from '../Header/Header';

function Profile({ loggedIn }) {
    return (
        <section className="profile">
            <Header loggedIn={loggedIn}/>
            <h1 className="profile__title">Привет, Виталий!</h1>
            <div className="profile__form">
                <form className="form-info form-user-info">
                    <div className="form__user form__user-name">
                        <p className="form__title">Имя</p>
                        <input 
                            type="text" 
                            className="form__input-user form__input_type_profile" 
                            value="Виталий" 
                            name="name"
                        />
                    </div>
                    <div className="form__user form__user-email">
                        <p className="form__title">E-mail</p>
                        <input 
                            type="email" 
                            className="form__input-user form__input_type_profile" 
                            value="pochta@yandex.ru"
                            name="email" 
                        />
                    </div>
                </form>
                <div className="profile__buttons">
                    <button className="profile__change-button button">Редактировать</button>
                    <button className="profile__exit-button button">Выйти из аккаунта</button>
                </div>
            </div>
        </section>
    ); 
}

export default Profile;
