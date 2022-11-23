const popup = document.querySelector(".popup"); // Фон попап окна
const openPopupButton = document.querySelector(".profile__edit-button"); // Кнопки для показа окна
const closePopupButton = document.querySelector(".popup__close-button"); // Кнопка для скрытия окна

// Считываем данные профайла
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Получаем значение полей jobInput и nameInput
const nameInput = document.querySelector(".popup__profile_type_name");
const jobInput = document.querySelector(".popup__profile_type_description");


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
const formElement = document.querySelector(".popup__content");


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {

  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}



// Закрываем окно
function closeModal() {
  popup.classList.remove("popup_opened");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}



//Слушаем форму - кнопку submit
formElement.addEventListener("submit", formSubmitHandler);



// Открываем окно редактирования профайлы
  openPopupButton.addEventListener("click", (e) => {
  popup.classList.add("popup_opened");

  // Вставляем данные профайла в попап окно
  document.querySelector(".popup__profile_type_name").value = profileName.textContent;
  document.querySelector(".popup__profile_type_description").value = profileDescription.textContent;


  // Не скролим при 320px  
  if (window.innerWidth > 320) {
    document.body.style.paddingRight =
      window.innerWidth - document.querySelector(".page").offsetWidth + "px";
  }

  document.body.style.overflow = "hidden";
});


// Закрываем попап через крестик
closePopupButton.addEventListener("click", closeModal);
document.addEventListener("click", (e) => {
  if (e.target === popup) {
    closeModal();
  }
});



//закрытие окна по escape
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && popup.classList.contains("popup_opened")) {
    closeModal();
  }
});




