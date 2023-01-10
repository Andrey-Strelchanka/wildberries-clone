import Carousel from 'bootstrap/js/dist/carousel';


const openCartBtn = document.getElementById("cart");
const openCartPic = document.getElementById("cart-pic");
const closeCart = document.getElementById("modal-close");
const modalCart = document.getElementById("modal-cart");

const modalPic = document.getElementById("modal-pic");
const enlargePic = document.getElementById("enlarge-img");
const closePic = document.getElementById("modal-pic-close");

openCartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalCart.classList.add('open-cart');
})

openCartPic.addEventListener('click', (e) => {
    e.preventDefault();
    modalCart.classList.add('open-cart');
})

closeCart.addEventListener('click', () => {
    modalCart.classList.remove('open-cart');
})

window.addEventListener('click', (e) => {
    if (e.target == modalCart) {
        modalCart.classList.remove('open-cart');
    }
    if (e.target == modalPic) {
        modalPic.classList.remove('open-pic');
    }
})

enlargePic.addEventListener('click', (e) => {
    e.preventDefault();
    modalPic.classList.add('open-pic');
})

closePic.addEventListener('click', () => {
    modalPic.classList.remove('open-pic');
})



