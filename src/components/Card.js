class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //Получаем шаблон
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector) // "#add-card-template"
      .content.querySelector(".grid__element")
      .cloneNode(true);
    // console.log(cardElement)
    return cardElement;
  }

  //Генерируем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".grid__image");

    this._element.querySelector(".grid__city").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    // Навешиваем обработчики событий
    this._setEventListeners();

    return this._element;
  }

  //Обработчики событий
  _setEventListeners() {
    this._element
      .querySelector(".grid__heart")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });

    this._element
      .querySelector(".grid__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  //Удаляем карточку по клику на корзину
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  //Делаем активным сердечко-лайк
  _handleLikeButtonClick = (e) => {
    this._element
      .querySelector(".grid__heart")
      .classList.toggle("grid__heart_active");
  };
}

export { Card };
