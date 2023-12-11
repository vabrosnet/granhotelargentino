const URL = "https://vabros.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            fecha_llegada: '',
            fecha_salida: '',
            habitacion: '',
            apellido: '',
            nombre: '',
            dni: '',
            telefono: '',
            email: '',
            mostrarDatosReserva: false,
        };
    },
    methods: {
        obtenerReserva() {
            fetch(URL + 'reservas/' + this.codigo)
                // .then(response => response.json())

                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert('Reserva no encontrada');
                        this.limpiarFormulario();
                    }
                })

                .then(data => {
                    let fechaLlegada = new Date(data.fecha_llegada)
                    let fLlegadaFormateada = fechaLlegada.toISOString().split('T')[0];
                    let fechaSalida = new Date(data.fecha_salida)
                    let fSalidaFormateada = fechaSalida.toISOString().split('T')[0];
                    this.fecha_llegada = fLlegadaFormateada;
                    this.fecha_salida = fSalidaFormateada;
                    this.habitacion = data.habitacion;
                    this.apellido = data.apellido;
                    this.nombre = data.nombre;
                    this.dni = data.dni;
                    this.telefono = data.telefono;
                    this.email = data.email;
                    this.mostrarDatosReserva = true;
                })
                .catch(error => console.error('Error:', error));
        },

        verificarCambios() {
            let respuesta = document.getElementById("respuesta");
            let alertas = "";
            let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let validado = true;

            respuesta.innerHTML = "";

            if (this.fecha_llegada > this.fecha_salida) {
                alertas += `Fecha: La fecha de llegada no puede ser mayor a la fecha de salida.<br>`;
                validado = false;
            }
                
            if(this.habitacion == "none" || this.habitacion.value == ""){
                alertas += `Habitación: debe elegir una opción de habitación.<br>`;
                validado = false;
            }
        
            if(!mailFormat.test(this.email)){
                alertas += `Email: formato inválido.<br>`;
                validado = false;
            }

            respuesta.innerHTML = alertas;
            setTimeout(() => {
                respuesta.innerHTML = "";
                }, "3000");

            if (validado) {
                this.guardarCambios();
            }
        },

        guardarCambios() {
            const formData = new FormData();
            // formData.append('codigo', this.codigo);
            formData.append('fecha_llegada', this.fecha_llegada);
            formData.append('fecha_salida', this.fecha_salida);
            formData.append('habitacion', this.habitacion);
            formData.append('apellido', this.apellido);
            formData.append('nombre', this.nombre);
            formData.append('dni', this.dni);
            formData.append('telefono', this.telefono);
            formData.append('email', this.email);
            
            fetch(URL + 'reservas/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Reserva actualizada correctamente');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar la reserva');
                });
        },

        limpiarFormulario() {
            this.codigo = '';
            this.fecha_llegada = '';
            this.fecha_salida = '';
            this.habitacion = '';
            this.apellido = '';
            this.nombre = '';
            this.dni = '';
            this.telefono = '';
            this.email = '';
            this.mostrarDatosReserva = false;
        }   
    }
});

app.mount('#app');
    