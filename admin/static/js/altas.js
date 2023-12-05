const URL = "https://vabros.pythonanywhere.com/"

//CAMPOS FORM ALTA RESERVA
let form_fecha_llegada = document.getElementById("fecha_llegada");
let form_fecha_salida = document.getElementById("fecha_salida");
let form_habitacion = document.getElementById("habitacion");
let form_apellido = document.getElementById("apellido");
let form_nombre = document.getElementById("nombre");
let form_dni = document.getElementById("dni");
let form_telefono = document.getElementById("telefono");
let form_email = document.getElementById("email");
let respuesta = document.getElementById("respuesta");


//FILTRAR FECHAS
let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if ( day < 10 ) { day="0"+day }
if ( month < 10 ) { month="0"+month }

form_fecha_llegada.setAttribute('min',year+"-"+month+"-"+day);
form_fecha_salida.setAttribute('min',year+"-"+month+"-"+day);

document.getElementById('formulario').addEventListener('submit', function (event) {event.preventDefault();
    let alertas = "";
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let validado = true;

    respuesta.innerHTML = "";

    if (form_fecha_llegada.value > form_fecha_salida.value) {
        alertas += `Fecha: La fecha de llegada no puede ser mayor a la de salida.<br>`;
        validado = false;
    }


    if(form_habitacion.value == "none"){
        alertas += `Habitación: debe elegir una opción.<br>`;
        validado = false;
    }

    if(form_dni.value < 8){
        alertas += `Teléfono: mínimo 7 caracteres.<br>`;
        validado = false;
    }

    if(form_telefono.value < 11){
        alertas += `Teléfono: mínimo 10 caracteres.<br>`;
        validado = false;
    }

    if(!mailFormat.test(form_email.value)){
        alertas += `Email: formato inválido.<br>`;
        validado = false;
    }

    if(!validado){
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
                alert('Reserva agregado correctamente.');
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
                alert('Error al agregar el reserva.');
                });
    }

   

})