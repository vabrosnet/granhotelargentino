//VALIDAR CAMPOS FORM CONTACTO
let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");
let mensaje = document.getElementById("mensaje");
let form = document.getElementById("form");
let respuesta = document.getElementById("respuesta");

form.addEventListener("submit", e=>{
    e.preventDefault();
    let alertas = "";
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let validado = true;

    respuesta.innerHTML = "";

    if(nombre.value.length < 6){
        alertas += `Nombre: mínimo 5 caracteres.<br>`;
        validado = false;
    }
   
    if(!mailFormat.test(email.value)){
        alertas += `Email: formato inválido.<br>`;
        validado = false;
    }

    if(telefono.value < 11){
        alertas += `Teléfono: mínimo 10 caracteres.<br>`;
        validado = false;
    }

    if(mensaje.value < 11){
        alertas += `Mensaje: mínimo 10 caracteres.`;
        validado = false;
    }

    if(!validado){
        respuesta.innerHTML = alertas;

        setTimeout(() => {
            respuesta.innerHTML = "";
          }, "3000");
    }else{
        respuesta.classList.add("sucess");
        respuesta.innerHTML = "Mensaje enviado!. Pronto nos comunicaremos con Usted.";
        form.reset();
        setTimeout(() => {
            respuesta.innerHTML = "";
            respuesta.classList.remove("sucess")
          }, "4000");
    }
})
