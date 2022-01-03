import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({ 
    loggedIn, 
    isSerch, 
    onFilter, 
    onShortMovies, 
    onHandleSwitchCheckbox, 
    moviesCards, 
    onSaveMovie, 
    onMovieDelite,
    onSavedMoviesUpdate,
    moviesError,
    onKeyWord }) {

    return (
        <section className="movies">
            <Header loggedIn={loggedIn}/>
            <SearchForm 
                onFilter={onFilter} 
                onShortMovies={onShortMovies}
                onHandleSwitchCheckbox={onHandleSwitchCheckbox}
                onKeyWord={onKeyWord}
            />
            {isSerch ? 
                <Preloader isSerch={isSerch} />
                :
                <MoviesCardList 
                    moviesCards={moviesCards} 
                    onSaveMovie={onSaveMovie}
                    onMovieDelite={onMovieDelite}
                    onSavedMoviesUpdate={onSavedMoviesUpdate}
                    moviesError={moviesError}
                />
            }
            <Footer />
        </section>
    );
}

export default Movies;