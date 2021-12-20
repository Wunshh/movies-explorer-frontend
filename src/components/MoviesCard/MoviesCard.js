import { 
    useState, 
    // useContext 
} from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const BASE_URL = "https://api.nomoreparties.co";

function MoviesCard({movieCard}) {

    // const currentUser = useContext(CurrentUserContext);

    const [isLike] = useState(false);
    // const [isSaved] = useState(false);

    // function handleAddLike() {
    //     setLike(true);
    // }

    // const isLiked = movieCard.likes.some((item) => {
    //     return item === currentUser._id
    // });

    // const cardLikeButtonClassName = (
    //     isLiked ? setLike(true) : setLike(false)
    // );

    return (
            <div className="card">
                <div className="card__info">
                    <h3 className="card__name">{movieCard.nameRU}</h3>
                    <p className="card__duration">{movieCard.duration} минут</p>
                </div>
                <a className="card__link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                    <img className="card__image" alt={movieCard.nameRU} src={`${BASE_URL}${movieCard.image.url}`}/>
                </a>
                <Route exact path="/movies">
                    {isLike ? 
                        <button className="card__like-button_active" />
                        : 
                        <button className="card__like-button">Cохранить</button>
                    }
                </Route>

                <Route exact path="/saved-movies">
                    <button className="card__delete-button" />
                </Route>
            </div>
    );
}

export default MoviesCard;