/* SETTING VARIABLES */

let shop = document.querySelector("#shop");

let shopItemsData = [{
    id: "item1",
    name: "High Candle",
    price: 20,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle1.jpg"
},{
    id: "item2",
    name: "Lolipop Candle",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle2.jpg"

},{
    id: "item3",
    name: "Bubble Candle",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle3.jpg"
},{
    id: "item4",
    name: "Flower Candle",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle4.jpg"
},{
    id: "item5",
    name: "Bear Candle",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle5.jpg"
},{
    id: "item6",
    name: "Cloud Candle",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle6.jpg"
},{
    id: "item7",
    name: "Icecream Candle",
    price: 18,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle7.jpg"
},{
    id: "item8",
    name: "Mom Candle",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle8.jpg"
},{
    id: "item9",
    name: "Mushroom Candle",
    price: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle9.jpg"
},{
    id: "item10",
    name: "Sea Candle",
    price: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle10.jpg"
},{
    id: "item11",
    name: "Smile Candle",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle11.jpg"
},{
    id: "item12",
    name: "Yellow Candle",
    price: 13,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "./assets/candle12.jpg"
}];


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

/* LOCAL STORAGE */

calculation();