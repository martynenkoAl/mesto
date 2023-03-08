const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-btn');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


// открываем попап
const openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupElement.classList.add('popup_opened');
};

// закрываем попап
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

/*
const closePopupByClickOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};
*/


// отправляем данные формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
/*
popupElement.addEventListener('click', closePopupByClickOverlay);
*/
