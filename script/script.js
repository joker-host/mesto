// ---------------------Открытие/закрытие попапа с редактированием------------------------

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__close-icon_profile');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
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
}

// Добавляем реакцию на клик по кнопке открытия редактирования сведений о пользователе
popupOpenButton.addEventListener('click', toggleClassProfile);
closeButtonProfile.addEventListener('click', toggleClassProfile);
const profileForm = document.querySelector('.popup__form_profile');
function formSubmitHandler(evt) {
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

function makeCard(cardName, cardUrl) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector('.element__photo');
    const cardCapture = card.querySelector('.element__capture');
    cardPhoto.src = cardUrl;
    cardCapture.textContent = cardName;
    cardPhoto.setAttribute('data-description', cardName);
    return(card);
}

function addCard(newCard, container) {
    container.prepend(newCard);
}

const initialCardsReverse = initialCards.reverse();

initialCardsReverse.forEach( function (item) {
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

buttonAddCards.addEventListener('click', function() {
    toggleClass(popupCard);
});
closeButtonCard.addEventListener('click', function() {
    toggleClass(popupCard);
});

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

// function toggleClassImage() {
//     imagePopup.classList.toggle('popup_opened');
// }

closeButtonImage.addEventListener('click', function() {
    toggleClass(imagePopup);
});