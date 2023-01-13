import Carousel from 'bootstrap/js/dist/carousel';

const rowList = document.getElementById('row')
const search = document.getElementById('search')
const openCartBtn = document.getElementById("cart");
const openCartPic = document.getElementById("cart-pic");
const closeCart = document.getElementById("modal-close");
const modalCart = document.getElementById("modal-cart");
const modalPic = document.getElementById("modal-pic");
const closePic = document.getElementById("modal-pic-close");
const modalPicWrapper = document.getElementById('modal-pic__wrapper-img')
const cartCounter = document.getElementById('cart-counter');
const cartCounterSecond = document.getElementById('cart-counter-2');
const totalPrice = document.getElementById('total_price');
const cartClear = document.getElementById('cart_clear');
const cartOrder = document.getElementById('cart_order');
// const preloader = document.getElementById("preloader")

let countCartId = {};

openCartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalCart.classList.add('open-cart');
    renderCart();
})

openCartPic.addEventListener('click', (e) => {
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

cartClear.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    countCartId = {};
    cartCounter.innerText = '0';
    cartCounterSecond.innerText = '0';
    renderCart();
})

cartOrder.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    countCartId = {};
    cartCounter.innerText = '0';
    cartCounterSecond.innerText = '0';
    renderCart();
})

//ПОЛУЧЕНИЕ КАРТОЧЕК С mockApi
async function getCards() {
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return  await responce.json()
        .then(function(el){
            // preloader.style.opacity = "0";
            // preloader.style.visibility = "hidden";
            renderCards(el)
        })
}
getCards()

//РЕНДЕРИНГ КАРТОЧЕК
function renderCards(data){
    let enlarge = 'https://img.icons8.com/ios-filled/512/zoom-to-extents.png';
    let displayCard = '';
    data.forEach(function (item){
    displayCard = `
    <div class="popular__card" id="${item.id}">
    <div class="popular__img">
        <img class="popular__image" src="${item.url}" alt="image">
        <div class="popular__enlarge-img" id="enlarge-img">
            <img src="${enlarge}" alt="enlarge">
        </div>
    </div>
    <div class="popular__top">
        <div class="popular_wrap">
            <h2 class="popular__card-title">${item.title}</h2>
            <p class="popular__price">${item.truePrice} руб.</p>
        </div>
        <div class="popular__perc-discount">-10%</div>
    </div>
    <div class="popular__bottom">
        <p class="popular__old-price">${item.falsePrice} руб.</p>
        <button class="popular__card-btn btn" id="btn-${item.id}">В корзину</button>
    </div>
    </div>`;
    rowList.insertAdjacentHTML("afterbegin", displayCard);

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
    if (localStorage.getItem('cartItems')) {
    countCartId = JSON.parse(localStorage.getItem('cartItems'));
    } else {
        countCartId = {};
    }
        if (countCartId[item.id])
            countCartId[item.id] += 1;
        else {
            countCartId[item.id] = 1;
        }
    localStorage.setItem('cartItems', JSON.stringify(countCartId));
    console.log(countCartId);
    cartCounter.innerText = Object.values(JSON.parse(localStorage.getItem('cartItems'))).reduce((acc, cur) => acc + cur);
    cartCounterSecond.innerText = Object.values(JSON.parse(localStorage.getItem('cartItems'))).reduce((acc, cur) => acc + cur);
}

if (localStorage.getItem('cartItems')) {
    cartCounter.innerText = Object.values(JSON.parse(localStorage.getItem('cartItems'))).reduce((acc, cur) => acc + cur);
    cartCounterSecond.innerText = Object.values(JSON.parse(localStorage.getItem('cartItems'))).reduce((acc, cur) => acc + cur);
}

// Рендеринг корзины
async function renderCart() {
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return  await responce.json()
    .then((el) => {
    const modalCartList = document.getElementById('modal-cart__list');
    modalCartList.innerHTML = '';
    countCartId = JSON.parse(localStorage.getItem('cartItems'));
    displayItem = '';
    let totalPriceNum = 0;
    if (countCartId) {
        el.forEach((item) => {
            if (countCartId.hasOwnProperty(item.id)) {
            displayItem = `<li class="modal-cart__item" id="card-${item.id}">
            <div class="modal-cart__item_wrap-img">
                <img class = "modal-cart__item_image" src="${item.url}" alt="image">
            </div>
            <p class="modal-cart__item_title">${item.title}</p>
            <div class="modal-cart__item_wrap-price">
                <p class="modal-cart__item_count">${countCartId[item.id]}</p>
                <p class="modal-cart__item_mult">x</p>
                <p class="modal-cart__item_price">${item.truePrice} руб</p>
            </div>
            </li>`;
            modalCartList.insertAdjacentHTML("afterbegin", displayItem);
            totalPriceNum += (item.truePrice * countCartId[item.id]);
            }
        })
    } else {
        displayItem = `<li class="modal-cart__empty-item">Корзина пуста...</li>`;
        modalCartList.insertAdjacentHTML("afterbegin", displayItem);
    }
    totalPrice.innerText = `Итого: ${totalPriceNum} руб.`;
    })
}

// ПОИСК ЭЛЕМЕНТОВ ЧЕРЕЗ INPUT
async function filterCards() {
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return  await responce.json()
    .then((el) => {
        search.addEventListener("input", (e)=>{
            rowList.innerHTML='';
            let filterArr = [];
            filterArr = el.filter((item)=>{
                return item.title.toLowerCase().includes(e.target.value.toLowerCase())
            })
            if(search.value === ''){
                renderCards(el)
            } else{
                renderCards(filterArr)
            }            
        })
    })
}
filterCards()




