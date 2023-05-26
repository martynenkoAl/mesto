export default class Card {
  constructor(item, templateSelector, openImage, confirmDelete, changeLikeStatus) {
    this._item = item;
    this._link = item.link;
    this._username = item.name;
    this._myid = item.myid;
    this._ownerid = item.owner._id;
    this._cardId = item._id;
    this._likes = item.likes;
    this._likesNumber = item.likes.length;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
    this._confirmDelete = confirmDelete;
    this._changeLikeStatus = changeLikeStatus;
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
    this._changeLikeStatus(this._elementLikeBtn, this._cardId);
  }

  // удалить карточку
  _handleDeleteCard = () => {
    this._confirmDelete({element: this, cardId: this._cardId});
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


  // функция отображения мусорки
    _showDeleteButton() {
      if (this._myid !== this._ownerid) {
        this._elementDeleteBtn.remove();
      }
    }

    // функции для лайков
    _checkLikes() {
      const myLike = this._likes.find(user => user._id === this._myid);
      if(myLike !== undefined) {
        this._elementLikeBtn.classList.add('element__like-btn_active');
      }
      this._likesCounter.textContent = this._likesNumber;
    }

    isLiked() {
      return this._elementLikeBtn.classList.contains('element__like-btn_active');
    }


  changeLikeColor(likes) {
    this._elementLikeBtn.classList.toggle('element__like-btn_active');
    this._likesCounter.textContent = likes.length;
  }

  //функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // функция создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._elementPicture = this._element.querySelector('.element__picture');
    this._elementName = this._element.querySelector('.element__name');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementDeleteBtn = this._element.querySelector('.element__delete-btn');
    this._likesCounter = this._element.querySelector('.element__likescount');

    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._username;
    this._elementName.textContent = this._username;

    this._showDeleteButton();
    this._checkLikes();
    this._setEventListeners();

    return this._element;
  }
}
