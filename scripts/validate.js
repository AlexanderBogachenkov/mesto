//Проверка валидности в инпуте
const checkInputValidity = (input, {errorClass, inputErrorClass}) => {
    const error = document.querySelector(`#${input.id}-error`);

    

    if(input.validity.valid) {
        //remove error;
        error.textContent = '';
        error.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    } else {
        // show error;
        error.textContent = input.validationMessage;
        error.classList.add(errorClass);
        input.classList.add(inputErrorClass);

    }
}

//Переключаем кнопку сохранить в inactive
const toggleSaveButton = (inputs, button, {inactiveButtonClass}) => {
    const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = '';

    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
}


// Дисейблим кнопку после submita  
const disableButtonAfterSubmit = (button, {inactiveButtonClass}) => {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
}


//Запускаем валидацию на странице
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...restConfig} ) =>  {
const forms = [...document.querySelectorAll(formSelector)]  
//Находим все формы
forms.forEach(form => {
    //Находим все инпуты    
    const inputs = [...form.querySelectorAll(inputSelector)]
    //Находим кнопку submit
    const button = form.querySelector(submitButtonSelector)

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Дисейблим кнопку после submita  
        disableButtonAfterSubmit(button, restConfig);
    })


    //Для каждого инпута
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            //Вызываем валидацию на текущем инпуте
            
            checkInputValidity(input, restConfig);
            

            //Переключаем кнопку сохранения 
            toggleSaveButton(inputs, button, restConfig);


        })
    })
})

}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 