import {openPopup, escapeListener} from './utils.js';

const imagePopup = document.querySelector('.popup_type_image');

export class Card {
    constructor(cardName, cardUrl, cardSelector) {  // Принимает название карточки, ее url и селектор шаблона
        this._cardName = cardName;
        this._cardUrl = cardUrl;
        this._cardSelector = cardSelector;
    }

    _getTemplateCard() { // метод возвращает клонированный шаблон карточки
        const cardTemplate = document.querySelector(`.${this._cardSelector}`).content;
        const cardElement = cardTemplate.querySelector('.element');
        this._card = cardElement.cloneNode(true);
        this._photo = this._card.querySelector('.element__photo');
        this._capture = this._card.querySelector('.element__capture');
        return cardElement;
    }

    makeCard() { //метод создает карточку
        this._getTemplateCard();
        this._capture.textContent = this._cardName;
        this._photo.src = this._cardUrl;
        this._photo.setAttribute('data-description', this._cardName);

        this._setEventListeners();

        return this._card;
    }

    _setEventListeners() { //метод вешает слушатели на созданную карточку
        this._card.querySelector('.element__like').addEventListener('click', () => {
            this._likeCards();
        });
        this._card.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCards();
        });
        this._card.querySelector('.element__photo').addEventListener('click', () => {
            this._openPopupImage();
        });
    }

    _likeCards() { //метод лайка карточек
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _deleteCards() { //метод удаления карточек
        this._card.remove();
        this._card = null;
    }

    _openPopupImage() { //метод зума картинок
        openPopup(imagePopup);
        document.addEventListener('keydown', escapeListener);
        document.querySelector('.popup__image').src = this._card.querySelector('.element__photo').src;
        document.querySelector('.popup__capture').textContent = this._card.querySelector('.element__photo').getAttribute('data-description');
    }
}