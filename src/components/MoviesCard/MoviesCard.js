import { useState, useCallback, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css';
import { MOVIES_URL } from '../../utils/utils';


function MoviesCard({ movieCard, onSaveMovie, onMovieDelite, onSavedMoviesUpdate }) {

    const [isLike, setIsLike ] = useState(false);

    const addLike = useCallback(() => {
        if (onSavedMoviesUpdate) {
            if (onSavedMoviesUpdate.find((item) => item.movieId === movieCard.id)) {
                setIsLike(true);
            } else {
                setIsLike(false);
            }
        }
    }, [movieCard.id, onSavedMoviesUpdate]);
    
    useEffect(() => {
        addLike();
    }, [addLike]);


    function handelSave(evt) {
        evt.preventDefault();
        onSaveMovie(movieCard);
    }

    function handleDelete() {
        onMovieDelite(movieCard);
    }

    const movieCardImage = (movieCard.image.url ? `${MOVIES_URL}${movieCard.image.url}` : movieCard.image);

    return (
        <div className="card">
            <div className="card__info">
                <h3 className="card__name">{movieCard.nameRU}</h3>
                <p className="card__duration">{movieCard.duration} минут</p>
            </div>
            <a className="card__link" href={movieCard.trailerLink || movieCard.trailer} target="_blank" rel="noreferrer">
                <img className="card__image" alt={movieCard.nameRU} src={movieCardImage}/>
            </a>
            <Route exact path="/movies">
                {isLike ? 
                    <button type="submit" className="card__like-button_active" onClick={handleDelete}/>
                    : 
                    <button type="submit" className="card__like-button" onClick={handelSave}>Cохранить</button>
                }
            </Route>

            <Route exact path="/saved-movies">
                <button type="submit" className="card__delete-button" onClick={handleDelete}/>
            </Route>
        </div>
    );
}

export default MoviesCard;