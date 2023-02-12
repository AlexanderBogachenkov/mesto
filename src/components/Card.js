class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    myId
  ) {
    // console.log(data.likes.length)
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes.length;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashBinClick = handleTrashBinClick;
    this._handleLikeClick = handleLikeClick,
    this.cardId = data._id;
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

    this._element.querySelector(".grid__city").textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".grid__like-counter").textContent =
      this._likeCounter;

    // Навешиваем обработчики событий
    this._setEventListeners();


    //Есть ли мои лайки
    this.hasMyLike = this._likes.some((like) => like._id === this._myId);

    //Есть мой лайк?
    //то при отрисовке мы отрисуем этот лайк черным
    if (this._likes.some((like) => like._id === this._myId)) {
      this._element.querySelector(".grid__heart").classList.add("grid__heart_active");
    }


    //если id карты не совпадает с моим, то удаляем корзинку
    if (this._ownerId != this._myId) {
      this._deleteButton.remove();
    }
    // console.log(this._deleteButton)
    // console.log('this._ownerId -->', this._ownerId, 'this._myId-->', this._myId )
    



this._element.querySelector(".grid__heart").addEventListener("click", () => 
{this._handleLikeClick(this)});

    
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
        // this._handleDeleteButtonClick();
        this._handleTrashBinClick(this);
      });

    this._element
      .querySelector(".grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

    //метод удаления лайка
    deleteMyLike(newNumbersOfLikes) {
      this._element
      .querySelector(".grid__heart").classList.remove("place__like_active");
      this._element.querySelector(".grid__like-counter").textContent = newNumbersOfLikes; 
      
    }
  
    //метод добавления лайка
    addMyLike(newNumbersOfLikes) {
      this._element
      .querySelector(".grid__heart").classList.add("place__like_active");
      this._element.querySelector(".grid__like-counter").textContent = newNumbersOfLikes;
    }


  //Удаляем карточку по клику на корзину
  removeCardFromServer() {
    this._element.remove();
    this._element = null;
  }

  //Делаем активным сердечко-лайк
  _handleLikeButtonClick = (e) => {
    this._element
      .querySelector(".grid__heart")
      .classList.toggle("grid__heart_active");
  };

  isCardMy() { 
  // const isCardMy = this._likes.some(like => like.owner === this._userId)
  // return isCardMy;
  console.log(this._likes)
  }

  
}

export { Card };
