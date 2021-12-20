import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn, onFilter, onShortMovies, onHandleSwitchCheckbox }) {
    return (
        <section className="saved-movies">
            <Header loggedIn={loggedIn} />
                <SearchForm 
                    onFilter={onFilter} 
                    onHandleSwitchCheckbox={onHandleSwitchCheckbox}
                    onShortMovies={onShortMovies}
                />
            <div className="saved-movies__cards">
                <MoviesCard />
            </div>
            <Footer />
        </section>
    );
}

export default SavedMovies;