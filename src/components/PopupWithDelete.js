import {Popup} from './Popup.js';

export class PopupWithDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._buttonDelete = this._popupSelector.querySelector('.popup__save-button_delete');
    }

    setSubmit(callback) {
        this._submit = callback;
    }

    setEventListeners(closeButtonSelector) {
        super.setEventListeners(closeButtonSelector);
        this._popupForm.addEventListener('submit', (evt) => {   //ОБРАБОТКА САБМИТА
            evt.preventDefault();
            this._submit();
        });
    }
}