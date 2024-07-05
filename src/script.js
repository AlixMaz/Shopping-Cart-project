/* SETTING VARIABLES */

let shop = document.querySelector("#shop");




let basket = JSON.parse(localStorage.getItem("data")) || [];

/* GENERATE STORE */
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((candle)=>{
        let {id,name,price,desc,img} = candle;
        let search = basket.find((basketobject) => basketobject.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
        <img width="218" src=${img} alt="candle-item 1">
        <div class="bar"></div>
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                </div>
            </div>
        </div>
    </div>`;
  
    }).join(""));
};

generateShop();


/* ADDING TO BASKET */
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((basketobject) => basketobject.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });  
    }else {
        search.item += 1;
    } 

    
    update(selectedItem.id); 
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((basketobject) => basketobject.id === selectedItem.id);

    if(search.item === undefined) return;
    else if (search.item === 0) return;   
    else {
        search.item -= 1;
    }

    update(selectedItem.id); 
    basket = basket.filter((basketobject) => basketobject.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((basketobject) => basketobject.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((basketobject) => basketobject.item).reduce((x,y) => x + y, 0);
}



calculation();