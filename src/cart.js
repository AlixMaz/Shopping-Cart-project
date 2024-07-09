/* VARIABLES*/
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

/*FUNCTIONS*/
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((basketobject) => basketobject.item).reduce((x,y) => x + y, 0);
}

calculation();

/* GENERATE CART ITEMS */
let generateCartItems = () => {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((basketobject) => {
            let {id,item} = basketobject;
            let search = shopItemsData.find((item)=> item.id === id) || [] ;
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt="shopping item">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>   
            `;
        }).join(""));

    }else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
            <button class="HomeBtn">Back to home</button>
            </a>
            `;
        
    }
    
}

generateCartItems();

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

    generateCartItems();
    update(selectedItem.id); 
    localStorage.setItem("data", JSON.stringify(basket));
}

/* REMOVING FROM BASKET */
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

/* UPDATING CART AMOUNT */
let update = (id) => {
    let search = basket.find((basketobject) => basketobject.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((basketobject) => basketobject.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  };


let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
          .map((basketobject) => {
            let { item, id } = basketobject;
            let search = shopItemsData.find((item) => item.id === id) || [];
    
            return item * search.price;
          })
          .reduce((x, y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
      } else return;
    };
totalAmount();