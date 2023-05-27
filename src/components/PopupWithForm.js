import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__text'));
    this._submitBtn = this._form.querySelector('.popup__submit-btn');
    this._buttonText = this._submitBtn.textContent;
  }
  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => this._values[input.name] = input.value);
    return this._values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => input.value = data[input.name]);
  }

  _setLoadingText() {
    if(this._submitBtn.textContent.includes('Сохра')) {
      this._submitBtn.textContent = 'Сохранение...';
    } else if(this._submitBtn.textContent.includes('Созда')) {
      this._submitBtn.textContent = 'Создание...';
  }
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._setLoadingText()
      this._submitForm(this._getInputValues())
    })
  }

  setButtonText() {
    this._submitBtn.textContent = this._buttonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
