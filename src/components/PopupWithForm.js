import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupElement) {
    super(popupElement);
    // console.log(this._popup)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__content");
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._permanentText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    //создаем пустой объект
    this._formValues = {};
    //собираем в него значения всех полей из формы, с ключами объекта = атрибутами каждого инпута
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //метод изменения состояния кнопки сохранения
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }

  close() {
    this._form.reset();
    super.close();
    // console.log('Close?')
  }
}
