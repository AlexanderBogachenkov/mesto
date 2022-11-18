const popup = document.querySelector('.popup'); // Фон попап окна
const openPopupButton = document.querySelector('.edit-button'); // Кнопки для показа окна
const closePopupButton = document.querySelector('.popup__close-button'); // Кнопка для скрытия окна

const profailName = document.querySelector('.profail__name').innerHTML; 
const profailDescription = document.querySelector('.profail__description').innerHTML; 

document.querySelector('.popup__profail_name').value = profailName;
document.querySelector('.popup__profail_description').value = profailDescription;



function closeModal () {
    //В брифе написано - Чтобы закрыть попап, 
    //удаляйте у него модификатор popup_opened

    popup.classList.remove('popup_opened');  
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();  


    // Получите значение полей jobInput и nameInput из свойства value
    const nameInput = document.querySelector('.popup__profail_name').value; 
    const jobInput = document.querySelector('.popup__profail_description').value; 

   
    document.querySelector('.profail__name').textContent = nameInput;
    document.querySelector('.profail__description').textContent = jobInput;

    closeModal();    
};



 
openPopupButton.addEventListener('click', (e) => {        
    
        //В брифе написано - Чтобы попап открывался, добавляйте ему модификатор 
        //popup_opened с одним-единственным правилом.
        popup.classList.add('popup_opened');

        if(window.innerWidth > 320) {
            
        document.body.style.paddingRight = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
           
    }

        document.body.style.overflow = 'hidden';
    });



closePopupButton.addEventListener('click', closeModal); 



document.addEventListener('click', (e) => { 
    if(e.target === popup) {         
        closeModal();        
    }
});




//закрытие окна по escape
document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && popup.classList.contains('popup_opened')) {
        closeModal();        
    }
});   



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
const formElement = document.querySelector('.popup__content');
formElement.addEventListener('submit', formSubmitHandler); 


   


