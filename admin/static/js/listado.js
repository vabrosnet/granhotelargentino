const URL = "http://127.0.0.1:5000/"

fetch(URL + 'reservas')
    .then(function (response) {
        if (response.ok) {
            return response.json();
    }
})
    .then(function (data) {
        let tablaReservas = document.getElementById('tablaReservas');
        for (let reserva of data) {
            let fila = document.createElement('tr');
            let fechaLlegada = new Date(reserva.fecha_llegada)
            let fLlegadaFormateada = fechaLlegada.toISOString().split('T')[0].split('-').reverse().join('-');
            // 
            let fechaSalida = new Date(reserva.fecha_salida);
            let fSalidaFormateada = fechaSalida.toISOString().split('T')[0].split('-').reverse().join('-');


            fila.innerHTML = '<td>' + reserva.codigo + '</td>' +
            '<td>' + fLlegadaFormateada + '</td>' +
            '<td>' + fSalidaFormateada + '</td>' +
            '<td>' + reserva.habitacion + '</td>' +
            '<td>' + reserva.apellido + '</td>' +
            '<td>' + reserva.nombre + '</td>' +
            '<td>' + reserva.dni + '</td>' +
            '<td>' + reserva.telefono + '</td>' +
            '<td>' + reserva.email + '</td>';
            tablaReservas.appendChild(fila);
    }
})
.catch(function (error) {
// Código para manejar errores
alert('Error al obtener las reservas.');
});
