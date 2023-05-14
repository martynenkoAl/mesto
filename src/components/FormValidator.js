export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelector = config.errorSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorTextClass = config.errorTextClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

 // показать ошибку
  _showInputError(errorClass, input) {
    input.classList.add(this._inputErrorClass);
    errorClass.textContent = input.validationMessage;
    errorClass.classList.add(this._errorTextClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(errorClass, input) {
    input.classList.remove(this._inputErrorClass);
    errorClass.classList.remove(this._errorTextClass);
    errorClass.textContent = '';
  }

  // активировать кнопку
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  // деактивировать кнопку
  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  // изменить состояние кнопки
  _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._enableButton();
      } else {
        this._disableButton();
      }
    }

  // проверить валидность инпутов
  _isValid (input) {
    const errorClass = this._form.querySelector(`${this._errorSelector}${input.name}`);
    if (!input.validity.valid) {
      this._showInputError(errorClass, input);
    } else {
      this._hideInputError(errorClass, input);
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).every(input => input.validity.valid);
  }

  // навесить слушатели
  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListener();
  }


  // сброс
  resetErrors() {
    this._inputList.forEach(input => {
      const errorClass = this._form.querySelector(`${this._errorSelector}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError(errorClass, input);
      }
    })
    this._disableButton();
  }
}
