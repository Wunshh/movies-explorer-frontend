import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({ loggedIn, isOpen }) {

    return (
        <div className="movies">
            <Header loggedIn={loggedIn}/>
            <SearchForm />
            <Preloader isOpen={isOpen} />
            <MoviesCardList />
            <Footer />
        </div>
    );
}

export default Movies;