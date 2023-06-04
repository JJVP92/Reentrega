const tienda = document.getElementById("tienda");
const mostrador = document.getElementById("mostrador")
const caja = document.getElementById("caja")

let carro = JSON.parse(localStorage.getItem("carro")) || [];
const productoslocal = async () => {
  const respuesta = await fetch("data.json")
  const data = await respuesta.json()
  data.forEach((productos) => {
    let showtienda = document.createElement("div");
    showtienda.className = "showtienda";
    showtienda.innerHTML = `
        <img class="imagenestienda" src="${productos.img}">
        <h3 class= "nombreproducto">${productos.nombreproducto}</h3>
        <p class="precio">${productos.precio} $</p>
        
         `;
    tienda.append(showtienda);
    let agregar = document.createElement("button");
    agregar.innerText = "Agregar"
    agregar.className = "agregar"
    showtienda.append(agregar);
    agregar.addEventListener("click", () => {
      Swal.fire({
        title: 'Producto agregado al carrito',
        text: 'Muchas gracias 😘',
        icon: 'success',
        confirmButtonText: 'seguir comprando'
      })

      const repeat = carro.some((repeatProduct) => repeatProduct.id === productos.id);

      if (repeat) {
        carro.map((prod) => {
          if (prod.id === productos.id) {
            prod.cantidad++;
          }
        });
      } else {
        carro.push({
          id: productos.id,
          img: productos.img,
          nombre: productos.nombreproducto,
          precio: productos.precio,
          cantidad: productos.cantidad,
        });

      }
      const saveLocal = () => {
        localStorage.setItem("carro", JSON.stringify(carro));
      };
      saveLocal();
    })
  })
};
productoslocal();







