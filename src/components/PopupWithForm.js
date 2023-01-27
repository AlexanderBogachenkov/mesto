import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(handleFormSubmit, popupSelector) {      
      super(popupSelector);      
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector(".popup__content");
      this._submitButton = this._form.querySelector(".popup__save-button");
      this._inputList = Array.from(this._form.querySelectorAll(".popup__input")
      );
    }

    _getInputValues() {
    //создаем пустой объект
    this._formValues = {};
    //собираем в него значения всех полей из формы, с ключами объекта = атрибутами каждого инпута
    this._inputList.forEach((input) => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._form.reset();
        super.close();
      }
}