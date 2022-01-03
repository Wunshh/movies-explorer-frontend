import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './SearchForm.css';
import useFormValidation from '../../utils/hooks/useFormValidation';
import searchInput from '../../images/searchInput.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({ 
    onFilter, 
    onShortMovies, 
    onHandleSwitchCheckbox, 
    onKeyWord }) {

    const {values, handleChange, isValid, resetForm} = useFormValidation();
    const [error, setError] = useState('');

    useEffect(() => {
        resetForm({ movieName: onKeyWord || ""}, {}, false);
    }, [onKeyWord, resetForm]);

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
                <Route exact path="/movies">
                    <button type="submit" className={`form__button_type_search ${onKeyWord ? "" : (!isValid && "form__button_type_search_disabled")}`}/>
                </Route>
                <Route exact path="/saved-movies">
                    <button type="submit" className={`form__button_type_search ${!isValid && "form__button_type_search_disabled"}`}/>
                </Route>
            </form>

            <div className="form__shortfilm">
                <FilterCheckbox 
                    onShortMovies={onShortMovies} 
                    onHandleSwitchCheckbox={onHandleSwitchCheckbox}
                    formSubmit={handleSubmit}
                />
                <p className="form__subtitle">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;