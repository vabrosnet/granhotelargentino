//CAMPOS FORM ALTA RESERVA
let fecha_llegada = document.getElementById('fecha_llegada');
let fecha_salida = document.getElementById('fecha_salida');
let habitacion = document.getElementById('habitacion');

let fechaInicio = document.getElementById('fecha_inicio');
let fechaFin = document.getElementById('fecha_fin');

let modal_habitacion = document.getElementById('modal-habitacion');
let message1 = document.getElementById('message1');
let message2 = document.getElementById('message2');
let message3 = document.getElementById('message3');

//FILTRAR FECHAS
let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if ( day < 10 ) { day="0"+day }
if ( month < 10 ) { month="0"+month }

fechaInicio.setAttribute('min',year+"-"+month+"-"+day);
fechaFin.setAttribute('min',year+"-"+month+"-"+day);

// MODAL FECHA INICIO
const btnAbrirModal= document.querySelector("#btn-abrir-modal");
const btnCerrarModal= document.querySelector("#btn-cerrar-modal");
const modal= document.querySelector("#modal");
btnAbrirModal.addEventListener("click", ()=>{
    modal.showModal();
})

btnCerrarModal.addEventListener("click", ()=>{
    modal.close();
    
    if (fechaInicio.value) {
        fecha_llegada.value = fechaInicio.value;
    } else {
        message1.innerHTML = 'No ha seleccionado fecha';

        setTimeout(() => {
            message1.innerHTML = "";
          }, "3000");
    }   
})

// MODAL FECHA FIN
const btnAbrirModals= document.querySelector("#btn-abrir-modal-salida");
const btnCerrarModals= document.querySelector("#btn-cerrar-modal-salida");
const modals= document.querySelector("#modal-salida");

btnAbrirModals.addEventListener("click", ()=>{
    modals.showModal();
})

btnCerrarModals.addEventListener("click", ()=>{
    modals.close();

    if (fechaFin.value) {
        fecha_salida.value = fechaFin.value;
    } else {
        message2.innerHTML = 'No ha seleccionado fecha';
        setTimeout(() => {
            message2.innerHTML = "";
          }, "3000");
    }
})

// MODAL FECHA PASAJEROS
const btnAbrirModalp= document.querySelector("#btn-abrir-modal-pasajeros");
const btnCerrarModalp= document.querySelector("#btn-cerrar-modal-pasajeros");
const modalp= document.querySelector("#modal-pasajeros");

btnAbrirModalp.addEventListener("click", ()=>{
    modalp.showModal();
})

btnCerrarModalp.addEventListener("click", ()=>{
    modalp.close();
    if (modal_habitacion.value == 'none') {
        habitacion.value = '';
        message3.innerHTML = 'No ha seleccionado habitación';
        setTimeout(() => {
            message3.innerHTML = "";
          }, "3000");
    } else {
        habitacion.value = modal_habitacion.value;
    }
})


//carga datos mediante API
let formulario = document.getElementById("formulario");
let apellido = document.getElementById("apellido");
let nombre = document.getElementById("nombre");
let dni = document.getElementById("dni");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");
let respuesta = document.getElementById("respuesta");

const URL = "https://vabros.pythonanywhere.com/"

document.getElementById('formulario').addEventListener('submit', function (event) {event.preventDefault();
    let alertas = "";
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let validado = true;

    respuesta.innerHTML = "";

    if (fecha_llegada.value == '') {
        alertas += `Fecha: no ingresó la fecha de llegada.<br>`;
        validado = false;
    }

    if (fecha_salida.value == '') {
        alertas += `Fecha: no ingresó la fecha de salida.<br>`;
        validado = false;
    }

    if (fecha_llegada.value > fecha_salida.value) {
        alertas += `Fecha: La fecha de llegada no puede ser mayor a la de salida.<br>`;
        validado = false;
    }


    if(habitacion.value == "none" || habitacion.value == "") {
        alertas += `Habitación: debe elegir una opción.<br>`;
        validado = false;
    }

    if(!mailFormat.test(email.value)) {
        alertas += `Email: formato inválido.<br>`;
        validado = false;
    }

    if(!validado) {
        respuesta.innerHTML = alertas;

        setTimeout(() => {
            respuesta.innerHTML = "";
          }, "3000");
        }else{
            var formData = new FormData();
            formData.append('fecha_llegada', document.getElementById('fecha_llegada').value);
            formData.append('fecha_salida', document.getElementById('fecha_salida').value);
            formData.append('habitacion', document.getElementById('habitacion').value);
            formData.append('apellido', document.getElementById('apellido').value);
            formData.append('nombre', document.getElementById('nombre').value);
            formData.append('dni', document.getElementById('dni').value);
            formData.append('telefono', document.getElementById('telefono').value);
            formData.append('email', document.getElementById('email').value);
            fetch(URL + 'reservas', {
                method: 'POST',
                body: formData
            })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                // alert('Reserva agregada correctamente.');
                respuesta.innerHTML = 'Reserva agregada correctamente.';
                setTimeout(() => {
                    respuesta.innerHTML = '';
                  }, "3000");
                // Limpiar el formulario para el proximo producto
                document.getElementById('fecha_llegada').value = "";
                document.getElementById('fecha_salida').value = "";
                document.getElementById('habitacion').value = "";
                document.getElementById('apellido').value = "";
                document.getElementById('nombre').value = "";
                document.getElementById('dni').value = "";
                document.getElementById('telefono').value = "";
                document.getElementById('email').value = "";
            })
            .catch(function (error) {
            // Mostramos el error, y no limpiamos el form.
            // alert('Error al agregar la reserva.');
            respuesta.innerHTML = 'Error al agregar la reserva.';
            setTimeout(() => {
                respuesta.innerHTML = '';
              }, "3000");
            });
    }
})