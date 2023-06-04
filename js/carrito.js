const saveLocal = () => {
    localStorage.setItem("carro", JSON.stringify(carro));
};

const pintarCarrito = () => {
    caja.style.display = "block"
    caja.innerHTML = "";
    const cajacabezera = document.createElement("div")
    cajacabezera.className = "cajacabezera";
    cajacabezera.innerHTML = `
    <h1>Productos del carrito</h1>
    `;
    caja.append(cajacabezera);

    const botonx = document.createElement("h1");
    botonx.innerHTML = '<i class="bi bi-x-square"></i>'
        ;

    botonx.addEventListener("click", () => {
        caja.style.display = "none";
    });
    cajacabezera.append(botonx)

    carro.forEach((productos) => {
        let contenedordeproducto = document.createElement("div")
        contenedordeproducto.className = "contenedordeproductos"
        contenedordeproducto.innerHTML = `
      <img class="imagenesdelcarrito" src="${productos.img}">
      <h2>${productos.nombreproducto}</h2>
      <h2>$ ${productos.precio}</h2>
      <span class="delete-product"> ❌ </span>
      <h2>x ${productos.cantidad}</h2>
      `;
        caja.append(contenedordeproducto)
        let eliminar = contenedordeproducto.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(productos.id);
        });

    })

    const total = carro.reduce((acc, elemento) => acc + elemento.precio, 0);
    const totaltotal = document.createElement("div");
    totaltotal.className = "total"
    totaltotal.innerHTML = `<h3>Precio a pagar: ${total}</h3>`;
    caja.append(totaltotal);

    const borrar = document.createElement("button");
    borrar.innerText = "Borrar elementos";
    borrar.addEventListener("click", () => {
        Toastify({
            text: "Carrito vacio",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, pink, grey)",
            },
            onClick: function () { }
        }).showToast();
        carro = []
        caja.style.display = "none"
        localStorage.removeItem("carro");
    })
    totaltotal.append(borrar)
};
mostrador.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carro.find((element) => element.id === id);

    console.log(foundId);

    carro = carro.filter((carroId) => {
        return carroId !== foundId;
    });


    saveLocal();
    pintarCarrito();
};