const cards = document.getElementById("row")
const busketBtn = document.getElementById('header__basket')
const modal = document.getElementById("myModal")
const modalPicture = document.getElementById("myModalPicture")
const modalCloseBtn = document.getElementsByClassName("modal__close")[0];
const modalPictureCloseBtn = document.getElementsByClassName("modalPicture__close")[0];
const modalContent = document.getElementById("myModal__inner")
const modalPictureContent = document.getElementById("myModalPicture__inner")
const modalTotalPrice = document.getElementById("modal__final-price")
const busketClear = document.getElementById("modal__btn")


let totalPrice = 0;
let arr = [];

//СОБЫТИЯ МОДАЛКИ КОРЗИНЫ
busketBtn.onclick = function(){
    modal.style.display = "block";
}
modalCloseBtn.onclick = function(){
    modal.style.display = "none";
}
window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none"
        }
}

//УДАЛЕНИЕ ТОВАРОВ ИЗ КОРЗИНЫ
busketClear.onclick = function(){
    modalContent.innerHTML='';
    modalTotalPrice.innerHTML=0;
}


//ДОБАВЛЕНИЕ ТОВАРОВ В КОРЗИНУ
const moveToBasket = async (id) => {
    let responce = await fetch(`https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB/${id}`)
    let data =  await responce.json();
    console.log(data)
    arr.push(data)

    modalContent.innerHTML += `<div id="${data.id}" class="basketInner__wrapper">
    <img src="${data.url}" class="basketInner__img" alt="">
    <div class="basketInner__box">
        <h5 class="basketInner__title">${data.title}</h5>
        <div class="basketInner__block">
            <p class="basketInner__textTrue">${data.truePrice}$</p>
        </div>
    </div>
</div>
`;

totalPrice += data.truePrice;
modalTotalPrice.innerHTML = totalPrice;

}

const openModalPicture = async(id) =>{
    let responce = await fetch(`https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB/${id}`)
    let data =  await responce.json();
        modalPicture.style.display = "block";
        modalPictureCloseBtn.onclick = function(){
            modalPicture.style.display = "none";
        }
        window.onclick = function(event){
            if(event.target == modalPicture){
                modalPicture.style.display = "none"
            }
    }
    modalPictureContent.innerHTML= `
    <img src="${data.url}" class="basketInner__img" alt="">
`;
}

async function makeCards(){
    let responce = await fetch('https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB')
    return await responce.json()
           .then(function(el){
            
        let displayCard = '';
        el.forEach(function (item){
            
        displayCard = `
        <div id="${item.id}" class="card">
            <img src="${item.url}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <div class="card-block">
                    <p class="card-text">${item.truePrice}$</p>
                    <p id="card__falsePrice" class="card-text">${item.falsePrice}$</p>
                </div>
                <button data-id="${item.id}" class="btn btn-primary">Basket</button>
            </div>
            <div id="card__modal">
                <button class="card__modal-btn" id="img_${item.id}">Quick view</button>            
            </div>
        </div>
        `;
        cards.insertAdjacentHTML("afterbegin", displayCard);

        //КЛИК НА КНОПКУ "Добавить в корзину"
        cards  
            .querySelector(`button[data-id="${item.id}"]`)
            .addEventListener("click", () => moveToBasket(item.id));

        //КЛИК НА КНОПКУ "Quick view"
        cards  
            .querySelector(`button[id="img_${item.id}"]`)
            .addEventListener("click", () => openModalPicture(item.id))
    })

})}

makeCards()
