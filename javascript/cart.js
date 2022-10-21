/* FUNCIONES MATEMÁTICAS */
const suma = (...totales) => {
    return totales.reduce((acc, item) => acc + item, 0);
};
const iva = (precio) => {
    return precio * 1.21;
};

/* Array statement */
let cart = [];
let arrayProducts = [];

/* Render Function from JSON to ArrayProducts */
const renderItems = (item, gunSection, arrayOrder, gunName) => {
    item[gunSection][arrayOrder][gunName].forEach(item => {
        arrayProducts.push(item)
    });
};

const getArrayProducts = async () => {
    let response = await fetch("../../json/stock.json");
    let product = await response.json();
    renderItems(product, "rifles", 0, "ak");
    renderItems(product, "rifles", 0, "awp");
    renderItems(product, "rifles", 0, "m4a1-s");
    renderItems(product, "rifles", 0, "m4a4");
    renderItems(product, "rifles", 0, "otros");
    renderItems(product, "pistolas", 0, "dk");
    renderItems(product, "pistolas", 0, "p250");
    renderItems(product, "pistolas", 0, "usp");
    renderItems(product, "pistolas", 0, "cz75");
};
getArrayProducts();

/* PRICES */
const totalPrice = document.getElementById("totalPrice");
const ivaPrice = document.getElementById("ivaPrice");

const cartContainer = document.getElementById("cart-container");

/* Crear Cards en el Offcanvas */
const cardToCart = () => {
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
        let card = document.createElement("div")
        card.classList = "card bg-dark cart__card";
        card.innerHTML = `<div class="col cart__card__head">
        <a href="" target="_blank"><img src="../media/${product.img}" class="card-img-top"></a>
                            <div class="card-body cart__card__body">
                                <h5 class="card-title">${product.name}</h5>
                                </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-dark">PRECIO (+IVA): ${iva(product.price)}</li>
                                <li class="list-group-item bg-dark">Cantidad: <span id="">${product.quantity}</span></li>
                                <li class="list-group-item bg-dark"><button class="btn btn-dark btn-cart-card text-center" onclick="deleteFromCart(${product.id})"><img src="../media/deleteCart.png"/></button></li>
                                </ul>
                        </div>`
        cartContainer.appendChild(card)
        localStorage.setItem(`cart`, JSON.stringify(cart))
    })
    
    cartButton.innerText = `(${cart.length})`;
    innerCartBtn.innerText = `(${cart.length})`;
    totalPrice.innerText = cart.reduce((acum, product) => suma(acum, product.price) * product.quantity, 0);
    ivaPrice.innerText = iva(cart.reduce((acum, product) => suma(acum, product.price) * product.quantity, 0));
    
};


/* Local Storage */
document.addEventListener(`DOMContentLoaded`, () => {
    if (localStorage.getItem(`cart`)) {
        cart = JSON.parse(localStorage.getItem(`cart`));
        cardToCart();
    }
});


/* Agregar al carrito */
const addToCart = (productId) => {
    const exist = cart.some(product => product.id === productId)
    if (exist) {
        const item = cart.map(item => {
            item.id === productId ? item.quantity++ : item.quantity
        })
    } else {
        let product = arrayProducts.find(product => product.id == productId);
        cart.push(product);
    }
    cardToCart();
};



/* Eliminar elementos del carrito */
const deleteFromCart = (prodId) => {
    const item = cart.find((product) => product.id === prodId);
    let index = cart.indexOf(item);
    const exist = cart.some ((prod) => (prod.id === prodId)) 
    if (exist && item.quantity > 1){
        const prod = cart.map (prod => { 
            if (prod.id === prodId){
                prod.quantity--
            }
        })
    }else {
        cart.splice(index, 1);
    }
    cardToCart()
    if (cart.length === 0) {
        localStorage.clear();
        cardToCart()
    }
}

/* BUTTONS*/
const cartButton = document.getElementById("cart-button")
const innerCartBtn = document.getElementById("inner-cart-button")
innerCartBtn.className = ("main__minititle");


/* CLEAR BUTTON (CART) */

let clearBtn = document.getElementById("clear-cart")

clearBtn.addEventListener("click", () => {
    Swal.fire({
        title: '¿Quieres eliminar todos los elementos del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00fcf5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar Carrito',
        background: `#000`

    }).then((result) => {
        if (result.isConfirmed) {
            cart.length = 0;
            localStorage.clear()
            cardToCart();
            Swal.fire(
                'Listo!',
                'Tu carrito fue vaciado!',
                'success',
            )
        }
    })
})

/* CHECKOUT BUTTON (CART) */
const checkoutBtn = document.getElementById("btn-checkout");

checkoutBtn.addEventListener("click", () => {
    Swal.fire({
        title: '¿Quieres continuar con el proceso de compra? Te redireccionaremos a una nueva pestaña',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00fcf5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        background: `#000`

    }).then((result) => {
        if (result.isConfirmed) {
            location.href = "../pages/checkout.html";
        } else {
            Swal.fire(
                'Puedes seguir agregando productos a tu carrito!',
            )
        }
    })
});