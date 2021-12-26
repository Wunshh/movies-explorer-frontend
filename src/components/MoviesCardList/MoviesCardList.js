import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route } from 'react-router-dom';
import useWindowWidth from '../../utils/hooks/useWindowWidth';
import {
    mobaileWidth,
    tabletWidth,
    desctopWidth,
    cardsForMobaileWidth,
    cardsForTabletWidth,
    cardsForDesctopWidth,
    moreCardsForMobaileAndTabletWidth,
    moreCardsForDesctopWidth,
} from '../../utils/utils';

function MoviesCardList({ 
    moviesCards, 
    onSaveMovie, 
    onMovieDelite, 
    onSavedMoviesUpdate, 
    moviesError }) {

    const windowWidth = useWindowWidth();

    const [initialMoviesCards, setInitialMoviesCards] = useState(0);
    const [addMoviesCards, setAddMoviesCards] = useState(0);

    function handleAddMoviesCards() {
        setInitialMoviesCards(initialMoviesCards + addMoviesCards);
    }

    useEffect(() => {
        if (windowWidth <= mobaileWidth) {
            setInitialMoviesCards(cardsForMobaileWidth);
            setAddMoviesCards(moreCardsForMobaileAndTabletWidth);
        }
        if (windowWidth >= tabletWidth &&  windowWidth < desctopWidth) {
            setInitialMoviesCards(cardsForTabletWidth);
            setAddMoviesCards(moreCardsForMobaileAndTabletWidth);
        }
        if (windowWidth >= desctopWidth) {
            setInitialMoviesCards(cardsForDesctopWidth);
            setAddMoviesCards(moreCardsForDesctopWidth);
        }
    }, [windowWidth]);


    return (
        <section className="movies__cards">
            <Route exact path="/movies">
                <div className="movie__card">
                {moviesError.text && <p className={`movie__card-not-found ${moviesError && "movie__card-not-found_active"}`}>{moviesError.text}</p>}
                    {moviesCards.slice(0, initialMoviesCards).map((movieCard) => {
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
                {moviesCards.length > 0 && <button type="button" className="movies__add-botton" onClick={handleAddMoviesCards}>Ещё</button>}
            </Route>
            <Route exact path="/saved-movies">
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
            </Route>
        </section>
    );
}

export default MoviesCardList;