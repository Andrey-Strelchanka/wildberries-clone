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
const preloader = document.getElementById("preloader")



const filterSearch = [];
// openCartBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     modalCart.classList.add('open-cart');
// })

// openCartPic.addEventListener('click', (e) => {
//     e.preventDefault();
//     modalCart.classList.add('open-cart');
// })

// closeCart.addEventListener('click', () => {
//     modalCart.classList.remove('open-cart');
// })

// window.addEventListener('click', (e) => {
//     if (e.target == modalCart) {
//         modalCart.classList.remove('open-cart');
//     }
//     if (e.target == modalPic) {
//         modalPic.classList.remove('open-pic');
//     }
// })


closePic.addEventListener('click', () => {
    modalPic.classList.remove('open-pic');
})

//ПОИСК ЭЛЕМЕНТОВ ЧЕРЕЗ INPUT
async function filterCards() {
    let itemList = JSON.parse(localStorage.getItem('itemList'))
        search.addEventListener("input", (e)=>{
            rowList.innerHTML='';
            let filterArr = [];
            filterArr = itemList.filter((el)=>{
                return el.title.toLowerCase().includes(e.target.value.toLowerCase())
            })
            if(search.value === ''){
                renderCards(itemList)
            } else{
                renderCards(filterArr)
            }            
        })
}
filterCards()




//ПОЛУЧЕНИЕ КАРТОЧЕК С mockApi
async function getCards() {
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return  await responce.json()
        .then(function(el){
            // preloader.style.opacity = "0";
            // preloader.style.visibility = "hidden";
            localStorage.setItem('itemList',JSON.stringify(el))
            renderCards(el)
        })

}
getCards()

//РЕНДЕРИНГ КАРТОЧЕК
function renderCards(data){
    let displayCard = '';
    data.forEach(function (item){
    displayCard = `
    <div class="popular__card" id="${item.id}">
    <div class="popular__img">
        <img class="popular__image" src="${item.url}" alt="image">
        <div class="popular__enlarge-img" id="enlarge-img">
            <img src="./src/img/enlarge.png" alt="enlarge">
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
        <button class="popular__card-btn btn" id="${item.id}">В корзину</button>
    </div>
</div>
`;

    rowList.insertAdjacentHTML("afterbegin", displayCard);

    const enlargePic = document.getElementById("enlarge-img");
    enlargePic.addEventListener('click', (e) => {
        e.preventDefault();
        modalPic.classList.add('open-pic');
        modalPicWrapper.innerHTML=`
        <img src="${item.url}" alt="" class="modal-pic__img">
        `
    })

    // rowList
    //     .querySelector(`buttom[id="${item.id}"]`)
    //     .addEventListener('click', () => inCart(item))


    // //КЛИК НА КНОПКУ "Добавить в корзину"
    // rowList  
    //     .querySelector(`button[data-id="${item.id}"]`)
    //     .addEventListener("click", () => moveToBasket(item));

    // //КЛИК НА КНОПКУ "Quick view"
    // rowList  
    //     .querySelector(`button[id="img_${item.id}"]`)
    //     .addEventListener("click", () => openModalPicture(item.id))

})
}

