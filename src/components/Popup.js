export default class Popup {
  constructor(popupElement) {
    // console.log(popupElement)
    this._popup = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
      // console.log('ESC')
    }
  }

  //закрытие по клику на оверлей
  handleCloseOnOverlay(e) {
    if (
        e.target.classList.contains("popup") || 
        e.target.classList.contains("popup__close-button")
       ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      this.handleCloseOnOverlay(e);
    });
  }
}

