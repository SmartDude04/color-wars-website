const hamMenuIcon = document.querySelector('.nav-mbl-hamburger-icon');
const offScreenMenu = document.querySelector('.nav-mbl-hamburger-menu');
const closeButton = document.querySelector('.nav-mbl-hamburger-close-img');

hamMenuIcon.addEventListener('click', () => {
    offScreenMenu.classList.toggle('active');
})

closeButton.addEventListener('click', () => {
    offScreenMenu.classList.toggle('active');
})