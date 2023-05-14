export default class Card {
  constructor(item, templateSelector, openImage) {
    this._item = item;
    this._link = item.link;
    this._username = item.place;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // поставить лайк
  _handleClickLike = () => {
    this._elementLikeBtn.classList.toggle('element__like-btn_active');
  }

  // удалить карточку
  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  // открыть попап с картинкой
  _handleOpenImagePopup = () => {
    this._openImage(this._item);
  }

  // слушатели лайка, урны и открытия картинки
  _setEventListeners() {
    this._elementLikeBtn.addEventListener('click', this._handleClickLike);
    this._elementDeleteBtn.addEventListener('click', this._handleDeleteCard);
    this._elementPicture.addEventListener('click', this._handleOpenImagePopup);
  }

  // функция создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementPicture = this._element.querySelector('.element__picture');
    this._elementName = this._element.querySelector('.element__name');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementDeleteBtn = this._element.querySelector('.element__delete-btn');

    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._username;
    this._elementName.textContent = this._username;
    this._setEventListeners();

    return this._element;
  }
}
