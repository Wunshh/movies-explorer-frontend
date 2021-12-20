import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({ loggedIn, isOpen, onFilter, onShortMovies, onHandleSwitchCheckbox, moviesCards }) {

    return (
        <div className="movies">
            <Header loggedIn={loggedIn}/>
            <SearchForm 
                onFilter={onFilter} 
                onShortMovies={onShortMovies}
                onHandleSwitchCheckbox={onHandleSwitchCheckbox}
            />
            <Preloader isOpen={isOpen} />
            <MoviesCardList moviesCards={moviesCards}/>
            <Footer />
        </div>
    );
}

export default Movies;