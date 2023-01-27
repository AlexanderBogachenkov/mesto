import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement); 
    this._image = this._popup.querySelector(".popup__image");    
    this._title = this._popup.querySelector(".popup__image-name");
  }
  
  //перезаписывает родительский метод открытия, 
  //чтобы в попап вставлялась картинка и подпись
  open(name, link) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;
    super.open();
  }
}