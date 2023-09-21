const overlay = document.querySelector('.overlay');
const fileInput = document.querySelector('#logo');
const logoImg = document.querySelector('.logo__img');
const select = document.querySelector('.select');
const form = document.querySelector('form');
const logoLabel = document.querySelector('.logo__label');

//открываем модальное окно
const openModal = () => {
    overlay.classList.add('active')
}

//закрываем модальное окно 
const closeModal = () => {
    overlay.classList.remove('active');
}

//закрываем модальное окно нажатием на фон
const closeModalByClickedOverlay = (event) => {
    if(event.target === overlay) {
        closeModal();
    }
}

//загружаем и отображаем картинку на странице, которую добавил пользователь
const showImage = () => {
    if (fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            logoImg.src = e.target.result;
        };
        
        select.style.display = 'none';
        logoLabel.style.display = 'none';

        reader.readAsDataURL(fileInput.files[0]);
    }
}

//удаляем картинку со страницы
const deleteImage = () => {
    logoImg.src = 'img/logo.png';
    select.style.display = 'block';
    logoLabel.style.display = 'block';
}

//отправляем форму
const handleSubmit = (event) =>{
    event.preventDefault();

    resetForm();
    deleteImage();
    closeModal();
}

//сбрасываем форму
const resetForm = () => {
    form.reset();
}