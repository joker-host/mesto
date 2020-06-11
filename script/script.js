// ---------------------Открытие/закрытие попапа с редактированием------------------------

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-icon_profile');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const submitButtonProfile = document.querySelector('.popup__save-button_profile');
const profileForm = document.querySelector('.popup__form_profile');

function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    window.addEventListener('keydown', evt => {
        escapeListener(evt, popupName);
    })
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    window.removeEventListener('keydown', evt => {
        escapeListener(evt, popupName);
    })
}

function setInput() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

popupOpenButton.addEventListener('click', () => {
    openPopup(popupProfile);
    setInput();
    handleFormInput(profileForm, submitButtonProfile);
    resetError(profileForm);
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

// ---------------------Добавление карточек------------------------

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const cardForm = document.querySelector('.popup__form_card');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const submitButtonCard = document.querySelector('.popup__save-button_card');

function makeCard(cardName, cardUrl) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector('.element__photo');
    const cardCapture = card.querySelector('.element__capture');
    const likeElement = card.querySelector('.element__like');
    const deleteElement = card.querySelector('.element__delete');
    const photoElement = card.querySelector('.element__photo');
    cardPhoto.src = cardUrl;
    cardCapture.textContent = cardName;
    cardPhoto.setAttribute('data-description', cardName);
    likeElement.addEventListener('click', likeCard);
    deleteElement.addEventListener('click', deleteCard);
    photoElement.addEventListener('click', openPopupImage);
    return (card);
}

function addCard(newCard, container) {
    container.prepend(newCard);
}

const initialCardsReverse = initialCards.reverse();

initialCardsReverse.forEach(function (item) {
    addCard(makeCard(item.name, item.link), elementContainer);
});

function submitForm(evt) {
    evt.preventDefault();
    addCard(makeCard(titleInput.value, linkInput.value), elementContainer);
    closePopup(popupCard);
}

cardForm.addEventListener('submit', submitForm);

// ---------------------Открытие/закрытие попапа с добавлением карточек------------------------

const popupCard = document.querySelector('.popup_type_card');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close-icon_card');

buttonAddCards.addEventListener('click', function () {
    titleInput.value = '';
    linkInput.value = '';
    handleFormInput(cardForm, submitButtonCard);
    resetError(popupCard);
    openPopup(popupCard);
});

closeButtonCard.addEventListener('click', function () {
    closePopup(popupCard);
});

// ---------------------Лайк карточек------------------------

function likeCard(e) {
    e.target.classList.toggle('element__like_active');
}

// ---------------------Удаление карточек------------------------

function deleteCard(e) {
    e.target.closest(".element").remove();
}

// ---------------------Попап с увеличением картинок------------------------

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const closeButtonImage = document.querySelector('.popup__close-icon_image');

function openPopupImage(e) {
    openPopup(imagePopup);
    popupImage.src = e.target.src;
    popupCapture.textContent = e.target.getAttribute('data-description');
}

closeButtonImage.addEventListener('click', function () {
    closePopup(imagePopup);
});

// ---------------------Валидация------------------------

const settingsObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__form-input_type_error',
}

enableValidation(settingsObject);

// ---------------------Закрытие попапа кликом на оверлей------------------------

const popupOverlay = Array.from(document.querySelectorAll('.popup'));

popupOverlay.forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closePopup(imagePopup);
        }
    })
})

// ---------------------Закрытие попапа нажатием на Escape------------------------

function escapeListener(evt, popupName) {
    if (evt.key == 'Escape') {
        closePopup(popupName);
    }
}