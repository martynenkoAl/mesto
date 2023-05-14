import './index.css';
import {initialCards, popupCardSelector, obj, popupEditButton, popupUserSelector, popupImageSelector, listSelector, templateSelector, userJobSelector, userNameSelector, formUser, popupAddButton, formCard} from "../scripts/utils/constants.js";
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const popupImage = new PopupWithImage(popupImageSelector);


const defaultCardList = new Section({items: initialCards, renderer: (item) => {
  const firstCards = new Card(item, templateSelector, popupImage.open);
  const cardItem = firstCards.createCard();
  return cardItem;
},
}, listSelector);

defaultCardList.renderItems();

const popupUser = new PopupWithForm(popupUserSelector, (data) => {
  userInfo.setUserInfo(data);
  popupUser.close();
})


const popupCard = new PopupWithForm(popupCardSelector, (data) => {
  defaultCardList.addItem(data)
  popupCard.close();
})


//валидация форм
const formUserValidator = new FormValidator(obj, formUser);
formUserValidator.enableValidation();

const formCardValidator = new FormValidator(obj, formCard);
formCardValidator.enableValidation();


//слушатели
popupImage.setEventListeners();
popupUser.setEventListeners();
popupCard.setEventListeners();



// слушатели открытия попап
popupEditButton.addEventListener('click', () => {
  formUserValidator.resetErrors();
  popupUser.setInputValues(userInfo.getUserInfo());
  popupUser.open();
})
popupAddButton.addEventListener('click', () => {
  formCardValidator.resetErrors();
  popupCard.open();
})


