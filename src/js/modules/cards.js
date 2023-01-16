
export const rowList = document.getElementById('row')


// //ПОЛУЧЕНИЕ КАРТОЧЕК С mockApi
export async function getCards() {
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return  await responce.json()
        .then(function(el){
            cards = el;
            // preloader.style.opacity = "0";
            // preloader.style.visibility = "hidden";
            renderCards(el)
        })
}

//РЕНДЕРИНГ КАРТОЧЕК
export function renderCards(data){
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

function moveToCart(item) {
    if (getCartItems()) {
        countCartId = parseCartItems();
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