const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorTextClass: 'popup__text-error_active'
};

enableValidation(obj)

function enableValidation ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorTextClass }) {
  const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    errorClass.textContent = errorMessage;
    errorClass.classList.add(errorTextClass);
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formSelector, inputSelector) => {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    errorClass.classList.remove(errorTextClass);
    errorClass.textContent = '';
  };
  // Функция, которая проверяет валидность поля
  const isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formSelector, inputSelector);
    }
  };


  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {

      return !inputSelector.validity.valid;
    })
  };

  const toggleButtonState = (inputList, submitButtonSelector) => {
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      submitButtonSelector.classList.add(inactiveButtonClass);
      submitButtonSelector.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      submitButtonSelector.classList.remove(inactiveButtonClass);
      submitButtonSelector.removeAttribute('disabled');
    }
  };


  const setEventListeners = function (formSelector) {
    // Находим все поля внутри формы
     const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
    // Находим кнопку отправки
    const submitButtonSelector = formSelector.querySelector('.popup__submit-btn');

    toggleButtonState(inputList, submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
      // каждому полю добавим обработчик события input
      inputSelector.addEventListener('input', function () {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formSelector, inputSelector);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, submitButtonSelector);
      });
    });
  };

  // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });



    setEventListeners(formSelector);
  });
};


