import "./index.css"; // добавьте импорт главного файла стилей
import { Card } from "../components/Card.js";
import { initialCards } from "../scripts/initialCards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import config from "../scripts/config.js";

const popupEditProfile = document.querySelector(".popup-edit-profile"); // Попап редактирования профайла
const popupAddNewPlace = document.querySelector(".popup-add-place"); //Окно добавления нового места
const popupPicturePreview = document.querySelector(".popup-show-image"); //Окно preview picture
const buttonOpenPopupAddPlace = document.querySelector(".profile__add-button"); // Кнопка открытия добавления нового места
const buttonOpenPopupEditProfile = document.querySelector(".profile__edit-button"); // Кнопка для показа окна редактирования профайла
const profileName = document.querySelector(".profile__name"); // Считываем данные профайла - имя
const profileDescription = document.querySelector(".profile__description"); // Считываем данные профайла - описание
const popupProfileName = document.querySelector(".popup__profile_type_name"); // Считываем данные профайла из попапа - имя
const popupProfileDescription = document.querySelector(".popup__profile_type_description"); // Считываем данные профайла из попапа - описание
const jobInput = document.querySelector(".popup__profile_type_description"); // Получаем значение полей jobInput
const nameInput = document.querySelector(".popup__profile_type_name"); // Получаем значение полей nameInput
const inputAddPlaceName = document.querySelector(".popup-add-place__type_name"); // Получаем значение полей inputAddPlaceName
const placeImgLinkAdd = document.querySelector(".popup-add-place__type_src"); // Получаем значение полей placeImgLinkAdd
// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка» edit profile
const popupProfileEditForm = document.querySelector(".popup__content_profile_form");
const gridElementAdd = document.querySelector(".grid"); //Куда добавляем
// Обработчик «отправки» формы профайла, хотя пока она никуда отправляться не будет
function editProfileFormSubmitHandler() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupProfailEditForm.close();
}

// Обработчик «отправки» формы нового места
function addNewPlaceFormSubmitHandler() {
  createElement(
    { name: inputAddPlaceName.value, link: placeImgLinkAdd.value },
    gridElementAdd
  );
  popupWithEditForm.close(popupAddNewPlace);
  popupAddNewPlaceValidator.disableSubmitButton();
}

// Открываем окно редактирования профайла
const popupProfailEditForm = new PopupWithForm(
  editProfileFormSubmitHandler,
  popupEditProfile
);
popupProfailEditForm.setEventListeners();

// Открываем окно редактирования профайла
buttonOpenPopupEditProfile.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();

  // Вставляем данные профайла в попап окно
  popupProfileName.value = name; //profileName.textContent;
  popupProfileDescription.value = about; //profileDescription.textContent;
  popupProfileEditFormValidator.restartError();
  popupProfailEditForm.open();
});

//Открываем окно добавления нового места
buttonOpenPopupAddPlace.addEventListener("click", () => {
  popupWithEditForm.open(popupAddNewPlace);
  popupAddNewPlaceValidator.restartError();
});

const cardImagePopup = new PopupWithImage(popupPicturePreview);
cardImagePopup.setEventListeners();

// Делаем активным картинку превью
const handleCardClick = (name, link) => {
  cardImagePopup.open(name, link);
};

//создадим экземпляр класса попапа с формой для редактирования профиля + слушатели
const popupWithEditForm = new PopupWithForm(
  addNewPlaceFormSubmitHandler,
  popupAddNewPlace
);
popupWithEditForm.setEventListeners();

const createCard = (item) => {
  // Создаём экземпляр карточки
  const card = new Card(item, "#add-card-template", handleCardClick);
  // Создаём карточку и возвращаем
  const cardElement = card.generateCard();
  return cardElement;
}

//Создаем карточку
const createElement = (item, wrapElement) => {
  wrapElement.prepend(createCard(item));
};

// Перебераем начальный массив карточек
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  ".grid"
);
cardsList.renderItems();

//создаем экземпляр класса, который отображает информацию о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
});

//Запускаем валидацию на форму из попапа профиля
const popupProfileEditFormValidator = new FormValidator(
  config,
  popupProfileEditForm
);
// console.log(popupProfileEditForm)
popupProfileEditFormValidator.enableValidation();

//Запускаем валидацию на форму из попапа добавления карточки
const popupAddNewPlaceValidator = new FormValidator(config, popupAddNewPlace);
popupAddNewPlaceValidator.enableValidation();
