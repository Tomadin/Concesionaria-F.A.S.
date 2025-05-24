
document.addEventListener("DOMContentLoaded", function () {
    const select_modelo = document.getElementById("F5_select_modelo");
    const select_color = document.getElementById("F5_select_color");
    let modelosData = [];
    llenar_diccionario_vehiculos();
    // Cargar modelos en el select
    
    fetch("http://localhost:8080/autos/listar")
            .then(response => response.json())
            .then(data => {
                modelosData = data;

                const coloresSet = new Set(); // Para evitar colores duplicados

                data.forEach(auto => {
                    // Agregar modelo si no existe ya en el select
                    const modeloId = auto.modelo.id;
                    const modeloNombre = auto.modelo.nombre;

                    if (![...select_modelo.options].some(opt => opt.value === String(modeloId))) {
                        const modeloOption = document.createElement("option");
                        modeloOption.value = modeloId;
                        modeloOption.textContent = modeloNombre;
                        select_modelo.appendChild(modeloOption);
                    }

                    // Agregar color si no existe ya
                    if (!coloresSet.has(auto.color)) {
                        const colorOption = document.createElement("option");
                        colorOption.value = auto.color;
                        colorOption.textContent = auto.color;
                        select_color.appendChild(colorOption);
                        coloresSet.add(auto.color);
                    }
                });
            })
            .catch(error => {
                console.error("Error al cargar modelos:", error);
                select_modelo.innerHTML = "<option>Error al cargar modelos</option>";
            });


    // Manejar envío del formulario
    document.getElementById('formulario_venta').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío tradicional

        const data = {
            dni_cliente: parseInt(document.getElementById('F5_dni_cliente').value, 10),
            dni_empleado: parseInt(document.getElementById('F5_dni_empleado').value, 10),
            metodo_pago: document.getElementById('F5_select_metodo_pago').value,
            vehiculos: vehiculos_a_comprar, // Asegurate de que esta variable esté definida
            observaciones: document.getElementById('F5_observaciones').value
        };

        console.log("Datos a enviar:", data);

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
                    alert('Venta cargada con éxito');
                    console.log(result);
                })
                .catch(error => {
                    alert('Error al cargar la venta');
                    console.error(error);
                });
    });
});


//ESTE OBJETO NO DEBE SER LLENADO CON INFORMACIÓN SENSIBLE, SOLO MODELO, VERSION Y PRECIO
//este objeto le sirve a la tabla en el formulario de venta para mostrar los atributos modelo, version y precio
var vehiculos = {}; //claves son los id de los vehiculos, valores son los demás atributos

function llenar_diccionario_vehiculos() {
    fetch('http://localhost:8080/autos/listar')
        .then(response => {
            if (!response.ok)
                throw new Error('Error en el servidor');
            return response.json();
        })
        .then(result => {
            vehiculos = {};
            result.forEach(auto => {
                const clave = `${auto.modelo.id}_${auto.color}`;
                vehiculos[clave] = {
                    modelo: auto.modelo.nombre,
                    version: auto.version,
                    precio: auto.precio
                };
            });
        })
        .catch(error => {
            console.error("Error al llenar el diccionario de vehículos:", error);
        });
}


//TODO LO DE ABAJO ES PARA LA FUNCIONALIDAD E INTERACTIVIDAD CON LA TABLA DEL FORMULARIO DE COMPRA  

var vehiculos_a_comprar = {};//clave=id_vehiculo, valor[cantidad, precio]   //son los vehículos que se agregaron a la tabla de compra
function agregar_vehiculo() {

    const modelo_agregar = document.getElementById('F5_select_modelo').value;
    const color_agregar = document.getElementById('F5_select_color').value;
    const cantidad = parseInt(document.getElementById('F5_cantidad').value);

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a cero");
        return;
    } else if (cantidad > 100) {
        alert("La cantidad no puede superar 100");
        return;
    }

    if (modelo_agregar == "modelo_default_option" || color_agregar == "color_default_option") {
        alert("Debe elegir un modelo y un color");
        return;
    }

    const clave = modelo_agregar + "_" + color_agregar;
    const datosVehiculo = vehiculos[clave];
    const nueva_clave = modelo_agregar + "_" + color_agregar;
    
    if (!datosVehiculo) {
        alert("No se encontraron datos del vehículo seleccionado");
        return;
    }

    const precio = datosVehiculo.precio;
    const version = datosVehiculo.version;
    
    ultimo_agregado = nueva_clave;

    const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");

    if (nueva_clave in vehiculos_a_comprar) {
        const fila_a_eliminar = document.getElementById("fila_" + nueva_clave);
        fila_a_eliminar.remove();
    }

    vehiculos_a_comprar[nueva_clave] = [0, 0];
    vehiculos_a_comprar[nueva_clave][0] = cantidad;

    

    vehiculos_a_comprar[nueva_clave][1] = precio;

    const nueva_fila = document.createElement("tr");
    nueva_fila.id = "fila_" + nueva_clave;

    const td_modelo = document.createElement("td");
    td_modelo.innerHTML = datosVehiculo.modelo;
    nueva_fila.appendChild(td_modelo);


    const td_version = document.createElement("td");
    td_version.innerHTML = datosVehiculo.version;
    nueva_fila.appendChild(td_version);

    const td_color = document.createElement("td");
    td_color.innerHTML = color_agregar;
    nueva_fila.appendChild(td_color);

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
        document.getElementById("fila_" + nueva_clave).remove();
        delete vehiculos_a_comprar[nueva_clave];
        actualizar_subtotal_y_total();
    });

    td_boton_borrar.appendChild(boton_borrar);
    nueva_fila.appendChild(td_boton_borrar);

    tbody.appendChild(nueva_fila);
    actualizar_subtotal_y_total();
}


var ultimo_agregado;


function borrar_ultimo_vehiculo() {
    const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
    const ultima_fila = tbody.lastChild;

    if (ultima_fila.id != "F5_fila_encabezado") {
        ultima_fila.remove();
        delete vehiculos_a_comprar[ultimo_agregado];
    }
    actualizar_subtotal_y_total();
}

function borrar_todos_vehiculos() {
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

function actualizar_subtotal_y_total() {
    const texto_subtotal = document.getElementById("F5_precio_subtotal");
    const texto_total = document.getElementById("F5_precio_total");

    const iva = 1.21;

    let subtotal = 0;
    let total = 0;

    for (let vehiculo in vehiculos_a_comprar) {
        subtotal += (vehiculos_a_comprar[vehiculo][0] * vehiculos_a_comprar[vehiculo][1]); //multiplica cantidad por precio
    }

    total = subtotal * iva;
    texto_subtotal.innerHTML = "Subtotal: $" + subtotal;
    texto_total.innerHTML = "Total (IVA incluído): $" + total;
}


function actualizar_disponibilidad() {

    const modelo_elegido = document.getElementById("F5_select_modelo");
    const color_elegido = document.getElementById("F5_select_color");
    const textos_disponibilidad = document.getElementById("F5_disponibilidad");

    if (modelo_elegido.value != "modelo_default_option") {


        /*
         
         //resetear la lista de colores
         color_elegido.innerHTML = "<option value='default_option'>--Seleccione un color--</option>";
         
         //OBTENER LOS COLORES DISPONIBLES CON EL FETCH
         data.forEach(vehiculo => {
         if(vehiculo.modelo == modelo_elegido.value){
         const option = document.createElement("option");
         option.value = vehiculo.color;
         option.textContent = vehiculo.color;
         color_elegido.appendChild(option);
         }
         });
         */

        //actualizar el texto que indica la disponibilidad
        if (color_elegido.value != "color_default_option") {
            let cantidad_disponible = 0;
            /*
             //OBTENER LA CANTIDAD DE MODELOS CON EL COLOR ELEGIDO
             data.forEach(vehiculo => {
             if(vehiculo.modelo == modelo_elegido.value && vehiculo.color == color_elegido.value){
             cantidad_disponible++;
             }
             });
             */
            textos_disponibilidad.innerHTML = modelo_elegido.value + " de color " + color_elegido.value + " disponibles: " + cantidad_disponible;
        } else {
            textos_disponibilidad.innerHTML = "Seleccione un color para ver la disponibilidad";
        }
    } else {
        textos_disponibilidad.innerHTML = "Seleccione un modelo y color para ver la disponibilidad";
    }



}