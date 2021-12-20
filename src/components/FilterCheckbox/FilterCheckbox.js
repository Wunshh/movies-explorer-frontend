import './FilterCheckbox.css'

function  FilterCheckbox({ onHandleSwitchCheckbox, onShortMovies }) {
    return (
        <div className="form__checkbox">
            <input 
                checked={onShortMovies}
                onClick={onHandleSwitchCheckbox}
                className="form__fake-checkbox" 
                type="checkbox" 
            />
        </div>
    );
}

export default FilterCheckbox;