export {popupConfirmSelector, avatarEditButton, avatarPictureElement, popupAvatarSelector, formAvatar, popupCardSelector, obj, popupEditButton, popupUserSelector, popupImageSelector, listSelector, templateSelector, userJobSelector, userNameSelector, formUser, popupAddButton, formCard}

// popups
const popupUser = document.querySelector('.popup_user');
const popupCards = document.querySelector('.popup_cards');
const popupAvatar = document.querySelector('.popup_avatarform');

// selectors
const templateSelector = '#card';
const listSelector = '.elements__container';
const popupUserSelector = '.popup_user';
const popupCardSelector = '.popup_cards';
const popupAvatarSelector = '.popup_avatarform';
const popupImageSelector = '.popup_image';
const popupConfirmSelector = '.popup_confirm';
const userNameSelector = '.popup__text_type_username';
const userJobSelector = '.popup__text_type_job';


// popup open buttons
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');

// формы
const formUser = popupUser.querySelector('.popup__form');
const formCard = popupCards.querySelector('.popup__form');
const formAvatar = popupAvatar.querySelector('.popup__form');

// аватар
const avatarPictureElement = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__avatar-btn');

//объект для валидации
const obj = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  errorSelector: '.popup__text-error_',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorTextClass: 'popup__text-error_active'
};

