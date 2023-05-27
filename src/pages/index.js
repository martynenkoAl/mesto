import './index.css';
import {popupConfirmSelector, avatarEditButton, avatarPictureElement, popupAvatarSelector, formAvatar, popupCardSelector, obj, popupEditButton, popupUserSelector, popupImageSelector, listSelector, templateSelector, userJobSelector, userNameSelector, formUser, popupAddButton, formCard} from "../utils/constants.js";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmForm from '../components/PopupConfirmForm.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '16c59b9f-2624-4711-ab65-5d2bf980f5da',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userNameSelector, userJobSelector);

const popupImage = new PopupWithImage(popupImageSelector);

const popupConfirm = new PopupConfirmForm(popupConfirmSelector, ({element, cardId}) => {
  api.deleteCard(cardId)
    .then(() => {
      element.deleteCard()
      popupConfirm.close();
    })
    .catch(err => console.log(err))
});

function createNewCard (item) {
  const firstCards = new Card(item, templateSelector, popupImage.open, popupConfirm.open, () => {
    if(firstCards.isLiked()) {
      api.deleteLike(item._id)
        .then(res => {
          firstCards.changeLikes(res.likes)
        })
        .catch(err => console.log(err))
    } else {
      api.putLike(item._id)
        .then(res => {
          firstCards.changeLikes(res.likes)
        })
        .catch(err => console.log(err))
    }
  });
  const cardItem = firstCards.createCard();
  return cardItem;
}


const defaultCardList = new Section((element) => {
  defaultCardList.addItem(createNewCard(element))
}, listSelector);


// попапы

const popupUser = new PopupWithForm(popupUserSelector, (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({username: res.name, job: res.about, avatar: res.avatar});
      popupUser.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupUser.setButtonText()
    })

})


const popupCard = new PopupWithForm(popupCardSelector, (data) => {
  Promise.all([api.getInfo(), api.addNewCard(data)])
  .then(([dataUser, dataCard]) => {
    dataCard.myid = dataUser._id;
    defaultCardList.addItem(createNewCard(dataCard));
    popupCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupCard.setButtonText()
  })
})

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setAvatar(data)
  .then(res => {
    userInfo.setUserInfo({username: res.name, job: res.about, avatar: res.avatar});
    popupAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupAvatar.setButtonText()
  })
})

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({username: dataUser.name, job: dataUser.about, avatar: dataUser.avatar});
    defaultCardList.renderItems(dataCard.reverse());
  })
  .catch(err => console.log(err))


//валидация форм
const formUserValidator = new FormValidator(obj, formUser);
formUserValidator.enableValidation();

const formCardValidator = new FormValidator(obj, formCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(obj, formAvatar);
formAvatarValidator.enableValidation();


//вызвать слушатели
popupImage.setEventListeners();
popupUser.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();




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

avatarEditButton.addEventListener('click', () => {
  formAvatarValidator.resetErrors();
  popupAvatar.open();
})

