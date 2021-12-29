import { useEffect, useState } from 'react';
import './SearchForm.css';
import useFormValidation from '../../utils/hooks/useFormValidation';
import searchInput from '../../images/searchInput.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({ onFilter, onShortMovies, onHandleSwitchCheckbox }) {

    const {values, handleChange, isValid} = useFormValidation();
    const [error, setError] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!values.movieName) {
            setError('Введите ключевое слово');
            setTimeout(() => {
                setError('');
            }, 2000);
        } else {
            onFilter({ movieName: values.movieName });
        }
    }
    return (
        <section className="search-form">

            <form className="form__movie" onSubmit={handleSubmit}>
                <img className="form__image" alt="иконка поиска" src={searchInput}/>
                <input 
                    className="form__input_type_saerch" 
                    type="text"
                    name="movieName"
                    value={values.movieName || ''}
                    placeholder="Фильм"
                    onChange={handleChange}
                    
                />
                {error && <span className="form__search-error_visible">{error}</span>}
                <button type="submit" className={`form__button_type_search ${!isValid && "form__button_type_search_disabled"}`}/>
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