export class Api {
    constructor() {
        this.baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-13'
    }

    getInitialCards(obj) {
        return fetch(`${this.baseUrl}/cards`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    getUserInfo(obj) {
        return fetch(`${this.baseUrl}/users/me`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    setUserUnfo(obj) {
        return fetch(`${this.baseUrl}/users/me`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    addCards(obj) {
        return fetch(`${this.baseUrl}/cards`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    likeCards(idCard, obj) {
        return fetch(`${this.baseUrl}/cards/likes/${idCard}`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    deleteCards(idCard, obj) {
        return fetch(`${this.baseUrl}/cards/${idCard}`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    changeAvatar(obj) {
        return fetch(`${this.baseUrl}/users/me/avatar`, obj)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    return Promise.reject(`Ошибка: ${result.status}`);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
}