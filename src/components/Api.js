export class Api {
    constructor() {
        this.baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-13'
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
            }
        })
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

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
            }
        })
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

    setUserUnfo(values) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                about: values.about
            })
        })
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

    addCards(values) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.title,
                link: values.link
            })
        })
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

    likeCards(idCard) {
        return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
            method: 'PUT',
            headers: {
            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
            }
        })
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

    disLikeCards(idCard) {
        return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
            method: 'DELETE',
            headers: {
            authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
            }
        })
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

    deleteCards(idCard) {
        return fetch(`${this.baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5'
            }
        })
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

    changeAvatar(values) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: '296925be-8e2c-44ab-b32c-580bcbc5c9b5',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: values.link
            })
          })
        .then(result => {
            if (result.ok) {
                console.log(result)
            } else {
                return Promise.reject(`Ошибка: ${result.status}`);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }
}