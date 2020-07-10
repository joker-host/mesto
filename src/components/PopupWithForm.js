import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submit){
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll('.popup__form-input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners(closeButtonSelector) {
        super.setEventListeners(closeButtonSelector);
        this._popupForm.addEventListener('submit', (evt) => {   //ОБРАБОТКА САБМИТА
            evt.preventDefault();
            this._submit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset(); //СБРОС
    }
}