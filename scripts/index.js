// popups
//const popupElement = document.querySelectorAll('.popup');
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
const itemTemplate = document.querySelector('#card').content;
const list = document.querySelector('.elements__container'); // куда встают карточки

// формы
const formUser = popupUser.querySelector('.popup__form');
const formCard = popupCards.querySelector('.popup__form');

// деактивация кнопки Submit
const inputs = Array.from(formCard.querySelectorAll('.popup__text'));
const submitButton = formCard.querySelector('.popup__submit-btn');


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

// Изменение состояния кнопки создания карточек
const toggleButton = (inputs, submitButton) => {
  if (!inputs.value) {
    submitButton.classList.add('popup__submit-btn_inactive');
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove('popup__submit-btn_inactive');
    submitButton.removeAttribute('disabled');
  }
};



initialCards.forEach(item => {
  const firstCards = createCard(item);
  list.append(firstCards);
})

// функция создания карточек
function createCard (item) {
  const cardElement = itemTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = cardElement.querySelector('.element__picture');
  const elementName = cardElement.querySelector('.element__name');
  const elementLikeBtn = cardElement.querySelector('.element__like-btn');
  const elementDeleteBtn = cardElement.querySelector('.element__delete-btn');
  elementPicture.src = item.link;
  elementPicture.alt = 'Добавленное изображение';
  elementName.textContent = item.name;

  elementLikeBtn.addEventListener('click', () => {
    elementLikeBtn.classList.toggle('element__like-btn_active');
  });

  elementDeleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });

  //лисенер для попапа с картинкой
  elementPicture.addEventListener('click', () => {
    openImage(item);
  });

  return cardElement;
}
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

  const newCard = createCard ({
    link: pictureInput.value,
    name: placeInput.value
  });

  list.prepend(newCard);
  evt.target.reset();
  closePopup(popupCards);
 }




formUser.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', handleFormSubmitCards);

//открываем попап
popupEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupUser);
})
popupAddButton.addEventListener('click', function () {
  openPopup(popupCards);
  toggleButton(inputs, submitButton);
})
// закрываем попап
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

