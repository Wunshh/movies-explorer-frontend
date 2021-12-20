import { useState } from 'react';
import './SearchForm.css';
import searchInput from '../../images/searchInput.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({ onFilter, onShortMovies, onHandleSwitchCheckbox }) {

    const [movieName, setMovieName] = useState('');

    const resetForm = () => {
        setMovieName('')
    }

    function handleNameChange(evt) {
        setMovieName(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onFilter(movieName);
        resetForm();
    }
    return (
        <section className="search-form">

            <form className="form__movie">
                <img className="form__image" alt="иконка поиска" src={searchInput}/>
                <input 
                    className="form__input_type_saerch" 
                    type="text"
                    name="movieName"
                    value={movieName || ''}
                    placeholder="Фильм"
                    onChange={handleNameChange} 
                    required
                />
                <button type="submit" className="form__button_type_search" onClick={handleSubmit}/>
            </form>

            <div className="form__shortfilm">
                <FilterCheckbox 
                    onShortMovies={onShortMovies} 
                    onHandleSwitchCheckbox={onHandleSwitchCheckbox}
                />
                <p className="form__subtitle">Короткометражки</p>
            </div>
        </section>

    );
}

export default SearchForm;