import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className="movies__cards">
            <MoviesCard /> 
            <button type="button" className="movies__add-botton">Ещё</button>
        </section>
    );
}

export default MoviesCardList;