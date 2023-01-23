const contenedorCarrito = document.querySelector(".contenedor_carrito")
const hacerCarrito = document.querySelector("#carrito")
const carritoTotal = document.querySelector("#carrito_total")
const carritoVacio = document.querySelector("#carrito_vacio")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const calculo = () => {
    let iconoCarrito = document.getElementById("cart_amount")
    iconoCarrito.innerHTML = carrito.map ((x) => x.item).reduce((x,y) => x+y, 0)
}

calculo()

const productosCarrito = (array) => {

    if (carrito.length !== 0) {
        return (contenedorCarrito.innerHTML = carrito.map((x) => {
        let { id, item } = x
        let buscar = array.find((y)=>y.id === id) || []
        return `
            <tr id="card-${buscar.id}">
                <td><i onclick="removerItem(${id})" class="fa-solid fa-circle-xmark"></i></td>
                <td><img src="${buscar.img}" alt="${buscar.producto}"></td>
                <td>${buscar.producto}</td>
                <td>$${buscar.precio}</td>
                <td>
                <div class="cantidad_prod">
                <i onclick="decremento(${buscar.id})" id="menos" class="fa-solid fa-minus"></i>
                <p id="${buscar.id}" class="cantidad"><strong>${item}</strong></p>
                <i onclick="incremento(${buscar.id})" id="mas" class="fa-solid fa-plus"></i>
                </div>
                </td>
                <td>$${item * buscar.precio}</td>
            </tr>
        `
    }).join(""))
    } else {
        hacerCarrito.innerHTML = ``
        carritoVacio.innerHTML = `
            <p>Carrito vacio</p>
            <a href="../index.html"><button class="normal boton_carrito">Volver al Home</button></a>
        `
        carritoTotal.innerHTML = ``
    }}


const totalCarrito = (array) => {

    if (carrito.length !== 0) {
        let cantidadTotal = carrito.map((x) => {
            let {item, id} = x
            let buscar = array.find((y)=>y.id === id) || []
            return item * buscar.precio
        }).reduce((x,y) => x+y, 0)
        carritoTotal.innerHTML = `
        <div id="subtotal">
            <h3>Costo Total</h3>
            <table>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$${cantidadTotal}</strong></td>
                </tr>
            </table>
            <button class="normal pagar">Pagar Ahora</button>
            <button onclick="removerCarrito()" class="normal remover_todo">Remover Todo</button>
        </div>
        `
    }
    else return
}

fetch ("https://63c800835c0760f69ac30196.mockapi.io/api/inventario")
.then(res => res.json())
.then(data => {
    productosCarrito(data)
    totalCarrito(data)
})

const incremento = (id) => {
    let productoSeleccionado = id;
    let buscar = carrito.find((x)=> x.id === productoSeleccionado)

    if (buscar === undefined) {
        carrito.push({
        id: productoSeleccionado,
        item: 1,
    })
    } else {
        buscar.item += 1
    }
    /* productosCarrito() */
    actualizarCarrito(productoSeleccionado)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const decremento = (id) => {
    let productoSeleccionado = id;
    let buscar = carrito.find((x)=> x.id === productoSeleccionado)

    if(buscar === undefined) return
    else if (buscar.item === 0) return;
    else {
        buscar.item -= 1
    }
    actualizarCarrito(productoSeleccionado)
    
    carrito = carrito.filter((x) => x.item !== 0)
    /* productosCarrito() */
    /* totalCarrito() */
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const actualizarCarrito = (id) => {
    let buscar = carrito.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = buscar.item
    calculo()
    /* totalCarrito() */
}

const removerItem = (id) => {
    let itemSeleccionado = id
    carrito = carrito.filter ((x)=> x.id !== itemSeleccionado)
    /* productosCarrito() */
    /* totalCarrito() */
    calculo()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const removerCarrito = () => {
    carrito = []
    /* productosCarrito() */
    calculo()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}