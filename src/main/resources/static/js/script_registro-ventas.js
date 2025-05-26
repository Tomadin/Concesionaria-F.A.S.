// Variables globales
var filas_ventas = []; // array con los elementos HTML <tr> de cada venta, incluye detalles
var venta_detalles = {}; // diccionario con clave de id_venta y como valor un array con arrays de detalles

async function cargarRegistro() {
    filas_ventas = [];
    venta_detalles = {};
    debug_llenar_filas(); // SE DEBE COMENTAR ESTA LÍNEA UNA VEZ LISTA LA CONEXIÓN DEBAJO

    /*
    try {
        const response = await fetch("http://localhost:8080/ventas/listar"); // 
        if (!response.ok) throw new Error("Error al cargar ventas");

        const ventas = await response.json();

        ventas.forEach(venta => {
            const { id, fecha, subtotal, total, detalles } = venta;
            crear_fila(id, fecha, subtotal, total);

            detalles.forEach(det => {
                crear_detalle(id, det.idVehiculo, det.modelo, det.cantidad, det.precioUnitario, det.version, det.color);
            });
        });

    } catch (error) {
        console.error("Hubo un error al obtener las ventas:", error);
    }*/
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

function debug_llenar_filas() {
    filas_ventas = [];
    venta_detalles = {};

    crear_fila(1, "2025-05-10", 5000000, 6000000, "30123456", "40234567", "Efectivo", "Cliente frecuente.");
    crear_detalle(1, 101, "Kangoo", 2, 2500000, "Zen", "Blanco");
    crear_detalle(1, 102, "Logan", 1, 1000000, "Life", "Gris");

    crear_fila(2, "2025-05-11", 7000000, 8000000, "31234567", "40112233", "Tarjeta", "Compró luego de test drive.");
    crear_detalle(2, 103, "Duster", 1, 7000000, "Intens", "Negro");

    crear_fila(3, "2025-05-12", 8500000, 10000000, "32223344", "40998877", "Transferencia", "Solicitó pintura especial.");
    crear_detalle(3, 104, "Sandero", 1, 2500000, "Zen", "Rojo");
    crear_detalle(3, 105, "Duster", 1, 6000000, "Iconic", "Azul");
    crear_detalle(3, 106, "Logan", 1, 1500000, "Intens", "Gris");

    crear_fila(4, "2025-05-13", 9000000, 9000000, "30111222", "40888888", "Débito", "Cliente nuevo con referencias.");
    crear_detalle(4, 107, "Alaskan", 1, 9000000, "Outsider", "Negro");

    crear_fila(5, "2025-05-14", 7600000, 7600000, "30999999", "40777777", "Efectivo", "Compra rápida, sin test drive.");
    crear_detalle(5, 108, "Captur", 1, 7600000, "Intens", "Gris Estrella");

    crear_fila(6, "2025-05-15", 12000000, 13500000, "33444555", "40333333", "Transferencia", "Cliente corporativo. Requiere factura A. Envío programado para dentro de 15 días con entrega en sucursal Godoy Cruz.");
    crear_detalle(6, 109, "Kangoo", 2, 6000000, "Express", "Blanco");
    crear_detalle(6, 110, "Oroch", 1, 7500000, "Iconic", "Verde");

    crear_fila(7, "2025-05-16", 5000000, 5000000, "36666777", "40666666", "Crédito", "Primera compra, cliente joven.");
    crear_detalle(7, 111, "Stepway", 1, 5000000, "Zen", "Naranja");

    crear_fila(8, "2025-05-17", 6500000, 6500000, "35555666", "40555555", "Efectivo", "Cliente habitual. Compra para su hijo.");
    crear_detalle(8, 112, "Sandero", 1, 6500000, "Intens", "Rojo Fuego");

    crear_fila(9, "2025-05-18", 3000000, 3000000, "34444555", "40444444", "Tarjeta", "Solicita accesorios adicionales.");
    crear_detalle(9, 113, "Logan", 1, 3000000, "Life", "Negro");

    crear_fila(10, "2025-05-19", 15500000, 17000000, "39999888", "40999999", "Transferencia", "Venta especial para empresa con condiciones pactadas previamente. Incluye servicio postventa y mantenimiento por 12 meses.");
    crear_detalle(10, 114, "Alaskan", 2, 7750000, "Iconic", "Blanco Glaciar");

    renderizar_filas();
}
