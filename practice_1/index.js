const overlay = document.querySelector('.overlay');
const fileInput = document.querySelector('#logo');
const logoImg = document.querySelector('.logo__img');
const select = document.querySelector('.select');
const logoLabel = document.querySelector('.logo__label');

const openModal = () => {
    overlay.classList.add('active')
}

const closeModal = () => {
    overlay.classList.remove('active');
}

const closeModalByClickedOverlay = (event) => {
    if(event.target === overlay) {
        closeModal();
    }
}

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

const deleteImage = () => {
    logoImg.src = 'img/logo.png';
    select.style.display = 'block';
    logoLabel.style.display = 'block';
}
