import  { useState, useCallback } from 'react';

function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValide] = useState(false);

    const handleChange = (evt) => {
        const input = evt.target;
        const value = input.value;
        const name = input.name;
        
        setValues(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: input.validationMessage }));
        setIsValide(input.closest('form').checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValide(newIsValid);
        },
        [setValues, setErrors, setIsValide]
    )

    return {values, handleChange, resetForm, errors, isValid}
}


export default useFormValidation;