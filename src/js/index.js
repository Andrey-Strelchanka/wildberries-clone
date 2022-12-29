const cards = document.getElementById("row")
const busketBtn = document.getElementById('header__basket')
const modal = document.getElementById("myModal")
const modalCloseBtn = document.getElementsByClassName("modal__close")[0];
const modalContent = document.getElementById("myModal__contant")


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


const moveToBasket = async (id) => {
    let responce = await fetch(`https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB/${id}`)
    let data =  await responce.json();
   console.log(data)

    modalContent.innerHTML += `<div id="${data.id}" class="card">
    <img src="${data.url}" class="card-img-top" alt="">
    <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <div class="card-block">
            <p class="card-text">${data.truePrice}$</p>
            <p id="card__falsePrice" class="card-text">${data.falsePrice}$</p>
        </div>
        <button data-id="${data.id}" class="btn btn-primary">Basket</button>
    </div>
    <div id="card__modal">
        <button id="card__modal-btn">Quick view</button>            
    </div>
</div>
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
                <button id="card__modal-btn">Quick view</button>            
            </div>
        </div>
        `;
        cards.insertAdjacentHTML("afterbegin", displayCard);
        cards  
            .querySelector(`button[data-id="${item.id}"]`)
            .addEventListener("click", () => moveToBasket(item.id))
    })

})}

makeCards()
