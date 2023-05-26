import Popup from "./Popup.js";

export default class PopupConfirmForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm({element: this._element, cardId: this._cardId})
    })
  }

  open = ({element, cardId}) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}

