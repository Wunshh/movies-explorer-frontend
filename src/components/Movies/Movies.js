import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({ loggedIn }) {
    // при добавлении функциональности добавить setPreloaderOpen
    const [ isPreloaderOpen ] = useState(false);

    return (
        <div className="movies">
            <Header loggedIn={loggedIn}/>
            <SearchForm />
            <Preloader isOpen={isPreloaderOpen} />
            <MoviesCardList />
            <Footer />
        </div>
    );
}

export default Movies;