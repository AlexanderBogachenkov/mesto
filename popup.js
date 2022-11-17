let popup = document.querySelector('.popup'); // Фон попап окна
let popup__container = document.querySelector('.popup__container'); // Само окно
let openPopupButtons = document.querySelectorAll('.profail__open-button'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна



openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popup__container.classList.add('popup_opened'); // Добавляем класс 'active' для фона
        popup.classList.add('popup_opened'); // И для самого окна        
        // document.body.style.marginRight = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
        document.body.style.paddingRight = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

        
        // console.log("window.innerWidth " + window.innerWidth);
        // console.log("document.querySelector('.page').offsetWidth " + document.querySelector('.page').offsetWidth);
        
        // console.log(document.body.style.marginRight);

        document.body.style.overflow = 'hidden';
    })
});


function closeModal () {
    popup.classList.remove('popup_opened'); // Убираем активный класс с фона
    popup__container.classList.remove('popup_opened'); // И с окна
    document.body.style.overflow = '';
    // document.body.style.marginRight = '';
    document.body.style.paddingRight = '';
};

closePopupButton.addEventListener('click', closeModal); // Вешаем обработчик на крестик


document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    // console.log(e.target);
    if(e.target === popup) { // Если цель клика - фон, то:
        
        closeModal();        
    }
});

document.addEventListener("keydown", (e) => {
     //закрытие окна по escape
     if (e.code === "Escape" && popup.classList.contains('popup_opened')) {
        closeModal();

        // e.preventDefault();
        // popupBg.classList.remove('active'); // Убираем активный класс с фона
        // popup.classList.remove('active'); // И с окна
        // return;
    }
});   


let profail__name = document.querySelector('.profail__name').innerHTML; 
let profail__description = document.querySelector('.profail__description').innerHTML; 

document.querySelector('.popup__profail-name').value = profail__name;
document.querySelector('.popup__profail-description').value = profail__description;



function ChangeOnPage(){
    
    // console.log('func');

    var new_profail__name = document.querySelector('.popup__profail-name').value; 
    var new_profail__description = document.querySelector('.popup__profail-description').value; 

    // console.log(new_profail__name);
    // e.preventDefault();
    // max 18 symbols
    document.querySelector('.profail__name').innerHTML = new_profail__name;
    document.querySelector('.profail__description').innerHTML = new_profail__description;
    closeModal();
    console.log('Send form data');
    console.log('new_profail__name ' + new_profail__name);
    console.log('new_profail__description ' + new_profail__description);

    // formSubmitHandler();

};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    // evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    // console.log('Send form data');
    // console.log('new_profail__name' + new_profail__name);
    // console.log('new_profail__name' + new_profail__description);
    
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
let formElement = document.querySelector('.popup__content');
formElement.addEventListener('submit', formSubmitHandler); 


   


