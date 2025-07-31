const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2'); 
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    finalizarCompraBtn.addEventListener('click', finalizarCompra);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const filas = lista.querySelectorAll('tr');
    let yaExiste = false;

    filas.forEach(fila => {
        const id = fila.querySelector('a.borrar').getAttribute('data-id');
        if (id === elemento.id) {
            const inputCantidad = fila.querySelector('input.cantidad-input');
            inputCantidad.value = parseInt(inputCantidad.value) + 1;
            yaExiste = true;
        }
    });

    if (!yaExiste) {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td><img src="${elemento.imagen}" width="100"></td>
           <td>${elemento.titulo}</td>
           <td>${elemento.precio}</td>
           <td>
               <input type="number" class="cantidad-input" value="1" min="1" style="width: 50px;">
           </td>
           <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
        `;
        lista.appendChild(row);
    }
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = e.target.getAttribute('data-id'); 
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}

function finalizarCompra(e) {
    e.preventDefault();

    if (lista.children.length === 0) {
        alert("El carrito está vacío. Agregue productos antes de finalizar la compra.");
        return;
    }

    let productos = [];
    const filas = lista.querySelectorAll('tr');

    filas.forEach(fila => {
        const nombre = fila.children[1].textContent;
        const cantidad = fila.querySelector('input.cantidad-input').value;
        productos.push(`${cantidad} x ${nombre}`);
    });

    const mensaje = `¡Su compra se realizó correctamente!\n\nProductos comprados:\n- ${productos.join('\n- ')}`;
    alert(mensaje);

    vaciarCarrito();
}
