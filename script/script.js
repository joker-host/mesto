import {Card} from './Card.js';
import {initialCards} from './massive-cards.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';

// ---------------------Редактирование профиля------------------------

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-icon_profile');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const profileForm = document.querySelector('.popup__form_profile');

popupOpenButton.addEventListener('click', () => {
    setInput();
    profileFormValidation.resetError();
    openPopup(popupProfile);
});

closeButtonProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
}

profileForm.addEventListener('submit', formSubmitHandler);

function setInput() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

// ---------------------Открытие/закрытие попапа с добавлением карточек------------------------

const popupCard = document.querySelector('.popup_type_card');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close-icon_card');

buttonAddCards.addEventListener('click', function () {
    titleInput.value = '';
    linkInput.value = '';
    cardFormValidation.resetError();
    openPopup(popupCard);
});

closeButtonCard.addEventListener('click', function () {
    closePopup(popupCard);
});

// ---------------------Попап с увеличением картинок------------------------

const imagePopup = document.querySelector('.popup_type_image');
const closeButtonImage = document.querySelector('.popup__close-icon_image');

closeButtonImage.addEventListener('click', function () {
    closePopup(imagePopup);
});

// ---------------------Закрытие попапа кликом на оверлей------------------------

const popupOverlay = Array.from(document.querySelectorAll('.popup'));

popupOverlay.forEach(elem => {
    elem.addEventListener('click', (e) => {
        const openedPopup = document.querySelector('.popup_opened');
        if (e.target.classList.contains('popup_opened')) {
            closePopup(openedPopup);
        }
    })
})



// ---------------------Добавление карточек------------------------

const cardForm = document.querySelector('.popup__form_card');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const elementContainer = document.querySelector('.elements');
const initialCardsReverse = initialCards.reverse();

initialCardsReverse.forEach((item) => {
    const card = new Card(item.name, item.link, `element-template`);
    const cardElement = card.makeCard();
    elementContainer.prepend(cardElement);
});

function submitForm(evt) {
    evt.preventDefault();
    const card = new Card(titleInput.value, linkInput.value, `element-template`);
    const cardElement = card.makeCard();
    elementContainer.prepend(cardElement);
    closePopup(popupCard);
}

cardForm.addEventListener('submit', submitForm);

// ---------------------Валидация------------------------

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