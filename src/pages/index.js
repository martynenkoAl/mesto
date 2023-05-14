import './index.css';
import {initialCards, popupCardSelector, obj, popupEditButton, popupUserSelector, popupImageSelector, listSelector, templateSelector, userJobSelector, userNameSelector, formUser, popupAddButton, formCard} from "../utils/constants.js";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const popupImage = new PopupWithImage(popupImageSelector);

const createNewCard = (item) => {
  const firstCards = new Card(item, templateSelector, popupImage.open);
  const cardItem = firstCards.createCard();
  return cardItem;
}


const defaultCardList = new Section({items: initialCards, renderer: (element) => {
  defaultCardList.addItem(createNewCard(element))
}}, listSelector);

defaultCardList.renderItems();


const popupUser = new PopupWithForm(popupUserSelector, (data) => {
  userInfo.setUserInfo(data);
  popupUser.close();
})


const popupCard = new PopupWithForm(popupCardSelector, (data) => {
  defaultCardList.addItem(createNewCard(data))
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


