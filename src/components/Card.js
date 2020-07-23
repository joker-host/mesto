export class Card {
    constructor(cardName, cardUrl, likeCounter, cardSelector, {handleCardClick}, {handleCardLike}, {handleLikeButton}, {handleDelete}, myId) {  // Принимает название карточки, ее url, селектор шаблона и функцию handleCardClick
        this._cardName = cardName;
        this._cardUrl = cardUrl;
        this._likeCounter = likeCounter;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardClick = this._handleCardClick.bind(this);
        this._handleCardLike = handleCardLike;
        this._handleLikeButton = handleLikeButton;
        this._handleDelete = handleDelete;
        this._handleDelete = this._handleDelete.bind(this);

        this._uniteListenerFunc = this._uniteListenerFunc.bind(this);
        this._myId = myId;
    }

    _getTemplateCard() { // метод возвращает клонированный шаблон карточки
        const cardTemplate = document.querySelector(`.${this._cardSelector}`).content;
        const cardElement = cardTemplate.querySelector('.element');
        this._card = cardElement.cloneNode(true);
        this._photo = this._card.querySelector('.element__photo');
        this._capture = this._card.querySelector('.element__capture');
        this._like = this._card.querySelector('.element__like-counter');
        this._likeButton = this._card.querySelector('.element__like');
        
        return cardElement;
    }

    makeCard(item) { //метод создает карточку
        this._getTemplateCard();
        this._compareId(item);
        this._capture.textContent = this._cardName;
        this._photo.src = this._cardUrl;
        this._like.textContent = this._likeCounter;
        this._photo.alt = 'Упс! Кажется вы вставили нерабочую ссылку на изображение :(';
        this._photo.setAttribute('data-description', this._cardName);

        this._setEventListeners();
        
        this._handleLikeButton(this._likeButton);
        
        return this._card;
    }

    _setEventListeners() { //метод вешает слушатели на созданную карточку
        this._likeButton.addEventListener('click', this._uniteListenerFunc);
        this._card.querySelector('.element__delete').addEventListener('click', this._handleDelete);
        this._card.querySelector('.element__photo').addEventListener('click', this._handleCardClick);
    }

    _removeEventListeners() {
        this._likeButton.removeEventListener('click', this._uniteListenerFunc);
        this._card.querySelector('.element__delete').removeEventListener('click', this._handleDelete);
        this._card.querySelector('.element__photo').removeEventListener('click', this._handleCardClick);
    }

    _likeCards() { //метод лайка карточек
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
    }

    deleteCards() { //метод удаления карточек
        this._removeEventListeners();
        this._card.remove();
        this._card = null;
    }

    _compareId(item) {
        this._deleteButton = this._card.querySelector('.element__delete');
        if (item.owner._id === this._myId) {
            this._deleteButton.style.display = 'block'
        } else {
            this._deleteButton.style.display = 'none'
        }
    }

    _uniteListenerFunc() {
        this._likeCards();
        this._handleCardLike(this._likeButton, this._like);
    }
}