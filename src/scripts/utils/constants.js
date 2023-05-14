export {initialCards, popupCardSelector, obj, popupEditButton, popupUserSelector, popupImageSelector, listSelector, templateSelector, userJobSelector, userNameSelector, formUser, popupAddButton, formCard}

// popups
const popupUser = document.querySelector('.popup_user');
const popupCards = document.querySelector('.popup_cards');

// selectors
const templateSelector = '#card';
const listSelector = '.elements__container';
const popupUserSelector = '.popup_user';
const popupCardSelector = '.popup_cards';
const popupImageSelector = '.popup_image';
const userNameSelector = '.popup__text_type_username';
const userJobSelector = '.popup__text_type_job';


// popup open buttons
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');

// формы
const formUser = popupUser.querySelector('.popup__form');
const formCard = popupCards.querySelector('.popup__form');

//объект для валидации
const obj = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  errorSelector: '.popup__text-error_',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorTextClass: 'popup__text-error_active'
};

// массив с первоначальными карточками
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
