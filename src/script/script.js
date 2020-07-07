import {Card} from './Card.js';
import {initialCards} from './massive-cards.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from '../script/PopupWithImage.js';
import {PopupWithForm} from '../script/PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import '../pages/index.css';

// ---------------------Валидация------------------------

const profileForm = document.querySelector('.popup__form_profile');
const cardForm = document.querySelector('.popup__form_card');

const settingsObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__form-input_type_error',
    errorSpanClass: '.error'
}

const profileFormValidation = new FormValidator(settingsObject, profileForm);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(settingsObject, cardForm);
cardFormValidation.enableValidation();

// ---------------------Редактирование профиля------------------------

const popupOpenButton = document.querySelector('.profile__edit-button');

const userInfo = new UserInfo('.profile__author', '.profile__description');
const profileSubmit = new PopupWithForm('.popup_type_profile', values => {
    console.log(values);
    userInfo.setUserInfo(values);
    profileSubmit.close();
});

profileSubmit.setEventListeners('.popup__close-icon_profile');

popupOpenButton.addEventListener('click', () => {
    const autorInfo = userInfo.getUserInfo();
    document.getElementById('name-input').value = autorInfo.name;
    document.getElementById('job-input').value = autorInfo.info;
    profileSubmit.open();
    profileFormValidation.resetError();
});

// ---------------------Создание и добавление карточек------------------------

const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const buttonAddCards = document.querySelector('.profile__add-button');
const initialCardsReverse = initialCards.reverse();

const popupCard = new Popup('.popup_type_card');

buttonAddCards.addEventListener('click', function () {
    titleInput.value = '';
    linkInput.value = '';
    cardFormValidation.resetError();
    popupCard.open();
});

const popupImage = new PopupWithImage('.popup_type_image');

const addCards = new Section({
    items: initialCardsReverse, //передаем массив с карточками
    renderer: (item) => { 
        const card = new Card(item.name, item.link, `element-template`, {
            handleCardClick: () => {
                popupImage.open(item.link, item.name);
                popupImage.setEventListeners('.popup__close-icon_image');
            }
        });
        const cardElement = card.makeCard(); //применяем метод создания карточки
        return cardElement;
    }}, 
'.elements');

addCards.renderItems();

const cardSubmit = new PopupWithForm('.popup_type_card', values => {
    const card = new Card(values.title, values.link, `element-template`, {
        handleCardClick: () => {
            popupImage.open(values.link, values.title);
            popupImage.setEventListeners('.popup__close-icon_image');
        }
    });
    const cardElement = card.makeCard();
    addCards.addItem(cardElement); 
    cardSubmit.close();
});

cardSubmit.setEventListeners('.popup__close-icon_card');