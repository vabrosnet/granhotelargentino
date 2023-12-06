//ALTA DE RESERVA//
const URL = "https://vabros.pythonanywhere.com/"
// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', function
(event) {
event.preventDefault(); // Evitamos que se envie el form 
var formData = new FormData();
formData.append('fecha_llegada', document.getElementById('fecha_llegada').value);
formData.append('fecha_salida', document.getElementById('fecha_salida').value);
formData.append('habitacion', document.getElementById('habitacion').value);
formData.append('apellido', document.getElementById('apellido').value);
formData.append('nombre', document.getElementById('nombre').value);
formData.append('dni', document.getElementById('dni-numero').value);
formData.append('telefono', document.getElementById('telefono').value);
formData.append('email', document.getElementById('email').value);
// Realizamos la solicitud POST al servidor
fetch(URL + 'reservas', {
method: 'POST',
body: formData // Aquí enviamos formData en lugar de JSON
})
//Después de realizar la solicitud POST, se utiliza el método then() 
//para manejar la respuesta del servidor.
.then(function (response) {
    if (response.ok) { 
        return response.json(); 
    } else {
// Si hubo un error, lanzar explícitamente una excepción
// para ser "catcheada" más adelante
    throw new Error('Error al agregar reserva1.');
    }
})
// Respuesta OK
.then(function () {
    // En caso de éxito
    alert('Reserva agregada correctamente.');
    })
    .catch(function (error) {
    // En caso de error
    alert('Error al agregar reserva.');
    console.error('Error:', error);
    })
    .finally(function () {
    // Limpiar el formulario en ambos casos (éxito o error)
    document.getElementById('fecha_inicio').value = "";
    document.getElementById('fecha_llegada').value = "";
    document.getElementById('fecha_fin').value = "";
    document.getElementById('fecha_salida').value = "";
    document.getElementById('habitacion').value = "";
    document.getElementById('modal-habitacion').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('dni-numero').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('email').value = "";

    });
})

/*Modal */
let fecha_llegada = document.getElementById('fecha_llegada');
let fecha_salida = document.getElementById('fecha_salida');
let fechaInicio = document.getElementById('fecha_inicio');
let fechaFin= document.getElementById('fecha_fin');
let habitacion = document.getElementById('habitacion');
let modal_habitacion = document.getElementById('modal-habitacion');


// MODAL FECHA INICIO
const btnAbrirModal= document.querySelector("#btn-abrir-modal");
const btnCerrarModal= document.querySelector("#btn-cerrar-modal");
const modal= document.querySelector("#modal");
btnAbrirModal.addEventListener("click", ()=>{
    modal.showModal ();
})

btnCerrarModal.addEventListener("click", ()=>{
    modal.close();
    
    if (fechaInicio.value) {
        fecha_llegada.value = fechaInicio.value;
        document.getElementById('welcome-message').textContent = '¡Su estadia con Nosotros comienza a partir del, ' + fechaInicio.value + ' Vive la Experiencia !';
    } else {
        document.getElementById('welcome-message').textContent = 'No ha seleccionado ninguna fecha aun';
        // setTimeout(() => {
        //     respuesta.innerHTML = "";
        //   }, "3000");
    }   
})

// MODAL FECHA FIN
const btnAbrirModals= document.querySelector("#btn-abrir-modal-salida");
const btnCerrarModals= document.querySelector("#btn-cerrar-modal-salida");
const modals= document.querySelector("#modal-salida");

btnAbrirModals.addEventListener("click", ()=>{
    modals.showModal ();
})

btnCerrarModals.addEventListener("click", ()=>{
    modals.close();

    if (fechaFin.value) {
        fecha_salida.value = fechaFin.value;
        document.getElementById('welcome-message2').textContent = '¡Su estadia con Nosotros finaliza a partir del, ' + fechaFin.value + ' !';
    } else {
        document.getElementById('welcome-message2').textContent = 'No ha seleccionado ninguna fecha aun';
    }
})

// MODAL FECHA PASAJEROS
const btnAbrirModalp= document.querySelector("#btn-abrir-modal-pasajeros");
const btnCerrarModalp= document.querySelector("#btn-cerrar-modal-pasajeros");
const modalp= document.querySelector("#modal-pasajeros");

btnAbrirModalp.addEventListener("click", ()=>{
    modalp.showModal ();
})

btnCerrarModalp.addEventListener("click", ()=>{
    modalp.close();
    if (modal_habitacion.value == 'none') {
        document.getElementById('welcome-message3').textContent = 'No ha seleccionado habitación';
        habitacion.value = '';
    } else {
        habitacion.value = modal_habitacion.value;
        document.getElementById('welcome-message3').textContent = '';
    }
})