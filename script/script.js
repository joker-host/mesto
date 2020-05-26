// ---------------------Открытие/закрытие попапа с редактированием------------------------

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-icon_profile');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
// Создаем функцию, которая добавляет/удаляет класс у элемента
function toggleClassProfile() {
    popupProfile.classList.toggle('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
// Добавляем реакцию на клик по кнопке открытия редактирования сведений о пользователе
popupOpenButton.addEventListener('click', toggleClassProfile);
closeButtonProfile.addEventListener('click', toggleClassProfile);
const profileForm = document.querySelector('.popup__form_profile');
function formSubmitHandler (evt) {
    // evt.preventDefault - отменяет стандартную отправку формы и мы можем задать свою логику для нее
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем окно
    toggleClassProfile();
}
// обработчик для формы, который следит за событием submit
profileForm.addEventListener('submit', formSubmitHandler);

// ---------------------Добавление карточек------------------------

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const cardForm = document.querySelector('.popup__form_card');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCards (cardName, cardUrl) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector('.element__photo');
    const cardCapture = card.querySelector('.element__capture');
    cardPhoto.src = cardUrl;
    cardCapture.textContent = cardName;
    elementContainer.prepend(card);
    cardPhoto.setAttribute('data-description', cardName);
}

const initialCardsReverse = initialCards.reverse();

initialCardsReverse.forEach( function (item) {
    addCards(item.name, item.link);
});

function submitForm (evt) {
    evt.preventDefault();
    addCards (titleInput.value, linkInput.value);
    toggleClassCard();
}

cardForm.addEventListener('submit', submitForm);

// ---------------------Открытие/закрытие попапа с добавлением карточек------------------------

const popupCard = document.querySelector('.popup_type_card');
const buttonAddCards = document.querySelector('.profile__add-button');
const closeButtonCard = document.querySelector('.popup__close-icon_card');

function toggleClassCard() {
    popupCard.classList.toggle('popup_opened');
}
buttonAddCards.addEventListener('click', toggleClassCard);
closeButtonCard.addEventListener('click', toggleClassCard);

// ---------------------Лайк карточек------------------------

function likeCard(e) {
    if (e.target.classList.contains("element__like")) {
        e.target.classList.toggle('element__like_active');
    }
}
elementContainer.addEventListener('click', likeCard);

// ---------------------Удаление карточек------------------------

function deleteCard(e) {
    if (e.target.classList.contains("element__delete")) {
        e.target.closest(".element").remove();
    }
}
elementContainer.addEventListener('click', deleteCard);


// ---------------------Попап с увеличением картинок------------------------

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const closeButtonImage = document.querySelector('.popup__close-icon_image');

elementContainer.addEventListener('click', function(e) {
    if  (e.target.classList.contains("element__photo")){
        imagePopup.classList.add('popup_opened');
        popupImage.src = e.target.src;
        popupCapture.textContent = e.target.getAttribute('data-description');
    }
});

function toggleClassImage() {
    imagePopup.classList.toggle('popup_opened');
}

closeButtonImage.addEventListener('click', toggleClassImage);