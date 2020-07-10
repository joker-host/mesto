import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        
    }

    open(link, name) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = 'Упс! Кажется вы вставили нерабочую ссылку на изображение :(';
        this._popupSelector.querySelector('.popup__capture').textContent = name;
    }
}