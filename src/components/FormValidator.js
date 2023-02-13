class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(input, errorMessage) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    error.textContent = "";
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  //Проверка валидности в инпуте
  _checkInputValidity(input) {
    // const error = document.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      //remove error;
      this._hideInputError(input);
    } else {
      // show error;
      this._showInputError(input, input.validationMessage);
    }
  }

  //Для каждого инпута
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        //Вызываем валидацию на текущем инпуте
        this._checkInputValidity(input);
        //Переключаем кнопку сохранения
        this._toggleSaveButton(this._inputs, this._submitButton);
      });
    });
  }

  //Создаём функцию запуска валидации
  enableValidation() {
    this._setEventListeners();
  }

  // Переключаем кнопку сохранить в inactive
  _toggleSaveButton = (inputs, button) => {
    const isFormValid = inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = "";
    } else {
      this.disableSubmitButton();
      // button.classList.add(this._inactiveButtonClass);
      // button.disabled = "disabled";
    }
  };

  disableSubmitButton() {
    // делаем неактивной кнопку после submit
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  //Обнуляем ошибки при открытия окна
  removeErrors() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export { FormValidator };
