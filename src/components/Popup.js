export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;

        // console.log(this._popup)
        
        this._handleEscClose = this._handleEscClose.bind(this)
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
          }
    }

    //закрытие по клику на оверлей
    handleCloseOnOverlay(e) {
    if (e.target.classList.contains("popup")) {
      this.close();
    }
    }

    setEventListeners() {
    this._popup.addEventListener("click", (e) => {
    this.handleCloseOnOverlay(e);
    });
    }
}

