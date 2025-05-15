document.getElementById('formulario_venta').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    let verificar_descuento = get_descuento();

    if(verificar_descuento == "error_NaN"){
        alert("El descuento debe ser un numero");
        return;
    }
    else if(verificar_descuento == "error_rango"){
        alert("El descuento debe estar entre 0 y 100");
        return;
    }
    let p_descuento = parseFloat(verificar_descuento);
    if(isNaN(p_descuento) || p_descuento == undefined || p_descuento == null){
        p_descuento = 0;
        actualizar_subtotal_y_total();
    }

    const data = {
        dni_cliente: parseInt(document.getElementById('F5_dni_cliente').value, 10),
        dni_empleado: parseInt(document.getElementById('F5_dni_empleado').value, 10),
        metodo_pago: document.getElementById('F5_select_metodo_pago').value,
        descuento: p_descuento,
        vehiculos: vehiculos_a_comprar,
        observaciones: document.getElementById('F5_observaciones').value
    };


    console.log(document.getElementById('F5_dni_cliente').value);
    console.log(document.getElementById('F5_dni_empleado').value);
    console.log(document.getElementById('F5_select_metodo_pago').value);
    console.log(vehiculos_a_comprar)
    console.log(document.getElementById('F5_descuento').value);
    console.log(document.getElementById('F5_observaciones').value);


    fetch('http://localhost:8080/api/ventas/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error en el servidor');
                return response.json();
            })
            .then(result => {
                alert('Modelo cargado con éxito');
                console.log(result);
            })
            .catch(error => {
                alert('Error al enviar el modelo');
                console.error(error);
            });
});

function get_descuento(){
    let descuento = parseFloat(document.getElementById('F5_descuento').value);
    if(isNaN(descuento)){
        document.getElementById("F5_label_descuento").style.color = "black"
        document.getElementById("F5_label_descuento").innerHTML = "Descuento (%)"
        document.getElementById('F5_descuento').value = 0;
        return "error_NaN";
    }
    else if(descuento < 0 || descuento > 100){
        document.getElementById("F5_label_descuento").style.color = "red";
        document.getElementById("F5_label_descuento").innerHTML = "Descuento (%) - Rango: 0 - 100";
        return "error_rango";
    }
    document.getElementById("F5_label_descuento").style.color = "black";
    document.getElementById("F5_label_descuento").innerHTML = "Descuento (%)";
    return descuento;
}


//ESTE OBJETO NO DEBE SER LLENADO CON INFORMACIÓN SENSIBLE, SOLO MODELO, VERSION Y PRECIO
//este objeto le sirve a la tabla en el formulario d eventa para mostrar los atributos modelo, version y precio
var vehiculos = {}; //claves son los id de los vehiculos, valores son los demás atributos

function llenar_diccionario_vehiculos(){

    /*
    
    SE DEBE SOLICITAR A LA BASE DE DATOS LA INFORMACION SOBRE LOS VEHICULOS
    esto de abajo es un ejemplo, no funciona

    vehiculos = {};

    fetch('http://localhost:8080/api/???')
            .then(response => {
                if (!response.ok)
                    throw new Error('Error en el servidor');
                return response.json();
            })
            .then(result => {
                console.log(result);

                for(var i = 0; i < result.length; i++){
                    vehiculos[result[i].id] = {modelo: result[i].modelo, version: result[i].version, precio: result[i].precio};
                }
            })
    */
}



//TODO LO DE ABAJO ES PARA LA FUNCIONALIDAD E INTERACTIVIDAD CON LA TABLA DEL FORMULARIO DE COMPRA  

var vehiculos_a_comprar = {};//clave=id_vehiculo, valor[cantidad, precio]   //son los vehículos que se agregaron a la tabla de compra
function agregar_vehiculo(){

    const id_vehiculo_agregar = parseInt(document.getElementById('F5_vehiculo_a_agregar').value);
    const cantidad = parseInt(document.getElementById('F5_cantidad').value);

    if(cantidad <= 0){
        alert("La cantidad debe ser mayor a cero");
        return;
    }
    else if (cantidad > 200){
        alert("La cantidad no puede superar 200");
        return;
    }

    const nueva_clave = id_vehiculo_agregar;
    id_ultimo_vehiculo_agregado = id_vehiculo_agregar; //variable global

    const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");

    if(nueva_clave in vehiculos_a_comprar){
        const fila_a_eliminar = document.getElementById("tabla_compra_fila_" + id_vehiculo_agregar);
        fila_a_eliminar.remove();
    }

    vehiculos_a_comprar[nueva_clave] = [0, 0];
    vehiculos_a_comprar[nueva_clave][0] = cantidad;

    //const precio = vehiculos[id_vehiculo_agregar].precio;
    //precio placeholder abajo: 
    const precio = 25000000.0;  //debe ser reeplazado por el valor real

    vehiculos_a_comprar[nueva_clave][1] = precio;

    const nueva_fila = document.createElement("tr");
    nueva_fila.id = "tabla_compra_fila_" + id_vehiculo_agregar;

    const td_id = document.createElement("td");
    td_id.innerHTML = id_vehiculo_agregar;
    nueva_fila.appendChild(td_id);

    const td_modelo = document.createElement("td");
    td_modelo.innerHTML = "-";
    nueva_fila.appendChild(td_modelo);

    const td_version = document.createElement("td");
    td_version.innerHTML = "-";
    nueva_fila.appendChild(td_version);

    const td_cantidad = document.createElement("td");
    td_cantidad.innerHTML = cantidad;
    nueva_fila.appendChild(td_cantidad);

    const td_precio_u = document.createElement("td");
    td_precio_u.innerHTML = precio;
    nueva_fila.appendChild(td_precio_u);

    const td_precio_total = document.createElement("td");
    td_precio_total.innerHTML = (precio * cantidad);
    nueva_fila.appendChild(td_precio_total);

    const td_boton_borrar = document.createElement("td");
    
    const boton_borrar = document.createElement("input");
    boton_borrar.type = "button"
    boton_borrar.className = "Botones_secundarios";
    boton_borrar.style = "width: 80px;";
    boton_borrar.value = "Borrar";

    boton_borrar.addEventListener('click', function (event) {
        document.getElementById("tabla_compra_fila_" + id_vehiculo_agregar).remove();
        delete vehiculos_a_comprar[id_vehiculo_agregar];
        actualizar_subtotal_y_total();
    });

    td_boton_borrar.appendChild(boton_borrar);
    nueva_fila.appendChild(td_boton_borrar);

    tbody.appendChild(nueva_fila);
    actualizar_subtotal_y_total();
}


var id_ultimo_vehiculo_agregado;

function borrar_ultimo_vehiculo(){
    const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
    const ultima_fila = tbody.lastChild;

    if(ultima_fila.id != "F5_fila_encabezado"){
        ultima_fila.remove();
        delete vehiculos_a_comprar[id_ultimo_vehiculo_agregado];
    }
    actualizar_subtotal_y_total();
}

function borrar_todos_vehiculos(){
    const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");

    const hijos = Array.from(tbody.children);
    hijos.forEach(hijo => {
      if (hijo.id != "F5_fila_encabezado") { //borramos todas las filas menos la cabecera
        hijo.remove();
      }
    });

    vehiculos_a_comprar = {}
    actualizar_subtotal_y_total();
}

function actualizar_subtotal_y_total(){
    const texto_subtotal = document.getElementById("F5_precio_subtotal");
    const texto_total = document.getElementById("F5_precio_total");

    let descuento = parseFloat(get_descuento());
    const iva = 1.21;

    if(isNaN(descuento)){
        descuento = 0;
    }

    let subtotal = 0;
    let total = 0;

    for (let vehiculo in vehiculos_a_comprar) {
        subtotal += (vehiculos_a_comprar[vehiculo][0] * vehiculos_a_comprar[vehiculo][1]); //multiplica cantidad por precio
    }

    total = (subtotal - ((subtotal * (descuento / 100)))) * iva;
    texto_subtotal.innerHTML = "Subtotal: $" + subtotal;
    texto_total.innerHTML = "Total (IVA incluído): $" + total;
}
