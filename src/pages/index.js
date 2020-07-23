import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';

// ---------------------функция-----------------------

function callbacksCards(values, container) {
    const { name, link, likes, _id } = values
    const card = new Card(name, link, likes.length, `element-template`, {
        handleCardClick: () => {
            popupImage.open(link, name);
            popupImage.setEventListeners('.popup__close-icon_image');
        }
    },
        {
            handleCardLike: (likeButton, likeCounter) => {
                if (likeButton.classList.contains('element__like_active')) { //Если у кнопки лайка есть активный селектор, то передает запрос удаления и уменьшаем количество лайков
                    api.likeCards(_id)
                        .then(() => {
                            likeCounter.textContent++;
                        })
                        .catch(() => {
                            console.error('error');
                        });
                } else { // Если нет, то наоборот
                    api.disLikeCards(_id)
                        .then(() => {
                            likeCounter.textContent--;
                        })
                        .catch(() => {
                            console.error('error');
                        });
                }
            }
        },
        {
            handleLikeButton(likeButton) {
                likes.forEach(likeObj => {
                    if (likeObj._id === "7c9415b94dba96eadde634c5") {
                        likeButton.classList.add('element__like_active');
                    }
                })
            }
        },
        {
            handleDelete() {
                deleteCards.open();
                deleteCards.setSubmit(() => {
                    console.log(_id);
                    api.deleteCards(_id)
                    .then(res => {
                        console.log(res);
                        card.deleteCards();
                        deleteCards.close();
                    })
                    .catch(() => {
                        console.error('error');
                    });
                    
                })
            }
        }, "7c9415b94dba96eadde634c5");
    const cardElement = card.makeCard(values); //применяем метод создания карточки
    container.addItem(cardElement)
}

// ---------------------Валидация------------------------

const profileForm = document.querySelector('.popup__form_profile');
const cardForm = document.querySelector('.popup__form_card');
const avatarForm = document.querySelector('.popup__form_avatar');

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

const avatarFormValidation = new FormValidator(settingsObject, avatarForm);
avatarFormValidation.enableValidation();

// ---------------------Запросы к серверу (профиль)------------------------

const profileAuthor = document.querySelector('.profile__author');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

const api = new Api();

api.getUserInfo()
    .then(res => {
        profileAuthor.textContent = res.name;
        profileDescription.textContent = res.about;
        profileAvatar.src = res.avatar;
    })
    .catch(() => {
        console.error('error');
    })

// ---------------------Запросы к серверу (Карточки)------------------------

const deleteCards = new PopupWithDelete('.popup_type_delete-cards');
deleteCards.setEventListeners('.popup__close-icon_delete');

api.getInitialCards()
    .then(res => {
        const addCards = new Section({
            items: res, //передаем массив с карточками
            renderer: (item) => {
                return callbacksCards(item, addCards);
            }
        }, '.elements');

        addCards.renderItems();

        const cardSubmit = new PopupWithForm('.popup_type_card', values => {
            console.log(values);
            cardSaveButton.textContent = 'Сохранение...';
            api.addCards(values)
                .then((res) => {
                    cardSaveButton.textContent = 'Сохранить';
                    console.log(res);
                    cardSubmit.close();
                    callbacksCards(res, addCards);
                })
                .catch(() => {
                    console.error('error');
                    cardSaveButton.textContent = 'Сохранить';
                });
        });
        cardSubmit.setEventListeners('.popup__close-icon_card');
    })
    .catch(() => {
        console.error('error');
    });

// ---------------------Редактирование профиля------------------------

const popupOpenButton = document.querySelector('.profile__edit-button');
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('job-input');
const profileSaveButton = document.querySelector('.popup__save-button_profile');

const userInfo = new UserInfo('.profile__author', '.profile__description');
const profileSubmit = new PopupWithForm('.popup_type_profile', values => {
    userInfo.setUserInfo(values);
    profileSaveButton.textContent = 'Сохранение...';
    api.setUserUnfo(values)
        .then(() => {
            profileSaveButton.textContent = 'Сохранить';
            profileSubmit.close();
        })
        .catch(() => {
            console.error('error');
            profileSaveButton.textContent = 'Сохранить';
        });
});

profileSubmit.setEventListeners('.popup__close-icon_profile');

popupOpenButton.addEventListener('click', () => {
    const autorInfo = userInfo.getUserInfo();
    nameInput.value = autorInfo.name;
    jobInput.value = autorInfo.info;
    profileSubmit.open();
    profileFormValidation.resetError();
});

// ---------------------Создание и добавление карточек------------------------

const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const buttonAddCards = document.querySelector('.profile__add-button');
const cardSaveButton = document.querySelector('.popup__save-button_card');

const popupCard = new Popup('.popup_type_card');

buttonAddCards.addEventListener('click', function () {
    titleInput.value = '';
    linkInput.value = '';
    cardFormValidation.resetError();
    popupCard.open();
});

const popupImage = new PopupWithImage('.popup_type_image');

// ---------------------Смена аватара пользователя------------------------

const avatar = document.querySelector('.profile__avatar-overlay');
const avatarUrl = document.querySelector('.profile__avatar');
const avatarSaveButton = document.querySelector('.popup__save-button_avatar');

const avatarPopup = new PopupWithForm('.popup_type_avatar', values => {
    avatarSaveButton.textContent = 'Сохранение...';
    api.changeAvatar(values)
        .then(res => {
            avatarUrl.src = res.avatar;
            avatarPopup.close();
            avatarSaveButton.textContent = 'Сохранить';
        })
        .catch(() => {
            console.error('error');
            avatarSaveButton.textContent = 'Сохранить';
        })
})

avatar.addEventListener('click', function () {
    avatarPopup.open();
    avatarFormValidation.resetError();
})

avatarPopup.setEventListeners('.popup__close-icon_avatar');