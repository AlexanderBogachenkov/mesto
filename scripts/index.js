const popup = document.querySelector(".popup"); // Общий класс попапа
const popupEditProfail = document.querySelector(".popup-edit-profail"); // Попап редактирования профайла
const popupAddNewPlace = document.querySelector(".popup-add-place"); //Окно добавления нового места
const popupPicturePreview = document.querySelector(".popup-show-image"); //Окно preview picture
const closeAddNewPlaceButton = document.querySelector(
  ".popup-add-place__close-button"
); // Кнопка для скрытия окна нового места
const openPopupEditProfailButton = document.querySelector(".profile__edit-button"); // Кнопка для показа окна редактирования профайла
const openPopupAddPlaceButton = document.querySelector(".profile__add-button"); // Кнопки для показа окна
const closePopupEditProfailButton = document.querySelector(".popup__close-button"); // Кнопка для скрытия окна редактирования профайла
const closePopupPicturePreviewButton = document.querySelector(
  ".popup-show-image__close-button"
); // Кнопка для скрытия окна preview picture

// Считываем данные профайла
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Считываем данные профайла из попапа
const popupProfileName = document.querySelector(".popup__profile_type_name");
const popupProfileDescription = document.querySelector(".popup__profile_type_description");

// Получаем значение полей jobInput и nameInput
const nameInput = document.querySelector(".popup__profile_type_name");
const jobInput = document.querySelector(".popup__profile_type_description");



// Получаем значение полей addPlaceNameInput и addPlaceImgLink
const addPlaceNameInput = document.querySelector(".popup-add-place__type_name");
const addPlaceImgLink = document.querySelector(".popup-add-place_type_src");

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» edit profail
const popupProfailEditForm = document.querySelector(".popup__content_profail_form");

//“submit” - addNewPlaceForm
const addNewPlaceForm = document.querySelector(".popup-add-place");

//Куда добавляем
const addGridElement = document.querySelector(".grid");

//<li> шаблон
const addCardTemplate = document
  .querySelector("#add-card-template")
  .content.querySelector(".grid__element");

// Обработчик «отправки» формы профайла, хотя пока
// она никуда отправляться не будет
function editProfailformSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfail);
}

// Обработчик «отправки» формы нового места
function addNewPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(
    { name: addPlaceNameInput.value, link: addPlaceImgLink.value },
    addGridElement
  );
  closeModal(popupAddNewPlace);
}

// Открываем модальное окно
function openModal(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
}

// Закрываем модальное окно
function closeModal(popupToClose) {
  popupToClose.classList.remove("popup_opened");
}

//Слушаем форму профайла - кнопку submit edit profail
popupProfailEditForm.addEventListener("submit", editProfailformSubmitHandler);

//Слушаем форму добавления нового места - кнопку submit
addNewPlaceForm.addEventListener("submit", addNewPlaceFormSubmitHandler);

// Открываем окно редактирования профайла
openPopupEditProfailButton.addEventListener("click", () => {   
openModal(popupEditProfail);

// Вставляем данные профайла в попап окно
popupProfileName.value = profileName.textContent;
popupProfileDescription.value = profileDescription.textContent;
});

//Открываем окно добавления нового места
openPopupAddPlaceButton.addEventListener("click", () => {
openModal(popupAddNewPlace);
  

});

// Закрываем попап редактирования профайла через крестик
closePopupEditProfailButton.addEventListener("click", () => closeModal(popupEditProfail));
//Закрываем попап добавления новой карточки через крестик
closeAddNewPlaceButton.addEventListener("click", () => closeModal(popupAddNewPlace)
);
//Обработчик клика на крестик окна picture preview
closePopupPicturePreviewButton.addEventListener("click", () => closeModal(popupPicturePreview)
);

//Закрываем если кликнули не в окне
document.addEventListener("click", (e) => {
  if (e.currentTarget !== popup) {  
    closeModal(e.target);
   } 
});


//закрытие окна по escape
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    if(popupEditProfail.classList.contains("popup_opened")) {closeModal(popupEditProfail);}
    if(popupAddNewPlace.classList.contains("popup_opened")) {closeModal(popupAddNewPlace);}
    if(popupPicturePreview.classList.contains("popup_opened")) {closeModal(popupPicturePreview);}
  } 

});

//Удаляем карточку
const handleDeleteButtonClick = (e) => {
  e.target.closest(".grid__element").remove();
};

//Делаем активным сердечко-лайк
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle("grid__heart_active");
};

//Создаем карточку
function createElement(item) {
  //Используем template шаблон
  const cardTemplate = addCardTemplate.cloneNode(true);
  const cardCity = cardTemplate.querySelector(".grid__city");
  const cardImage = cardTemplate.querySelector(".grid__image");
  const cardLikeButton = cardTemplate.querySelector(".grid__heart");
  const cardDeleteButton = cardTemplate.querySelector(".grid__delete-button");

  //Нажатие на крестик закрытия
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);

  //Нажатие на сердечко лайк
  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  

  //Нажатие на изображение карточки
    cardImage.addEventListener("click", (e) => {

      const popupImageName = e.target.alt;
      const popupImageSrc = e.target.src;

    document.querySelector(".popup__image").src = popupImageSrc;
    document.querySelector(".popup__image").alt = popupImageName;
    document.querySelector(".popup__image-name").textContent = popupImageName;
    

    openModal(popupPicturePreview);
  });

  //Имя места, src image, alt image
  cardCity.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  return cardTemplate;
}



//Вставляем карточку <li> в начало <ul>
const renderCard = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
};

//Перебераем начальный массив карточек
initialCards.forEach(function (item) {
  renderCard(item, addGridElement);
});


