class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    myId
  ) {
    
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes.length;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBinClick = handleTrashBinClick;
    (this._handleLikeClick = handleLikeClick), (this.cardId = data._id);
    this._myId = myId;
    this._ownerId = data.owner._id;

    // console.log(this.cardId)
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
    this._deleteButton = this._element.querySelector(".grid__delete-button");
    this._likeButton = this._element.querySelector(".grid__heart");
    this._likeCounterNumber = this._element.querySelector(
      ".grid__like-counter"
    );

    this._element.querySelector(".grid__city").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._likeCounterNumber.textContent = this._likeCounter;

    // Навешиваем обработчики событий
    this._setEventListeners();

    //Есть ли мои лайки
    this.hasMyLike = this._likes.some((like) => like._id === this._myId);

    //Есть мой лайк?
    //то при отрисовке мы отрисуем этот лайк черным
    if (this._likes.some((like) => like._id === this._myId)) {
      this._likeButton.classList.add("grid__heart_active");
    }

    //если id карты не совпадает с моим, то удаляем корзинку
    if (this._ownerId != this._myId) {
      this._deleteButton.remove();
    }



    return this._element;
  }

  //Обработчики событий
  _setEventListeners() {

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
      // this._handleLikeButtonClick(); перенесли в index.js после .then
    });

      this._deleteButton.addEventListener("click", () => {
      this._handleTrashBinClick(this);
    });

      this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //метод удаления лайка
  deleteMyLike(newNumbersOfLikes) {
    this._likeButton.classList.remove("place__like_active");
    this._likeCounterNumber.textContent = newNumbersOfLikes;
  }

  //метод добавления лайка
  addMyLike(newNumbersOfLikes) {
    this._likeButton.classList.add("place__like_active");
    this._likeCounterNumber.textContent = newNumbersOfLikes;
  }

  //Удаляем карточку по клику на корзину
  removeCardFromServer() {
    this._element.remove();
    this._element = null;
  }

  //Делаем активным сердечко-лайк
  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle("grid__heart_active");
  };
}

export { Card };
