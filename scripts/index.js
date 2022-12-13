// Попап редактирования профайла
const popupEditProfile = document.querySelector(".popup-edit-profile");

//Окно добавления нового места
const popupAddNewPlace = document.querySelector(".popup-add-place");

//Окно preview picture
const popupPicturePreview = document.querySelector(".popup-show-image");
const cardToShow = document.querySelector(".popup__image");
const cardName = document.querySelector(".popup__image-name");

// Кнопка для скрытия окна нового места
const buttonClosePopupCard = document.querySelector(
  ".popup-add-place__close-button"
);

// Кнопка для показа окна редактирования профайла
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__edit-button"
);

// Кнопки для показа окна
const buttonOpenPopupAddPlace = document.querySelector(".profile__add-button");

// Кнопка для скрытия окна редактирования профайла
const buttonClosePopupEditProfile = document.querySelector(
  ".popup__close-button"
);

// Кнопка для скрытия окна preview picture
const buttonClosePopupPicturePreview = document.querySelector(
  ".popup-show-image__close-button"
);

// Считываем данные профайла
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Считываем данные профайла из попапа
const popupProfileName = document.querySelector(".popup__profile_type_name");
const popupProfileDescription = document.querySelector(
  ".popup__profile_type_description"
);

// Получаем значение полей jobInput и nameInput
const nameInput = document.querySelector(".popup__profile_type_name");
const jobInput = document.querySelector(".popup__profile_type_description");

// Получаем значение полей inputAddPlaceName и placeImgLinkAdd
const inputAddPlaceName = document.querySelector(".popup-add-place__type_name");
const placeImgLinkAdd = document.querySelector(".popup-add-place__type_src");

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка» edit profile
const popupProfileEditForm = document.querySelector(
  ".popup__content_profile_form"
);

//“submit” - formAddNewPlace
const formAddNewPlace = document.querySelector(".popup-add-place");

//Куда добавляем
const gridElementAdd = document.querySelector(".grid");

//<li> шаблон
const cardTemplateAdd = document
  .querySelector("#add-card-template")
  .content.querySelector(".grid__element");

// Обработчик «отправки» формы профайла, хотя пока
// она никуда отправляться не будет
function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Обработчик «отправки» формы нового места
function addNewPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(
    { name: inputAddPlaceName.value, 
      link: placeImgLinkAdd.value },
      gridElementAdd
  );

  closePopup(popupAddNewPlace);

  // Очищаем инпуты формы нового места
  inputAddPlaceName.value = "";
  placeImgLinkAdd.value = "";

}

// Закрываем модальное окно на Escape
let openModal;

const handleKeyDown = (e) => {
  if (e.key === "Escape") {
    closePopup(openModal);
  }
};


//Обнуляем ошибки при открытия окна
function restartError(popupToOpen) {
  const inputArray = Array.from(popupToOpen.querySelectorAll('.popup__input'));
  inputArray.forEach((inputElement) => { 
  const errorElement = popupToOpen.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
})
}


// Открываем модальное окно
function openPopup(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
  openModal = popupToOpen;
  document.addEventListener("keydown", handleKeyDown);
  
  restartError(popupToOpen);
  
}

// Закрываем модальное окно
function closePopup(popupToClose) {
  popupToClose.classList.remove("popup_opened");
  openModal = null;
  document.removeEventListener("keydown", handleKeyDown);
}

//Слушаем форму профайла - кнопку submit edit profile
popupProfileEditForm.addEventListener("submit", editProfileFormSubmitHandler);

//Слушаем форму добавления нового места - кнопку submit
formAddNewPlace.addEventListener("submit", addNewPlaceFormSubmitHandler);




// Открываем окно редактирования профайла
buttonOpenPopupEditProfile.addEventListener("click", () => {
  
openPopup(popupEditProfile);


  
  // Вставляем данные профайла в попап окно
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  


});

//Открываем окно добавления нового места
buttonOpenPopupAddPlace.addEventListener("click", () => {
  openPopup(popupAddNewPlace);
});

// Закрываем попап редактирования профайла через крестик
buttonClosePopupEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile)
});


//Закрываем попап добавления новой карточки через крестик
buttonClosePopupCard.addEventListener("click", () =>
  closePopup(popupAddNewPlace)
);
//Обработчик клика на крестик окна picture preview
buttonClosePopupPicturePreview.addEventListener("click", () =>
  closePopup(popupPicturePreview)
);

//Закрываем если кликнули не в окне

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
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


//Делаем активным картинку превью
const handleCardImageClick = (e) => {
  const popupImageName = e.target.alt;
  const popupImageSrc = e.target.src;

  cardToShow.src = popupImageSrc;
  cardToShow.alt = popupImageName;
  cardName.textContent = popupImageName;

  openPopup(popupPicturePreview);
};


//Создаем карточку
function createElement(item) {
  //Используем template шаблон
  const cardTemplate = cardTemplateAdd.cloneNode(true);
  const cardCity = cardTemplate.querySelector(".grid__city");
  const cardImage = cardTemplate.querySelector(".grid__image");
  const cardLikeButton = cardTemplate.querySelector(".grid__heart");
  const cardDeleteButton = cardTemplate.querySelector(".grid__delete-button");

  //Нажатие на крестик закрытия
  cardDeleteButton.addEventListener("click", handleDeleteButtonClick);

  //Нажатие на сердечко лайк
  cardLikeButton.addEventListener("click", handleLikeButtonClick);

  //Нажатие на изображение карточки
  cardImage.addEventListener("click", handleCardImageClick);
    

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
  renderCard(item, gridElementAdd);
});
