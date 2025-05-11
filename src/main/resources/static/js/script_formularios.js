function inicio_pagina_formulario(){

}


document.getElementById("formulario_vehiculo").addEventListener('submit', function(e) {
    e.preventDefault();

    const objeto = {}; //objeto / diccionario que contiene los datos del formulario
    let operacion_exitosa = true;
    const mensajes_de_error = {};

    const f_modelo = document.getElementById("modelo");
    if(f_modelo){
        objeto["modelo"] = f_modelo.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["modelo"] = "Debe especificar el modelo";
    }

    const f_version = document.getElementById("version");
    if(f_version){
        objeto["version"] = f_version.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["version"] = "Debe especificar la versión";
    }

    const f_proveedor = document.getElementById("proveedor");
    if(f_proveedor){
        objeto["proveedor"] = f_proveedor.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["proveedor"] = "El proveedor es requerido";
    }

    const f_matricula = document.getElementById("matricula");
    if(f_matricula){
        objeto["matricula"] = f_matricula.value;
    }

    const f_precio = document.getElementById("precio");
    if(f_precio){
        objeto["precio"] = f_precio.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["precio"] = "El precio es requerido";
    }

    const f_color = document.getElementById("color");
    if(f_color){
        objeto["color"] = f_color.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["color"] = "El color es requerido";
    }

    const f_anio = document.getElementById("anio");
    if(f_anio){
        objeto["anio"] = f_anio.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["anio"] = "El año es requerido";
    }

    const f_serie = document.getElementById("serie");
    if(f_serie){
        objeto["serie"] = f_serie.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["serie"] = "El nro de serie es requerido";
    }

    const f_kilometraje = document.getElementById("kilometraje");
    if(f_kilometraje){
        objeto["kilometraje"] = f_kilometraje.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["kilometraje"] = "El kilometraje es requerido";
    }

    const f_estado = document.getElementById("estado");
    if(f_estado){
        objeto["estado"] = f_estado.value;
    }else{
        operacion_exitosa = false;
        mensajes_de_error["estado"] = "Debe indicar el estado del vehículo";
    }

    var extensionesValidas = 
            /(\.jpg|\.jpeg|\.png)$/i;

    const f_imagen = document.getElementById("imagen");
    if(f_imagen){
        if(!extensionesValidas.exec(f_imagen.value)){
            operacion_exitosa = false;
            mensajes_de_error["imagen"] = "El formato de la imagen debe ser .jpg, .jpeg o .png";
        }else{
            objeto["imagen"] = f_imagen.value;
        }
    }else{
        operacion_exitosa = false;
        mensajes_de_error["imagen"] = "Debe subir una imágen";
    }

    if(operacion_exitosa){
        // Aquí puedes hacer un POST a tu backend si estás usando Spring Boot
        // Ahora el backend debería verificar los datos y guardarlos en la base de datos si están correctos
        //Si hay algun error, se debe notificar 
        alert('Vehículo cargado correctamente');
    }else{
        alert("Campos inválidos o incompletos");
        return;
    }

});
