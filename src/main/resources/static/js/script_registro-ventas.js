// Variables globales
var filas_ventas = []; // array con los elementos HTML <tr> de cada venta, incluye detalles
var venta_detalles = {}; // diccionario con clave de id_venta y como valor un array con arrays de detalles

async function cargarRegistro() {
    const tabla = document.getElementById("tabla_registro");

    filas_ventas = [];
    venta_detalles = {};
    debug_llenar_filas(); // DE PRUBA, SE LLENA CON VENTAS FICTICIAS // SE DEBE COMENTAR ESTA LÍNEA UNA VEZ LISTA LA CONEXIÓN
    ordenar_ventas("fecha", "descendente"); 
    /*
    try {
        const response = await fetch("http://localhost:8080/ventas/listar"); // 
        if (!response.ok) throw new Error("Error al cargar ventas");

        const ventas = await response.json();

        ventas.forEach(venta => {
            const { id, fecha, subtotal, total, detalles } = venta;
            crear_fila(id, fecha, subtotal, total);

            detalles.forEach(det => {
                crear_detalle(id, det.idVehiculo, det.modelo, det.cantidad, det.precioUnitario);
            });
        });

    } catch (error) {
        console.error("Hubo un error al obtener las ventas:", error);
    }*/
}

function crear_fila(id_venta, fecha, subtotal, total) {
    const tabla = document.getElementById("tabla_registro");

    // Creamos la fila principal (con rowspan, se agregará luego)
    const fila = document.createElement("tr");
    fila.className = "Fila_venta";
    fila.id = "venta_" + id_venta;

    const celda_id = document.createElement("td");
    celda_id.innerHTML = id_venta;
    celda_id.rowSpan = 1; // se ajustará luego
    celda_id.className = "Celda_venta";

    const celda_fecha = document.createElement("td");
    celda_fecha.innerHTML = fecha;
    celda_fecha.rowSpan = 1;
    celda_fecha.className = "Celda_venta";

    const celda_subtotal = document.createElement("td");
    celda_subtotal.innerHTML = subtotal;
    celda_subtotal.rowSpan = 1;
    celda_subtotal.className = "Celda_venta";

    const celda_total = document.createElement("td");
    celda_total.innerHTML = total;
    celda_total.rowSpan = 1;
    celda_total.className = "Celda_venta";

    // Guardamos la fila en la lista
    filas_ventas.push(fila);

    // Inicializamos los detalles para esa venta
    venta_detalles[id_venta] = [];

    // Guardamos las celdas rowspan para agregarlas a la primera fila de detalles
    fila._rowspan_celdas = [celda_id, celda_fecha, celda_subtotal, celda_total];
}

function crear_detalle(id_venta, id_vehiculo, modelo, cantidad, precio_unitario) {
    const tabla = document.getElementById("tabla_registro");

    const fila_detalle = document.createElement("tr");

    const celda_id_vehiculo = document.createElement("td");
    const celda_modelo = document.createElement("td");
    const celda_cantidad = document.createElement("td");
    const celda_precio_unitario = document.createElement("td");

    celda_id_vehiculo.innerHTML = id_vehiculo;
    celda_modelo.innerHTML = modelo;
    celda_cantidad.innerHTML = cantidad;
    celda_precio_unitario.innerHTML = precio_unitario;

    fila_detalle.appendChild(celda_id_vehiculo);
    fila_detalle.appendChild(celda_modelo);
    fila_detalle.appendChild(celda_cantidad);
    fila_detalle.appendChild(celda_precio_unitario);

    // Añadir a la lista de detalles
    venta_detalles[id_venta].push(fila_detalle);
}

function debug_llenar_filas() {
    // Limpia estructuras anteriores
    filas_ventas = [];
    venta_detalles = {};

    // Ventas de ejemplo
    crear_fila(1, "2025-05-10", 50000, 60000);
    crear_detalle(1, 101, "Kangoo", 2, 25000);
    crear_detalle(1, 102, "Logan", 1, 10000);

    crear_fila(2, "2025-05-11", 70000, 80000);
    crear_detalle(2, 103, "Duster", 1, 70000);

    crear_fila(3, "2025-05-12", 85000, 100000);
    crear_detalle(3, 104, "Sandero", 1, 25000);
    crear_detalle(3, 105, "Duster", 1, 60000);
    crear_detalle(3, 106, "Logan", 1, 15000);

    crear_fila(4, "2025-05-13", 30000, 40000);
    crear_detalle(4, 107, "Clio", 2, 15000);

    crear_fila(5, "2025-05-14", 60000, 75000);
    crear_detalle(5, 108, "Stepway", 2, 30000);
    crear_detalle(5, 109, "Captur", 1, 15000);

    crear_fila(6, "2025-05-15", 120000, 150000);
    crear_detalle(6, 110, "Oroch", 1, 120000);
    crear_detalle(6, 111, "Alaskan", 1, 30000);

    crear_fila(7, "2025-05-16", 20000, 25000);
    crear_detalle(7, 112, "Symbol", 1, 20000);

    crear_fila(8, "2025-05-17", 90000, 100000);
    crear_detalle(8, 113, "Koleos", 2, 45000);

    renderizar_filas();
}

function renderizar_filas() {
    const tabla = document.getElementById("tabla_registro");

    // Eliminamos filas anteriores excepto encabezado
    const encabezado = document.getElementById("fila_encabezado_registro");
    while (tabla.children.length > 1) {
        tabla.removeChild(tabla.lastChild);
    }

    for (let i = 0; i < filas_ventas.length; i++) {
        const fila = filas_ventas[i];
        const id_venta = parseInt(fila.id.replace("venta_", ""));
        const detalles = venta_detalles[id_venta];

        if (detalles.length > 0) {
            // Agregamos celdas rowspan a la primera fila de detalles
            const primera_fila = detalles[0];
            fila._rowspan_celdas[0].rowSpan = detalles.length;
            fila._rowspan_celdas[1].rowSpan = detalles.length;
            fila._rowspan_celdas[2].rowSpan = detalles.length;
            fila._rowspan_celdas[3].rowSpan = detalles.length;

            primera_fila.insertBefore(fila._rowspan_celdas[0], primera_fila.firstChild);
            primera_fila.insertBefore(fila._rowspan_celdas[1], primera_fila.firstChild.nextSibling);
            primera_fila.appendChild(fila._rowspan_celdas[2]);
            primera_fila.appendChild(fila._rowspan_celdas[3]);
        }

        // Agregamos la clase "Ultima_fila_venta" a la última fila de los detalles
        const ultima_fila = detalles[detalles.length - 1];
        if (ultima_fila) {
            ultima_fila.classList.add("Ultima_fila_venta");
        }

        // Insertar las filas de detalles en el DOM
        for (let d of detalles) {
            tabla.appendChild(d);
        }
    }
}


function ordenar_ventas(forzar_criterio, forzar_orden) { //el criterio y el orden se fuerzan sólo al iniciar la página
    
    let criterio;
    let orden;

    if(forzar_criterio) {
        criterio = forzar_criterio;
    }
    else {
        criterio = document.getElementById("ventas_select_criterio").value;
    }
    if(forzar_orden) {
        orden = forzar_orden;
    }
    else {
        orden = document.getElementById("ventas_select_orden").value;
    }
    

    let comparar;

    if (criterio === "fecha") {
        comparar = (a, b) => new Date(a._rowspan_celdas[1].innerHTML) - new Date(b._rowspan_celdas[1].innerHTML);
    } else if (criterio === "id") {
        comparar = (a, b) => parseInt(a.id.replace("venta_", "")) - parseInt(b.id.replace("venta_", ""));
    } else if (criterio === "total") {
        comparar = (a, b) => parseFloat(a._rowspan_celdas[3].innerHTML) - parseFloat(b._rowspan_celdas[3].innerHTML);
    }

    if (orden === "descendente") {
        filas_ventas.sort((a, b) => -comparar(a, b));
    } else {
        filas_ventas.sort(comparar);
    }

    renderizar_filas();
}
