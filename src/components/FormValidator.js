export class FormValidator {
    constructor(settingsObj, formName) {
        this._settingsObj = settingsObj;
        this._formName = formName;

        this._inputs = Array.from(this._formName.querySelectorAll(settingsObj.inputSelector)); 
        this._errorSpans = Array.from(this._formName.querySelectorAll(settingsObj.errorSpanClass));
        this._button = this._formName.querySelector(settingsObj.submitButtonSelector);
    }

    enableValidation() { //включает валидацию для формы
        const inputElements = Array.from(this._formName.querySelectorAll(this._settingsObj.inputSelector));
        const submitButton = this._formName.querySelector('.popup__save-button');
        inputElements.forEach(input => {
            input.addEventListener('input', e => this._handelInput(e, this._settingsObj.inputErrorClass));
        })
        this._formName.addEventListener('input', () => this._handleFormInput(this._formName, submitButton));
        this._formName.addEventListener('submit', (evt) => this._preventDefault(evt));
    }

    _handleFormInput() { //активирует или дезактивирует кнопку в зависимости от валидности формы
        const hasErrors = !this._formName.checkValidity();
        this._button.disabled = hasErrors;
    }

    _handelInput(evt, errClass) { //показывает или скрывает ошибки в зависимости от валидности формы
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

    _preventDefault(evt) { // отменяет стандартное поведение формы
        evt.preventDefault();
    }

    resetError() { // сбрасывает ошибки в форме
        this._handleFormInput();
        this._errorSpans.forEach(everySpan => {
            everySpan.textContent = '';
        });
        this._inputs.forEach(everyInput => {
            everyInput.classList.remove('popup__form-input_type_error');
        });
    }
}