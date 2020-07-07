export class Popup{
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this._popupSelector.classList.remove('popup_opened');
            this.close();
        }
    }

    setEventListeners(closeButtonSelector) {
        this._popupSelector.querySelector(closeButtonSelector).addEventListener('click', () => {
            this.close();
        });
        this._popupSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup_opened')) {
                this.close();
            }
        })
    }
}