// popups
const popupUser = document.querySelector('.popup_user');
const popupCards = document.querySelector('.popup_cards');
const popupImage = document.querySelector('.popup_image');

//popup close buttons
const popupUserClose = popupUser.querySelector('.popup__close');
const popupCardsClose = popupCards.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');

// popup open buttons
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');

// inputs
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
let placeInput = document.querySelector('.popup__text_type_place');
let pictureInput = document.querySelector('.popup__text_type_link');

// отображение ввода данных на странице
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let elementPicture = document.querySelector('.element__picture');
let elementName = document.querySelector('.element__name');

// работа с темплейт
const list = document.querySelector('.elements__container'); // куда встают карточки

// формы
let formUser = popupUser.querySelector('.popup__form');
let formCard = popupCards.querySelector('.popup__form');

// создаем функцию открытия и закрытия попапов
const togglePopup = function (popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.toggle('popup_opened');
}

// отправляем данные пользоватля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupUser);
}




// массив с первоначальными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(item => {
  let firstCards = createCard(item);
  list.append(firstCards);
})

function createCard (item) {
  const itemTemplate = document.querySelector('#card').content;
  const cardElement = itemTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__picture').src = item.link;
  cardElement.querySelector('.element__name').textContent = item.name;
  const elementLikeBtn = cardElement.querySelector('.element__like-btn');
  const elementDeleteBtn = cardElement.querySelector('.element__delete-btn');

  elementLikeBtn.addEventListener('click', () => {
    elementLikeBtn.classList.toggle('element__like-btn_active');
  });

  elementDeleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });

  //лисенер для попапа с картинкой в функции создания карточек
  cardElement.querySelector('.element__picture').addEventListener('click', () => {
    openImage(item);
  });

  return cardElement;
}
 //функция открытия попапа с картинкой
function openImage(item) {
  popupImage.querySelector('.popup__photo').src = item.link;
  popupImage.querySelector('.popup__placename').textContent = item.name;

  togglePopup(popupImage);
 }

function handleFormSubmitCards (evt) {
  evt.preventDefault();

  const newCard = createCard ({
    link: pictureInput.value,
    name: placeInput.value
  });

  list.prepend(newCard);
  evt.target.reset();
  togglePopup(popupCards);
 }


formUser.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCards);

popupEditButton.addEventListener('click', function () {
  togglePopup(popupUser);
})

popupAddButton.addEventListener('click', function () {
  togglePopup(popupCards);
})

popupUserClose.addEventListener('click', function () {
  togglePopup(popupUser);
})

popupCardsClose.addEventListener('click', function () {
  togglePopup(popupCards);
})

popupImageClose.addEventListener('click', function () {
  togglePopup(popupImage);
})
