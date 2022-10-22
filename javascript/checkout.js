/* FUNCIONES MATEMÁTICAS */
const sumaCheckout = (...totales) => {
    return totales.reduce((acc, item) => acc + item, 0);
};
const ivaCheckout = (price) => {
    return price * 1.21;
};
const resta = (a, b) => { return a - b };

/* Arrow functions para utilizar una vez agregados los inputs que validen los códigos de descuento*/

const zambrita = (price) => {
    return resta(price, price * 0.1);
};
const cyclopscito = (price) => {
    price = resta(price, price * 0.25);
    return price
};

/* ALERTS */
const toast = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: {
            popup: 'colored-toast'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'El descuento fue aplicado!\n(En caso de que no haya podido aplicar el descuento, reinice la página)'
    })
};

/* Global Variables */

let cartCheckout = [];

let requestNumber = 1;
let mensaje = ``;
let price = 0;

/* Checkout Cards */
const priceCheckout = document.getElementById("checkout-price");
const checkoutCointainer = document.getElementById("checkoutContainer")
const cardCheckOut = () => {
    let contador = 1;
    checkoutCointainer.innerHTML = "";
    cartCheckout.forEach((product) => {
        let card = document.createElement("div")
        card.classList = "card bg-dark col col-md-auto"
        card.style = "width: 18rem;"
        card.innerHTML = `<a href="" target="_blank"><img src="${product.img}"
            class="card-img-top" alt="${product.name}"></a>
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item bg-dark">FLOAT: ${product.float} </li>
                                <li class="list-group-item bg-dark">ESTADO: ${product.status} </li>
                                <li class="list-group-item bg-dark">ENTREGA: ${product.deliver} </li>
                                <li class="list-group-item bg-dark">PRECIO: $${product.price} </li>
                                <li class="list-group-item bg-dark">Cantidad: <span id="">${product.quantity}</span></li>
                            </ul>`
        checkoutCointainer.appendChild(card);
        mensaje += `Producto ${contador}: ${product.name} x ${product.quantity}, `
        contador++;
    })
    // discount()
    price = ivaCheckout(cartCheckout.reduce((acum, product) => sumaCheckout(acum, product.price) * product.quantity, 0));
    console.log(price);
    priceCheckout.innerText = `Precio Total (+IVA): ${price}`;
    mensaje += `Precio Total: ${price} | `;

};

document.addEventListener(`DOMContentLoaded`, () => {
    if (localStorage.getItem(`cart`)) {
        cartCheckout = JSON.parse(localStorage.getItem(`cart`));
        cardCheckOut();
    }
});

/* Discount Inputs */

const inputPlaceholder = document.getElementById("input-placeholder");

inputPlaceholder.addEventListener("submit", (e) => {
    toast()
    e.preventDefault()
    let inputs = e.target.children;
    if (inputs[0].value.toLowerCase() === "cyclopscito") {
        price = cyclopscito(price)
        console.log(price);
        priceCheckout.innerText = `Precio Total (+IVA): ${price}`;
        mensaje += `Precio con Descuento (cyclopscito): ${price}`;
        return price
    } else if (inputs[0].value.toLowerCase() === "zambrita") {
        price = zambrita(price)
        console.log(price);
        priceCheckout.innerText = `Precio Total (+IVA): ${price}`;
        mensaje += `Precio con Descuento (zambrita): ${price}`;
        return price
    }
});

const btnInput = document.getElementById("input-btn");
let flag = 0;
btnInput.addEventListener("click", () => {
    flag ++;
    if(flag > 1){
        btnInput.disabled = true
        btnInput.classList = "";
    }    
});


/* BUTTONS */

/* Clear Checkout */
const clearCheckout = document.getElementById("clear-checkout");


clearCheckout.addEventListener("click", () => {
    Swal.fire({
        title: '¿Quieres eliminar todos los elementos del carrito? Te devolveremos al inicio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00fcf5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vaciar Carrito',
        background: `#000`

    }).then((result) => {
        if (result.isConfirmed) {
            cartCheckout.length = 0;
            localStorage.clear()
            cardCheckOut();
            location.href = "../index.html"
        }
    })
});

/* Confirm Checkout */

const btnFinish = document.getElementById("btn-finish");

btnFinish.addEventListener("click", () => {
    Swal.fire({
        title: '¿Confirmar y continuar con su compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00fcf5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confrimar',
        background: `#000`

    }).then((result) => {
        if (result.isConfirmed) {
            window.open(`https://wa.me/5493886867663?text=Hola me comunico por el Pedido °: ${requestNumber}, Productos ||%20${mensaje}%20`, `_blank`)
        }
        requestNumber++
    })
});