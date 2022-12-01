const popup = document.querySelector(".popup"); // Фон попап окна
const popupAddNewPlace = document.querySelector(".popup-add-place"); //Окно добавления нового места
const popupPicturePreview = document.querySelector(".popup-show-image"); //Окно preview picture
const closeAddNewPlaceButton = document.querySelector(".popup-add-place__close-button"); // Кнопка для скрытия окна нового места
const openPopupButton = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
const openPopupAddPlaceButton = document.querySelector(".profile__add-button"); // Кнопки для показа окна
const closePopupButton = document.querySelector(".popup__close-button"); // Кнопка для скрытия окна
const closePopupPicturePreviewButton  = document.querySelector(".popup-show-image__close-button"); // Кнопка для скрытия окна preview picture

// Считываем данные профайла
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Получаем значение полей jobInput и nameInput
const nameInput = document.querySelector(".popup__profile_type_name");
const jobInput = document.querySelector(".popup__profile_type_description");

// Получаем значение полей addPlaceNameInput и addPlaceImgLink
const addPlaceNameInput = document.querySelector(".popup-add-place__type_name");
const addPlaceImgLink = document.querySelector(".popup-add-place_type_src");

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
const formElement = document.querySelector(".popup__content");

//“submit” - addNewPlaceForm
const addNewPlaceForm = document.querySelector(".popup-add-place");

//Куда добавляем
const addGridElement = document.querySelector('.grid');

//<li> шаблон
const addCardTemplate = document.querySelector('#add-card-template').content.querySelector('.grid__element');

// Обработчик «отправки» формы профайла, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popup);
}

// Обработчик «отправки» формы нового места
function addNewPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCards({name: addPlaceNameInput.value, 
               link: addPlaceImgLink.value}, 
               addGridElement);
  closeModal(popupAddNewPlace);
}

// Открываем модальное окно
function openModal(modalName) {
  modalName.classList.add("popup_opened");
}

// Закрываем модальное окно
function closeModal(modalName) {
  modalName.classList.remove("popup_opened");
}



//Слушаем форму профайла - кнопку submit
formElement.addEventListener("submit", formSubmitHandler);

//Слушаем форму добавления нового места - кнопку submit
addNewPlaceForm.addEventListener("submit", addNewPlaceFormSubmitHandler);

// Открываем окно редактирования профайла
  openPopupButton.addEventListener("click", (e) => {
    openModal(popup);    
  // Вставляем данные профайла в попап окно
  document.querySelector(".popup__profile_type_name").value = profileName.textContent;
  document.querySelector(".popup__profile_type_description").value = profileDescription.textContent;
});

//Открываем окно добавления нового места
openPopupAddPlaceButton.addEventListener("click", (e) => {
  openModal(popupAddNewPlace);
});

// Закрываем попап через крестик
closePopupButton.addEventListener("click", () => closeModal(popup));
//Закрываем попап добавления новой карточки через крестик
closeAddNewPlaceButton.addEventListener("click", () => closeModal(popupAddNewPlace));
//Обработчик клика на крестик окна picture preview
closePopupPicturePreviewButton.addEventListener("click", () => closeModal(popupPicturePreview));


//Закрываем если кликнули не в окне
document.addEventListener("click", (e) => {
  if (e.target === popup) {
    closeModal(popup);
  }
  else if (e.target === popupAddNewPlace) {
    closeModal(popupAddNewPlace);
  }
  else if (e.target === popupPicturePreview) {
    closeModal(popupPicturePreview);
  }
});

//закрытие окна по escape
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && popup.classList.contains("popup_opened")) {
    closeModal(popup);   
  }
  else if (e.code === "Escape" && popupAddNewPlace.classList.contains("popup_opened")) {
    closeModal(popupAddNewPlace);   
  }
  else if (e.code === "Escape" && popupPicturePreview.classList.contains("popup_opened")) {
    closeModal(popupPicturePreview);   
  }
});

//Удаляем карточку
const handleDeleteButtonClick = (e) => {
  e.target.closest('.grid__element').remove()    
}

//Делаем активным сердечко-лайк
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('grid__heart_active')
}

//Создаем карточку
function createElement(item) {
  //Используем template шаблон
  const cardTemplate = addCardTemplate.cloneNode(true);
  const cardCity = cardTemplate.querySelector('.grid__city');
  const cardImage = cardTemplate.querySelector('.grid__image');
  const cardLikeButton = cardTemplate.querySelector('.grid__heart')  
  const cardDeleteButton = cardTemplate.querySelector('.grid__delete-button')
  
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick)
  cardLikeButton.addEventListener('click', handleLikeButtonClick)
  cardImage.addEventListener('click', handleImageClick)

  cardCity.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  return cardTemplate;
};



//Вставляем карточку <li> в начало <ul> 
const renderCards = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
}

//Перебераем начальный массив карточек
initialCards.forEach(function(item) {
  renderCards(item, addGridElement);    
});

//Нажатие на изображение карточки
function handleImageClick() {
//Картинка для попапа
const popupImage = document.querySelectorAll(".grid__image");

//Открываем окно preview picture
popupImage.forEach((elem)=>{
  elem.addEventListener('click',(e)=>{
    document.querySelector(".popup__image").src = elem.src;
    document.querySelector(".popup__image").alt = elem.alt;
    document.querySelector(".popup__image-name").textContent = elem.alt;
 
    openModal(popupPicturePreview);    
  })
});
}

