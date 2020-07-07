import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        this._popupSelector.classList.add('popup_opened');
        this._popupSelector.querySelector('.popup__image').src = link;
        this._popupSelector.querySelector('.popup__capture').textContent = name;
        
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
}