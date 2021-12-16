import './SearchForm.css';
import searchInput from '../../images/searchInput.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search-form">

            <form className="form__movie">
                <img className="form__image" alt="иконка поиска" src={searchInput}/>
                <input 
                    className="form__input_type_saerch" 
                    type="text"
                    name="movie"
                    placeholder="Фильм"
                    required
                />
                <button type="submit" className="form__button_type_search"/>
            </form>

            <div className="form__shortfilm">
                <FilterCheckbox />
                <p className="form__subtitle">Короткометражки</p>
            </div>
        </section>

    );
}

export default SearchForm;