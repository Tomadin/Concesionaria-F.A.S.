// Variables globales
var filas_ventas = []; // array con los elementos HTML <tr> de cada venta, incluye detalles
var venta_detalles = {}; // diccionario con clave de id_venta y como valor un array con arrays de detalles

async function cargarRegistro() {
    filas_ventas = [];
    venta_detalles = {};

    try {
        const response = await fetch("http://localhost:8080/api/venta/listar");
        if (!response.ok) throw new Error("Error al cargar ventas");

        const ventas = await response.json();

        ventas.forEach(venta => {

            let cantidad_autos = 0;
            let precio_subtotal = 0;
            venta.vehiculos.forEach(auto => {
                cantidad_autos ++;

                const floatPrecio = parseFloat(auto.precio);
                precio_subtotal += floatPrecio;
            });
            const precio_total = precio_subtotal * 1.21;

            crear_fila(
                venta.id, 
                venta.fecha, 
                precio_subtotal.toFixed(2), 
                precio_total.toFixed(2), 
                venta.dni_cliente,
                venta.dni_empleado,
                venta.metodo_pago,
                venta.observaciones
            );

            venta.vehiculos.forEach(auto => {
                crear_detalle(venta.id, auto.id, auto.modelo.nombre, cantidad_autos, auto.precio, auto.version, auto.color);
            });
        });

    } catch (error) {
        console.error("Hubo un error al obtener las ventas:", error);
    }
    ordenar_ventas("fecha", "descendente"); 
}

function crear_fila(id_venta, fecha, subtotal, total, dni_cliente, dni_empleado, metodo_pago, observaciones) {
    const fila = document.createElement("tr");
    fila.className = "Fila_venta";
    fila.id = "venta_" + id_venta;

    const celda = (contenido, clase = "Celda_venta", rowspan = 1) => {
        const td = document.createElement("td");
        td.innerHTML = contenido;
        td.rowSpan = rowspan;
        td.className = clase;
        return td;
    };

    const celda_obs = document.createElement("td");
    celda_obs.className = "Celda_venta observaciones";
    celda_obs.title = observaciones;
    celda_obs.innerHTML = "🛈";
    celda_obs.rowSpan = 1;

    // Guardamos la fila
    filas_ventas.push(fila);
    venta_detalles[id_venta] = [];

    fila._rowspan_celdas = [
        celda(id_venta), celda(fecha), celda(subtotal), celda(total),
        celda(dni_cliente), celda(dni_empleado), celda(metodo_pago), celda_obs
    ];
}

function crear_detalle(id_venta, id_vehiculo, modelo, cantidad, precio_unitario, version = "-", color = "-") {
    const fila_detalle = document.createElement("tr");

    const celdas = [
        id_vehiculo, modelo, cantidad, precio_unitario, version, color
    ].map(val => {
        const td = document.createElement("td");
        td.innerHTML = val;
        return td;
    });

    celdas.forEach(td => fila_detalle.appendChild(td));
    venta_detalles[id_venta].push(fila_detalle);
}


function renderizar_filas() {
    const tabla = document.getElementById("tabla_registro");
    const encabezado = document.getElementById("fila_encabezado_registro");

    while (tabla.children.length > 1) {
        tabla.removeChild(tabla.lastChild);
    }

    for (let fila of filas_ventas) {
        const id_venta = parseInt(fila.id.replace("venta_", ""));
        const detalles = venta_detalles[id_venta];

        if (detalles.length > 0) {
            const primera = detalles[0];

            fila._rowspan_celdas.forEach((celda, i) => {
                celda.rowSpan = detalles.length;
                if (i <= 1) primera.insertBefore(celda, primera.firstChild);
                else primera.appendChild(celda);
            });
        }

        const ultima = detalles[detalles.length - 1];
        if (ultima) ultima.classList.add("Ultima_fila_venta");

        for (let d of detalles) {
            tabla.appendChild(d);
        }
    }
}

function ordenar_ventas(forzar_criterio, forzar_orden) {
    let criterio = forzar_criterio || document.getElementById("ventas_select_criterio").value;
    let orden = forzar_orden || document.getElementById("ventas_select_orden").value;

    let comparar;

    const extraerTexto = (fila, index) => fila._rowspan_celdas[index]?.innerHTML ?? "";

    switch (criterio) {
        case "fecha":
            comparar = (a, b) => new Date(extraerTexto(a, 1)) - new Date(extraerTexto(b, 1));
            break;
        case "id":
            comparar = (a, b) => parseInt(extraerTexto(a, 0)) - parseInt(extraerTexto(b, 0));
            break;
        case "total":
            comparar = (a, b) => parseFloat(extraerTexto(a, 3)) - parseFloat(extraerTexto(b, 3));
            break;
        case "dni_cliente":
            comparar = (a, b) => extraerTexto(a, 4).localeCompare(extraerTexto(b, 4));
            break;
        case "dni_empleado":
            comparar = (a, b) => extraerTexto(a, 5).localeCompare(extraerTexto(b, 5));
            break;
        case "metodo_pago":
            comparar = (a, b) => extraerTexto(a, 6).localeCompare(extraerTexto(b, 6));
            break;
        case "cantidad_de_detalles":
            comparar = (a, b) => venta_detalles[a.id.replace("venta_", "")].length -
                                venta_detalles[b.id.replace("venta_", "")].length;
            break;
        case "longitud_observaciones":
            comparar = (a, b) => {
                const obsA = a._rowspan_celdas[7]?.title ?? "";
                const obsB = b._rowspan_celdas[7]?.title ?? "";
                return obsA.length - obsB.length;
            };
            break;
        default:
            comparar = () => 0;
    }

    if (orden === "descendente") {
        filas_ventas.sort((a, b) => -comparar(a, b));
    } else {
        filas_ventas.sort(comparar);
    }

    renderizar_filas();
}