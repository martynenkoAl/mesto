export default class Card {
  constructor(item, templateSelector, openImage) {
    this._item = item;
    this._link = item.link;
    this._name = item.name;
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

  // слушатели лайка и урны
  _setEventListeners() {
    this._elementLikeBtn.addEventListener('click', () => {
      this._elementLikeBtn.classList.toggle('element__like-btn_active');
    });

    this._elementDeleteBtn.addEventListener('click', () => {
      this._element.remove();
    });

    //лисенер для попапа с картинкой
    this._elementPicture.addEventListener('click', () => {
      this._openImage(this._item);
    });
  }

  // функция создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementPicture = this._element.querySelector('.element__picture');
    this._elementName = this._element.querySelector('.element__name');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementDeleteBtn = this._element.querySelector('.element__delete-btn');

    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._name;
    this._elementName.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
