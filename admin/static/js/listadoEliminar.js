const URL = "http://127.0.0.1:5000/"
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
            const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, opciones);
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