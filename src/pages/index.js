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

api.getUserInfo({
    method: 'GET',
    headers: {
        authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
    }
})
.then(res => {
    profileAuthor.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.src = res.avatar;
})

// ---------------------Запросы к серверу (Карточки)------------------------

const deleteCards = new PopupWithDelete('.popup_type_delete-cards');
deleteCards.setEventListeners('.popup__close-icon_delete');

api.getInitialCards({
    method: 'GET',
    headers: {
        authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
    }
})
    .then(res => {
        const addCards = new Section({
            items: res, //передаем массив с карточками
            renderer: (item) => {
                const card = new Card(item.name, item.link, item.likes.length, `element-template`, {
                    handleCardClick: () => {
                        popupImage.open(item.link, item.name);
                        popupImage.setEventListeners('.popup__close-icon_image');
                    }
                },
                    {
                        handleCardLike: (likeButton, likeCounter) => {
                            if (likeButton.classList.contains('element__like_active')) { //Если у кнопки лайка есть активный селектор, то передает запрос удаления и уменьшаем количество лайков
                                api.likeCards(item._id,
                                    {
                                        method: 'PUT',
                                        headers: {
                                            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                                        }
                                    }).then(() => {
                                        likeCounter.textContent++;
                                    });
                            } else { // Если нет, то наоборот
                                api.likeCards(item._id,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                                        }
                                    }).then(() => {
                                        likeCounter.textContent--;
                                    });
                            }
                        }
                    },
                    {
                        handleLikeButton(likeButton) {
                            item.likes.forEach(likeObj => {
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
                                console.log(item._id);
                                api.deleteCards(item._id, {
                                    method: 'DELETE',
                                    headers: {
                                        authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                                    }
                                }).then(res => console.log(res));
                                card.deleteCards();
                                deleteCards.close();
                            })
                        }
                    },
                    "7c9415b94dba96eadde634c5");
                const cardElement = card.makeCard(item); //применяем метод создания карточки
                return cardElement;
            }
        }, '.elements');



        addCards.renderItems();
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
    api.setUserUnfo({
        method: 'PATCH',
        headers: {
            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: values.name,
            about: values.about
        })
    }).then(() => {
        profileSaveButton.textContent = 'Сохранить';
        profileSubmit.close();
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

const cardSubmit = new PopupWithForm('.popup_type_card', values => {
    cardSaveButton.textContent = 'Сохранение...';
    api.addCards({
        method: 'POST',
        headers: {
            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: values.title,
            link: values.link
        })
    }).then((res) => {
        cardSaveButton.textContent = 'Сохранить';
        console.log(res);
        cardSubmit.close();
        const card = new Card(values.title, values.link, 0, `element-template`, {
            handleCardClick: () => {
                popupImage.open(values.link, values.title);
                popupImage.setEventListeners('.popup__close-icon_image');
            }
        },
            {
                handleCardLike: (likeButton, likeCounter) => {
                    if (likeButton.classList.contains('element__like_active')) { //Если у кнопки лайка есть активный селектор, то передает запрос удаления и уменьшаем количество лайков
                        api.likeCards(res._id,
                            {
                                method: 'PUT',
                                headers: {
                                    authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                                }
                            }).then(() => {
                                likeCounter.textContent++;
                            });
                    } else { // Если нет, то наоборот
                        api.likeCards(res._id,
                            {
                                method: 'DELETE',
                                headers: {
                                    authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                                }
                            }).then(() => {
                                likeCounter.textContent--;
                            });
                    }
                }
            },
            {
                handleLikeButton() {
                    undefined;
                }
            },
            {
                handleDelete() {
                    deleteCards.open();
                    deleteCards.setSubmit(() => {
                        console.log(res._id);
                        api.deleteCards(res._id, {
                            method: 'DELETE',
                            headers: {
                                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
                            }
                        }).then(res => console.log(res));
                        card.deleteCards();
                        deleteCards.close();
                    })
                }
            },
            "7c9415b94dba96eadde634c5");
        const cardElement = card.makeCard(res);
        document.querySelector('.elements').prepend(cardElement);
    });
});

cardSubmit.setEventListeners('.popup__close-icon_card');

// ---------------------Смена аватара пользователя------------------------

const avatar = document.querySelector('.profile__avatar-overlay');
const avatarUrl = document.querySelector('.profile__avatar');
const avatarSaveButton = document.querySelector('.popup__save-button_avatar');

const avatarPopup = new PopupWithForm('.popup_type_avatar', values => {
    avatarSaveButton.textContent = 'Сохранение...';
    api.changeAvatar({
        method: 'PATCH',
        headers: {
          authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: values.link
        })
      })
      .then(res => {
        avatarSaveButton.textContent = 'Сохранить';
        avatarUrl.src = res.avatar;
        avatarPopup.close();
      })
})

avatar.addEventListener('click', function() {
    avatarPopup.open();
    avatarFormValidation.resetError();
})

avatarPopup.setEventListeners('.popup__close-icon_avatar')