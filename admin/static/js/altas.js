const URL = "http://127.0.0.1:5000/"

document.getElementById('formulario').addEventListener('submit', function (event) {event.preventDefault();
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
    alert('Producto agregado correctamente.');
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
})