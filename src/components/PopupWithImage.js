import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPlacename = this._popup.querySelector('.popup__placename');
  }
  open = (item) => {
    this._popupPhoto.src = item.link;
    this._popupPhoto.alt = item.name;
    this._popupPlacename.textContent = item.name;

    super.open()
  }
}
