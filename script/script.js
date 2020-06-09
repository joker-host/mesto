// ---------------------Открытие/закрытие попапа с редактированием------------------------

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-icon_profile');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const submitButtonProfile = document.querySelector('.popup__save-button_profile');

// Создаем функцию, которая добавляет/удаляет класс у элемента

function toggleClass(popupName) {
    popupName.classList.toggle('popup_opened');
}

function setInput() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function toggleClassProfile() {
    toggleClass(popupProfile);
    setInput();
    handleFormInput(profileForm, submitButtonProfile);
    resetError();
    addKeydownListener(popupProfile);
}

// Добавляем реакцию на клик по кнопке открытия редактирования сведений о пользователе

popupOpenButton.addEventListener('click', toggleClassProfile);
closeButtonProfile.addEventListener('click', toggleClassProfile);
const profileForm = document.querySelector('.popup__form_profile');

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем окно
    toggleClassProfile();
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
    toggleClass(popupCard);
}

cardForm.addEventListener('submit', submitForm);

// ---------------------Открытие/закрытие попапа с добавлением карточек------------------------

const popupCard = document.querySelector('.popup_type_card');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close-icon_card');

buttonAddCards.addEventListener('click', function () {
    toggleClass(popupCard);
    titleInput.value = '';
    linkInput.value = '';
    handleFormInput(cardForm, submitButtonCard);
    resetError();
    addKeydownListener(popupCard);
});
closeButtonCard.addEventListener('click', function () {
    toggleClass(popupCard);
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
    imagePopup.classList.add('popup_opened');
    popupImage.src = e.target.src;
    popupCapture.textContent = e.target.getAttribute('data-description');
    addKeydownListener(imagePopup);
}

closeButtonImage.addEventListener('click', function () {
    toggleClass(imagePopup);
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
            e.target.classList.remove('popup_opened');
        }
    })
})

// ---------------------Закрытие попапа нажатием на Escape------------------------

function addKeydownListener(popupClass) {
    window.addEventListener('keydown', evt => {
        if (evt.keyCode == 27) {
            popupClass.classList.remove('popup_opened');
        }
    }, {
        once: true
    });
}