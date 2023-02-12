import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
   
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__delete-container");
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._permanentText = this._submitButton.textContent;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  }
}
