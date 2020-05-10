// Получаем информацию о блоках HTML и записываем ее в константы (они изменятся не будут)
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-icon');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
// Создаем функцию, которая добавляет/удаляет класс у элемента
function addClass() {
    popup.classList.add('popup_opened');
}
function removeClass() {
    popup.classList.remove('popup_opened');
}
// Добавляем реакцию на клик по кнопке открытия редактирования сведений о пользователе
popupOpenButton.addEventListener('click', addClass);
closeButton.addEventListener('click', removeClass);
const form = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    // evt.preventDefault - отменяет стандартную отправку формы и мы можем задать свою логику для нее
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем окно
    removeClass();
}
// обработчик для формы, который следит за событием submit
form.addEventListener('submit', formSubmitHandler);