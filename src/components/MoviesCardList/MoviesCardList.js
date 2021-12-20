import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCards }) {
    return (
        <section className="movies__cards">
            <div className="movie__card">
                {moviesCards.map((movieCard) => {
                    return (
                        <MoviesCard 
                            movieCard={movieCard}
                            key={movieCard.id}
                        /> 
                    );
                })}
            </div>
            <button type="button" className="movies__add-botton">Ещё</button>
        </section>
    );
}

export default MoviesCardList;