import initialCards from "./cardsData.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";



// popups
const popupUser = document.querySelector('.popup_user');
const popupCards = document.querySelector('.popup_cards');
const popupImage = document.querySelector('.popup_image');

//popup close buttons
const closeButtons = document.querySelectorAll('.popup__close');

// popup open buttons
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');

//popup elements
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupPlaceName = popupImage.querySelector('.popup__placename');

// inputs
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const placeInput = document.querySelector('.popup__text_type_place');
const pictureInput = document.querySelector('.popup__text_type_link');

// отображение ввода данных на странице
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// работа с темплейт
const list = document.querySelector('.elements__container'); // куда встают карточки
const templateSelector = '#card';

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


//создаем карточки на странице
initialCards.forEach(item => {
  const firstCards = new Card(item, templateSelector, openImage);
  const cardItem = firstCards.createCard();
  list.append(cardItem);
})

//валидация форм
const formUserValidator = new FormValidator(obj, formUser);
formUserValidator.enableValidation();

const formCardValidator = new FormValidator(obj, formCard);
formCardValidator.enableValidation();


 //функция открытия попапа с картинкой
function openImage(item) {
  popupPhoto.src = item.link;
  popupPhoto.alt = 'Выбранное изображение';
  popupPlaceName.textContent = item.name;

  openPopup(popupImage);
 }

// отправляем данные пользоватля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupUser);
}

function handleFormSubmitCards (evt) {
  evt.preventDefault();

  const cardData = {name: placeInput.value, link: pictureInput.value};
  const newCard = new Card(cardData, templateSelector, openImage);

  list.prepend(newCard.createCard());
  evt.target.reset();
  closePopup(popupCards);
 }


 //сабмит
formUser.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCards);

// функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Закрытие попапа по Esc
const closePopupByEsc = function (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
  }
};


// Закрытие попапа по overlay
const closePopupByClickOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(popup => {
    popup.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
    });
  });
};
closePopupByClickOverlay();


//слушатели открытия попап
popupEditButton.addEventListener('click', function () {
  formUser.reset();
  formUserValidator.resetErrors();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupUser);
})
popupAddButton.addEventListener('click', function () {
  formCard.reset();
  formCardValidator.resetErrors();
  openPopup(popupCards);
})
// слушатели закрытия попап
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

