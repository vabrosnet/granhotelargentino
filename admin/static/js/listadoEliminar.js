const URL = "https://vabros.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            reservas: []
        }
    },
    methods: {
        obtenerReservas() {
            fetch(URL + 'reservas')
                .then(response => {
                    if (response.ok) { return response.json(); }
                    })
                .then(data => {
                    this.reservas = data;
                })
                .catch(error => {
                    console.log('Error:', error);
                    alert('Error al obtener las reservas.');
                });
        },
        formatearFecha(fecha) {
            let fechaIngresada = new Date(fecha)
            let fechaFormateada = fechaIngresada.toISOString().split('T')[0].split('-').reverse().join('-');
            return fechaFormateada;
        },
        eliminarReserva(codigo) {
            if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
                fetch(URL + `reservas/${codigo}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            this.reservas =
                            this.reservas.filter(reserva => reserva.codigo !== codigo);
                            alert('Reserva eliminada correctamente.');
                        }
                    })
                    .catch(error => {
                    alert(error.message);
                    });
            }
        }
    },
    mounted() {
        this.obtenerReservas();
    }
});
app.mount('body');