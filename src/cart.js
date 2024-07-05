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

let generateCartItems = () => {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((basketobject) => {
            return `
            <div class="cart-item"></div>   
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