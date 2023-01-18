export const displayCard = ({ id, url, title, truePrice, falsePrice }) => (`
    <div class="popular__card" id="${id}">
    <div class="popular__img">
        <img class="popular__image" src="${url}" alt="image">
        <div class="popular__enlarge-img" id="enlarge-img">
        </div>
    </div>
    <div class="popular__top">
        <div class="popular_wrap">
            <h2 class="popular__card-title">${title}</h2>
            <p class="popular__price">${truePrice} руб.</p>
        </div>
        <div class="popular__perc-discount">-10%</div>
    </div>
    <div class="popular__bottom">
        <p class="popular__old-price">${falsePrice} руб.</p>
        <button class="popular__card-btn btn" id="btn-${id}">В корзину</button>
    </div>
    </div>`);

export const displayItem = ({id, url, title, truePrice,}, counter) => (`<li class="modal-cart__item" id="card-${id}">
    <div class="modal-cart__item_wrap-img">
        <img class = "modal-cart__item_image" src="${url}" alt="image">
    </div>
    <p class="modal-cart__item_title">${title}</p>
    <div class="modal-cart__item_wrap-price">
        <p class="modal-cart__item_count">${counter}</p>
        <p class="modal-cart__item_mult">x</p>
        <p class="modal-cart__item_price">${truePrice} руб</p>
    </div>
    </li>`);

export const emptyItem = `<li class="modal-cart__empty-item">Корзина пуста...</li>`;