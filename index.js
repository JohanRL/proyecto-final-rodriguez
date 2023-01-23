const modeButton = document.querySelector("#light-dark")
const body = document.querySelector(".light-mode")
const bar = document.querySelector("#bar")
const nav = document.querySelector("#navbar")
const close = document.querySelector("#close")
const formLogin = document.querySelector("#login")
const inputUser = document.querySelector("#input_user")
const inputPass = document.querySelector("#input_pass")
const loginIncorrecto = document.querySelector("#logint")
const contenedorLogIn = document.querySelector(".container_login")
const logout = document.querySelector("#logout")
const logInIcon = document.querySelector("#login_icon")
const logInSec = document.querySelector("#login_sec")
const contenedor = document.querySelector(".contenedor")

//Dark mode

modeButton.onclick = () => {
    body.classList.toggle("dark-mode")
}

//hamburger menu

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Validar log in

if (logInIcon) {
    logInIcon.addEventListener('click', () => {
        logInSec.style.display = "flex"
    })
}

const datosUsuario = {
    user: "indievidual5",
    password: "Coder123"
}

const subirAlLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = ( clave ) => {
    return JSON.parse(localStorage.getItem(clave))
}

formLogin.onsubmit = ( event ) => {
    event.preventDefault()
    if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ) {
        subirAlLs("login", true)
        contenedorLogIn.style.display = "none"  
        logout.style.display = "block"      
    } else {        
        loginIncorrecto.style.display = "block"
        inputPass.style.border = "1px solid red"
        inputUser.style.border = "1px solid red"
    }
}

function validarLogin ( clave ) {
    if ( clave !== true ) {
        contenedorLogIn.style.display = "flex"
        logout.style.display = "none"       
    } else {
        contenedorLogIn.style.display = "none"
        logout.style.display = "block"        
    }
}

validarLogin(obtenerDelLs("login"))

logout.onclick = () => {
    localStorage.removeItem("login")
    validarLogin(obtenerDelLs("login"))
    formLogin.reset()
}

// API fetch y DOM de los productos

const productosDisplay = (array) => {
    const nodos = array.reduce ((acc, element) => {
        let buscar = carrito.find((x)=>x.id === element.id) || []
        return acc + `
        <div id="id_producto_${element.id}" class="prod">
            <img src="${element.img}" alt="${element.producto}" onclick="window.location.href='../pages/sproduct.html'">
            <div class="description">
                <span>${element.oferta}</span>
                <h5>${element.producto}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${element.precio}</h4>
                <div class="cantidad_prod">
                    <i onclick="decremento(${element.id})" id="menos" class="fa-solid fa-minus"></i>
                    <p id="${element.id}" class="cantidad"><strong>${buscar.item === undefined ? 0 : buscar.item}</strong></p>
                    <i onclick="incremento(${element.id})" id="mas" class="fa-solid fa-plus"></i>
                </div>
            </div>
            <i class="fa-solid fa-cart-shopping cart"></i>
        </div>
        `
    }, "")
    contenedor.innerHTML = nodos
}

fetch ("https://63c800835c0760f69ac30196.mockapi.io/api/inventario")
.then(res => res.json())
.then(data => {
    productosDisplay(data)
})

/* Carrito */

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

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
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    /* console.log(carrito) */
    actualizarCarrito(productoSeleccionado)
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
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const actualizarCarrito = (id) => {
    let buscar = carrito.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = buscar.item
    calculo()
}

const calculo = () => {
    let iconoCarrito = document.getElementById("cart_amount")
    iconoCarrito.innerHTML = carrito.map ((x) => x.item).reduce((x,y) => x+y, 0)
}

calculo()

// Validacion Newsletter

const formNews = document.querySelector("#form_news")
const inputEmailNews = document.querySelector("#input_email_news")

const sendToLSN = (clave,valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

inputEmailNews.oninput = () => {
    if (inputEmailNews.value === "" || inputEmailNews.value.length < 4 || inputEmailNews.value.match (/[\w%+-]+@[\w.-]+\.[a-zA-Z0-9]{4}/)) {
        inputEmailNews.style.border = "2px solid red"
    } else {
        inputEmailNews.style.border = "2px solid green"
    }
}

const formDataNews = []

formNews.onsubmit = (event) => {
    console.log (formDataNews)
    event.preventDefault()
    formDataNews.push (inputEmailNews.value)
    sendToLocalStorage("newsletter", formDataNews)
}

//validacion de formulario

//DOM form

const form = document.querySelector("#form_ask")

//DOM input

const inputName = document.querySelector("#input_name")
const inputEmail = document.querySelector("#input_email")
const inputPhoneN = document.querySelector ("#input_phonen")
const inputQuestion = document.querySelector ("#input_question")

//Subir al LocalStorage

const sendToLocalStorage = (clave,valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

// Evento oninput

inputName.oninput = () => {
    if (inputName.value === "" || inputName.value.length < 4 || inputName.value.match (/[0-9]/)) {
        inputName.style.border = "2px solid red"
    } else {
        inputName.style.border = "2px solid green"
    }
}

inputEmail.oninput = () => {
    if (inputEmail.value === "" || inputEmail.value.length < 4 || inputEmail.value.match (/[\w%+-]+@[\w.-]+\.[a-zA-Z0-9]{4}/)) {
        inputEmail.style.border = "2px solid red"
    } else {
        inputEmail.style.border = "2px solid green"
    }
}

inputPhoneN.oninput = () => {
    if (inputPhoneN.value === "" || inputPhoneN.value.length < 10 || inputPhoneN.value.match (/[a-zA-Z]/)) {
        inputPhoneN.style.border = "2px solid red"
    } else {
        inputPhoneN.style.border = "2px solid green"
    }
}

inputQuestion.oninput = () => {
    if (inputQuestion.value === "" || inputQuestion.value.length < 4) {
        inputQuestion.style.border = "2px solid red"
    } else {
        inputQuestion.style.border = "2px solid green"
    }
}

const formData = []

form.onsubmit = (event) => {
    console.log (formData)
    event.preventDefault()
    formData.push (inputName.value, inputEmail.value, inputPhoneN.value, inputQuestion.value)
    sendToLocalStorage("question", formData)
    form.reset()
}