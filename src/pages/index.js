import "./index.css"; // добавьте импорт главного файла стилей
import { Card } from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import config from "../scripts/config.js";

const popupEditProfile = document.querySelector(".popup-edit-profile"); // Попап редактирования профайла
const popupAddNewPlace = document.querySelector(".popup-add-place"); //Окно добавления нового места
const popupPicturePreview = document.querySelector(".popup-show-image"); //Окно preview picture
const buttonOpenPopupAddPlace = document.querySelector(".profile__add-button"); // Кнопка открытия добавления нового места
const buttonOpenPopupEditProfile = document.querySelector(
  ".profile__edit-button"
); // Кнопка для показа окна редактирования профайла
const popupProfileName = document.querySelector(".popup__profile_type_name"); // Считываем данные профайла из попапа - имя
const popupProfileDescription = document.querySelector(
  ".popup__profile_type_description"
); // Считываем данные профайла из попапа - описание

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка» edit profile
const popupProfileEditForm = document.querySelector(
  ".popup__content_profile_form"
);

const popupTypeDelete = document.querySelector(".popup-type-delete");
const popupAvatarForm = document.querySelector(".popup_type_avatar-form");
const popupAvatarFormInput = document.querySelector(
  ".popup__content_type_avatar"
);

// Новая 9ая ПР
//////////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59/",
  headers: {
    authorization: "8b85f1f7-8fcc-4b0e-a737-149d0d1061a5",
    "Content-Type": "application/json",
  },
});

// Общий промис
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userServerData, cardsData]) => {
    userInfo.setUserInfo(userServerData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик отправки формы профайла
const editProfileFormSubmitHandler = (formValues) => {
  //Добавим изменение в тексте кнопки
  popupProfailEditForm.renderLoading(true);
  api
    .changeUserData(formValues)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfailEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //Добавим изменение в тексте кнопки
      popupProfailEditForm.renderLoading(false);
    });
};

// Обработчик «отправки» формы нового места
const addNewPlaceFormSubmitHandler = (formValues) => {
  popupWithEditForm.renderLoading(true);
  api
    .addCard(formValues)
    .then((res) => {
      cardsList.addItem(createCard(res));
      popupWithEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //Добавим изменение в тексте кнопки
      popupWithEditForm.renderLoading(false);
    });
};

const handleLikeClick = (card) => {
  if (card.hasMyLike) {
    api
      .deleteLikeFromCard(card.cardId)
      .then((res) => {
        card.deleteMyLike(res.likes.length);
        card._handleLikeButtonClick();
        card.hasMyLike = !card.hasMyLike;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLikeToCard(card.cardId)
      .then((res) => {
        card.addMyLike(res.likes.length);
        card._handleLikeButtonClick();
        card.hasMyLike = !card.hasMyLike;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const handleTrashBinClick = (card) => {
  popupWithDeleteVerification.open(card);
};

// //создадим экземпляр класса попапа с подтверждением удаления + слушатели
const popupWithDeleteVerification = new PopupWithConfirmation(
  popupTypeDelete,
  handleRemoveSubmit
);

popupWithDeleteVerification.setEventListeners();

//что происходит при нажатии на кнопку да в попапе подтверждения удаления
function handleRemoveSubmit(card) {
  popupWithDeleteVerification.renderLoading(true);
  //  console.log(card)
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.removeCardFromServer();
      popupWithDeleteVerification.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithDeleteVerification.renderLoading(false);
    });
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
  popupProfileEditFormValidator.removeErrors();
  popupProfileEditFormValidator.disableSubmitButton();
  popupProfailEditForm.open();
});

//Открываем окно добавления нового места
buttonOpenPopupAddPlace.addEventListener("click", () => {
  popupWithEditForm.open(popupAddNewPlace);
  popupAddNewPlaceValidator.removeErrors();
  popupAddNewPlaceValidator.disableSubmitButton();
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

const createCard = (data) => {
  // Создаём экземпляр карточки
  const card = new Card(
    data,
    "#add-card-template",
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    userInfo.getMyId()
  );

  // Создаём карточку и возвращаем
  const cardElement = card.generateCard();
  return cardElement;
};

// Перебераем начальный массив карточек
const cardsList = new Section(
  {
    renderer: createCard,
  },
  // gridElementAdd так нельзя. Передаем уже найденный по селетору элемент, а не селектор
  ".grid"
);

//создаем экземпляр класса, который отображает информацию о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__picture",
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

//создадим экземпляр класса попапа с формой для смены аватара + слушатели
const popupWithAvatarForm = new PopupWithForm(
  handleAvatarFormSubmit,
  popupAvatarForm //".popup_type_avatar-form"
);
popupWithAvatarForm.setEventListeners();

const popupAvatarUpdateValidator = new FormValidator(
  config,
  popupAvatarFormInput
);

popupAvatarUpdateValidator.enableValidation();
popupAvatarUpdateValidator.disableSubmitButton();

//при клике на кнопку сохранить, аватар отправится на сервер
function handleAvatarFormSubmit(avatar) {
  popupWithAvatarForm.renderLoading(true);
  api
    .changeAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
    });
}

//слушатель клика на аватарку
document
  .querySelector(".profile__avatar-button")
  .addEventListener("click", () => {
    popupWithAvatarForm.open();
    popupAvatarUpdateValidator.disableSubmitButton();
  });
