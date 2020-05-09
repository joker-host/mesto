// Получаем информацию о блоках HTML и записываем ее в константы (они изменятся не будут)
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
// Создаем функцию, которая добавляет элементу определенный класс
function addClass() {
    popup.classList.add('popup_opened');
}
// Добавляем реакцию на клик по кнопке открытия редактирования сведений о пользователе
popupOpenButton.addEventListener('click', addClass);
// Делаем тоже самое, но для закрытия
const closeButton = document.querySelector('.popup__close-icon');
function removeClass() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', removeClass);



const form = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    // evt.preventDefault - отменяет стандартную отправку формы и мы можем задать свою логику для нее
    evt.preventDefault();
    // получаем значения value из полей input
    const nameInput = document.querySelector('#nameInput');
    const jobInput = document.querySelector('#jobInput');
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    // Приравниваем значения value к соотвествующим блокам на странице
    const name = document.querySelector('.profile__author');
    const job = document.querySelector('.profile__description');
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем окно
    removeClass();
}
// обработчик для формы, который следит за событием submit
form.addEventListener('submit', formSubmitHandler);

