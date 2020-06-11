function makeArrayOfForms(settingsObj) {  //функция делает массив из всех форм на странице
    return Array.from(document.querySelectorAll(settingsObj.formSelector));
}

function enableValidation(settingsObj) {
    const formElements = makeArrayOfForms(settingsObj); //массив с формами
    formElements.forEach(formElement => {
        const inputElements = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
        const submitButton = formElement.querySelector('.popup__save-button');
        inputElements.forEach(input => {
            input.addEventListener('input', e => handelInput(e, settingsObj.inputErrorClass));
        })
        formElement.addEventListener('input', () => handleFormInput(formElement, submitButton));
        formElement.addEventListener('submit', (evt) => preventDefault(evt));
    })
}

function handleFormInput(formElement, submitButton){
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
}

function handelInput(evt, errClass) {
    const input = evt.target;
    const error = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
        input.classList.remove(errClass);
        error.textContent = '';
    } else {
        input.classList.add(errClass);
        error.textContent = input.validationMessage;
    }
}

function preventDefault(evt) {
    evt.preventDefault();
}

function resetError(form) {
    const errorSpan = Array.from(form.querySelectorAll('.error'));
    const inputElements = Array.from(form.querySelectorAll('.popup__form-input'));
    errorSpan.forEach(everySpan => {
        everySpan.textContent = '';
    })
    inputElements.forEach(everyInput => {
        everyInput.classList.remove('popup__form-input_type_error');
    })
}