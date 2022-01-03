import './FilterCheckbox.css'

function  FilterCheckbox({ onHandleSwitchCheckbox, onShortMovies, formSubmit }) {
    return (
        <div className="form__checkbox">
            <input 
                checked={onShortMovies}
                onMouseDown={onHandleSwitchCheckbox}
                className="form__fake-checkbox" 
                type="checkbox" 
                onMouseUp={formSubmit}
            />
        </div>
    );
}

export default FilterCheckbox;