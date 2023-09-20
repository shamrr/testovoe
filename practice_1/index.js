const overlay = document.querySelector('.overlay');

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