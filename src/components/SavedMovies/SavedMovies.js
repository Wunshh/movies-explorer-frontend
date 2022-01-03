import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ 
    loggedIn, 
    onFilter, 
    onShortMovies, 
    onHandleSwitchCheckbox, 
    moviesCards, 
    onMovieDelite,
    moviesError
}) {
    return (
        <section className="saved-movies">
            <Header loggedIn={loggedIn} />

            <SearchForm 
                onFilter={onFilter} 
                onHandleSwitchCheckbox={onHandleSwitchCheckbox}
                onShortMovies={onShortMovies}
            />
            <div className="saved-movies__cards">
                <MoviesCardList 
                    moviesCards={moviesCards} 
                    onMovieDelite={onMovieDelite}
                    moviesError={moviesError}
                />
            </div>
            <Footer />
        </section>
    );
}

export default SavedMovies;