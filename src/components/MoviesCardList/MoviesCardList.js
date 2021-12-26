import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route } from 'react-router-dom';


function MoviesCardList({ 
    moviesCards, 
    onSaveMovie, 
    onMovieDelite, 
    onSavedMoviesUpdate, 
    moviesError }) {

    return (
        <section className="movies__cards">
                <div className="movie__card">
                {moviesError.text && <p className={`movie__card-not-found ${moviesError && "movie__card-not-found_active"}`}>{moviesError.text}</p>}
                    {moviesCards.map((movieCard) => {
                        return (
                            <MoviesCard 
                                movieCard={movieCard}
                                key={movieCard.id || movieCard._id}
                                onSaveMovie={onSaveMovie}
                                onMovieDelite={onMovieDelite}
                                onSavedMoviesUpdate={onSavedMoviesUpdate}
                            /> 
                        );
                    })}
                </div>
            <Route exact path="/movies">
                {moviesCards.length > 0 && <button type="button" className="movies__add-botton">Ещё</button>}
            </Route>
        </section>
    );
}

export default MoviesCardList;