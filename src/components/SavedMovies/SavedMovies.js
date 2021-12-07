import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn }) {
    return (
        <section className="saved-movies">
            <Header loggedIn={loggedIn} />
                <SearchForm />
            <div className="saved-movies__cards">
                <MoviesCard />
            </div>
            <Footer />
        </section>
    );
}

export default SavedMovies;