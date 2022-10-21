let containerAgents = document.getElementById("container-agents");
const getAgents = async () => {
    let response = await fetch("../json/stock.json");
    let data = await response.json();

    data["filler"].forEach(product => {
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
        containerAgents.appendChild(div);
    });
};

getAgents();