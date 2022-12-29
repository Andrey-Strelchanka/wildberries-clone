const cards = document.getElementById("row")
const busketBtn = document.getElementById('header__basket')
const modal = document.getElementById("myModal")
const modalCloseBtn = document.getElementsByClassName("modal__close")[0];


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


async function makeCards(){


    // let url = 'https://63a9d787594f75dc1dc20983.mockapi.io/api/wildberries/v1/WB';
    
    // fetch(url)
    //     .then(function(response){
    //     return response.json();
        
    // })
    //     .then(function(el){
    //     let displayCard = '';
    //     el.forEach(function (item){
    //     displayCard = `
    //     <div id="${item.id}" class="card">
    //         <img src="${item.url}" class="card-img-top" alt="">
    //         <div class="card-body">
    //             <h5 class="card-title">${item.title}</h5>
    //             <div class="card-block">
    //                 <p class="card-text">${item.truePrice}$</p>
    //                 <p id="card__falsePrice" class="card-text">${item.falsePrice}$</p>
    //             </div>
    //             <a href="#" class="btn btn-primary">Basket</a>
    //         </div>
    //         <div id="card__modal">
    //             <button id="card__modal-btn">Quick view</button>            
    //         </div>
    //     </div>
    //     `;
    //     cards.insertAdjacentHTML("afterbegin", displayCard);

    // })
    // })
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
                <a href="#" class="btn btn-primary">Basket</a>
            </div>
            <div id="card__modal">
                <button id="card__modal-btn">Quick view</button>            
            </div>
        </div>
        `;
        cards.insertAdjacentHTML("afterbegin", displayCard);

    })

})}

makeCards()
