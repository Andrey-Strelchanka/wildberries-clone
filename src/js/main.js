import 'bootstrap/js/dist/carousel';
import { API } from './modules/consts';
import { displayCard, emptyItem, displayItem } from './modules/ui';

const rowList = document.getElementById('row');
const search = document.getElementById('search');
const openCartBtn = document.getElementById("cart");
const closeCart = document.getElementById("modal-close");
const modalCart = document.getElementById("modal-cart");
const modalCartList = document.getElementById('modal-cart__list');
const modalPic = document.getElementById("modal-pic");
const closePic = document.getElementById("modal-pic-close");
const modalPicWrapper = document.getElementById('modal-pic__wrapper-img');
const cartCounter = document.getElementById('cart-counter');
const totalPrice = document.getElementById('total_price');
const cartClear = document.getElementById('cart_clear');
const cartOrder = document.getElementById('cart_order');

let countCartId = {};
let cards = [];
const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

openCartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalCart.classList.add('open-cart');
    renderCart();
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

closePic.addEventListener('click', () => {
    modalPic.classList.remove('open-pic');
})

function clearCart() {
    localStorage.removeItem('cartItems');
    countCartId = {};
    cartCounter.innerText = '0';
    emptyCart();
}

cartClear.addEventListener('click', () => {
    clearCart();
})

cartOrder.addEventListener('click', () => {
    clearCart();
})

// ПОИСК ЭЛЕМЕНТОВ ЧЕРЕЗ INPUT
search.addEventListener("input", (e)=>{
    rowList.innerHTML='';
    let filterArr = [];
    filterArr = cards.filter((item)=>{
        return item.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    if(search.value === ''){
        renderCards(cards)
    } else{
        renderCards(filterArr)
    }            
})

// //ПОЛУЧЕНИЕ КАРТОЧЕК С mockApi
async function getCards() {
    let responce = await fetch(API)
    return  await responce.json()
        .then(function(el){
            cards = el;
            renderCards(el)
        })
}
getCards();

//РЕНДЕРИНГ КАРТОЧЕК
function renderCards(data){
    data.forEach(function (item){
    rowList.insertAdjacentHTML("afterbegin", displayCard(item));

    const enlargePic = document.getElementById("enlarge-img");
    enlargePic.addEventListener('click', (e) => {
        e.preventDefault();
        modalPic.classList.add('open-pic');
        modalPicWrapper.innerHTML=`
        <img src="${item.url}" alt="" class="modal-pic__img">
        `
    })
    const moveToCartBtn = document.getElementById(`btn-${item.id}`);
    moveToCartBtn.addEventListener('click', () => moveToCart(item))
})
}

// Добавление в корзину
function moveToCart(item) {
    if (getCartItems()) {
        countCartId = getCartItems();
    } else {
        countCartId = {};
    }
    if (countCartId[item.id])
        countCartId[item.id] += 1;
        else {
        countCartId[item.id] = 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(countCartId));
    getCounter();
}


function getCounter() {
    if (getCartItems()) {
        cartCounter.innerText = Object.values(getCartItems()).reduce((acc, cur) => acc + cur);
    }
    else {
        cartCounter.innerText = '0';
    }
    
}
getCounter();

// Рендеринг корзины
function renderCart() {
    countCartId = getCartItems();
    modalCartList.innerHTML = '';

    let totalPriceNum = 0;
    let urls = [];
    if (countCartId) {
        const getUrls = (obj) => {
            Object.keys(obj).forEach((el) => {
                urls.push(`${API}${el}`)
            })
        };
        getUrls(countCartId)
        Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then((arr) => {
                arr.forEach((item) => {
                    modalCartList.insertAdjacentHTML("afterbegin", displayItem(item, countCartId[item.id]));
                    totalPriceNum += (item.truePrice * countCartId[item.id]);
                    totalPrice.innerText = `Итого: ${totalPriceNum} руб.`;
                })})
    } else {
        emptyCart();
    }
}

function emptyCart() {
    modalCartList.innerHTML = emptyItem;
    totalPrice.innerText = `Итого: 0 руб.`;
}


