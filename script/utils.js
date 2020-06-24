// ---------------------Открытие/закрытие попапов------------------------

function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener('keydown', escapeListener);
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeListener);
}

// ---------------------Закрытие попапа нажатием на escape------------------------

function escapeListener(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key == 'Escape') {
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', escapeListener);
    }
}

export {openPopup, closePopup, escapeListener};