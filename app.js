//VARIABLES
const productsEl = document.querySelector('.items');
const cartItemsEl = document.querySelector('.cart-items');
const total = document.querySelector('.subtotal');
let cart_val = document.querySelector('.val');
var number = 0;

//PRODUCTS
const products = [
    {
        id: 0,
        name: "Nike shoes",
        price: 18.50,
        imgSrc: "./Images/sneakers.jpg",
    },
    {
        id: 1,
        name: "Alexa",
        price: 5.00,
        imgSrc: "./Images/Alexa.jpg",
    },
    {
        id: 2,
        name: "T-shirts",
        price: 2.85,
        imgSrc: "./Images/T-shirts.jpg",
    },
    {
        id: 3,
        name: "Macbook pro",
        price: 140.00,
        imgSrc: "./Images/Apple macbook.jpg",
    },
    {
        id: 4,
        name: "Magic mug",
        price: 12.00,
        imgSrc: "./Images/Magic mug.jpg",
    },
];

//RENDER PRODUCTS
function renderProducts(){
    products.forEach(product => {
        productsEl.innerHTML += `
            <div> 
                ${product.name}
                <img class="images" src="${product.imgSrc}" alt="${product.name}">
                $${product.price}
                <button class="buy-btn" onclick="buyProduct(${product.price})">Buy</button>
                <button class="cart-btn" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
    })
};
renderProducts();

const buyProduct = (price) => {
    alert(`You have purchased an item for $${price}`)
};

//CART ARRAY 
let cart = [];

//ADD TO CART
function addToCart(id){
    if(cart.some((item) => item.id === id)){
        alert("Product aleardy in cart!");
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    updateCart();
};
function updateCart() {
    rendCartItems();
    renderSubTotal();
    let totalItems = 0;
    cart.forEach((item) => {
        totalItems += item.numberOfUnits;
        cart_val.innerHTML = totalItems;    
    })
};

//CALCULATE AND RENDER TOTAL
function renderSubTotal(){
    let totalPrice = 0;
        totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })
    total.innerHTML = `Total : $${totalPrice} 
    <button class="checkout" onclick="checkOutItems()">Checkout</button>`
};

//RENDER CART ITEMS
function rendCartItems() {
    cartItemsEl.innerHTML = "",
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-box">
            <img onclick="removeItemFromCart(${item.id})" class="icon" src="./Images/delete.png" alt="">
            <p>${item.name} </p>
            <p>$${item.price} </p>
            <div class="quantity">
                <button class="minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
                <h3>${item.numberOfUnits} </h3>
                <button class="plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
            </div>           
        </div> 
        `;
    });
};

//REMOVE ITEM FROM CART
function removeItemFromCart(id){
    cart = cart.filter((item) => item.id !== id);
    let totalPrice = 0;
        totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    })
    cart_val.innerHTML = totalItems; 
    updateCart();
};

//CHECKOUT ITEMS
function checkOutItems(){
    if (cartItemsEl.innerHTML == "") {
        alert("No products in the cart")
    } else {
        let totalPrice = 0;
        totalItems = 0;
        cart.forEach((item) => {
            totalPrice += item.price * item.numberOfUnits;
            totalItems += item.numberOfUnits;
        })
        alert("You have purchased "+ totalItems +" items for $" + totalPrice);
    }
};

//CHANGE NUMBER OF UNITS FOR AN ITEM
function changeNumberOfUnits(action,id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if(item.id == id){
            if(action === "minus"){               
                if(numberOfUnits == 1){
                    numberOfUnits = 1;
                } else {
                    numberOfUnits--;
                }
            } else if(action === "plus"){
                numberOfUnits++;
            }
        }
        return{
            ...item,
            numberOfUnits,
        }
    })
    updateCart();
};