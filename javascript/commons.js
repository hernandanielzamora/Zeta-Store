/* Main Section: Card Button Function */
export const cardButtonFunction = (button, product) => {
    button.addEventListener("click", () => {
        addToCart(product.id);
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
            title: 'El producto fue agregado al carrito!'
        })
    })
};

/* Main Section: Render Items from JSON */
export const renderItemsCards = (item, gunSection, arrayOrder, gunName, containerName) => {
    item[gunSection][arrayOrder][gunName].forEach(product => {
        let div = document.createElement("div");
        div.classList = "card bg-dark col col-md-auto"
        div.style = "width: 18rem;"
        div.innerHTML = `<a href="" target="_blank"><img src="${product.img}"
            class="card-img-top" alt="${product.name}"></a>
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item bg-dark">FLOAT: ${product.float} </li>
                                <li class="list-group-item bg-dark">ESTADO: ${product.status} </li>
                                <li class="list-group-item bg-dark">ENTREGA: ${product.deliver} </li>
                                <li class="list-group-item bg-dark">PRECIO: $${product.price} </li>
                                <li class = "list-group-item bg-dark"><button class = "btn btn-dark btn-comprar text-center" id="button${product.id}" type = "button"><img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-buy-call-to-action-bearicons-blue-bearicons.png"/></li>
                            </ul>`
        containerName.appendChild(div);

        let buttonCard = document.getElementById(`button${product.id}`);
        cardButtonFunction(buttonCard, product);
    })
};

/* Main Section: Render Fillers from JSON */
export const renderFiller = (data, filler, containerName) => {
    (data[filler]).forEach(product => {
        let div = document.createElement("div");
        div.classList = "card bg-dark col col-md-auto"
        div.style = "width: 18rem;"
        div.innerHTML = `<a href="" target="_blank"><img src="${product.img}"
            class="card-img-top" alt="${product.name}"></a>
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item bg-dark">FLOAT: ${product.float} </li>
                                <li class="list-group-item bg-dark">ESTADO: ${product.status} </li>
                                <li class="list-group-item bg-dark">ENTREGA: ${product.deliver} </li>
                                <li class="list-group-item bg-dark">PRECIO: $${product.price} </li>
                                <li class = "list-group-item bg-dark"><button class = "btn btn-dark btn-comprar text-center" id="button${product.id}" type = "button"><img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-buy-call-to-action-bearicons-blue-bearicons.png"/></li>
                            </ul>`
        containerName.appendChild(div);
    })
};