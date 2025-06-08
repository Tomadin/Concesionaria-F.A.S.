// Variables globales
var filas_ventas = []; // Array que almacena los elementos <tr> correspondientes a cada venta (filas principales)
var venta_detalles = {}; // Diccionario: clave es el id de la venta y valor es un array de filas de detalles (autos vendidos)

// Función principal para cargar y procesar el registro de ventas
async function cargarRegistro() {
    filas_ventas = []; // Reinicia el array de filas
    venta_detalles = {}; // Reinicia el diccionario de detalles

    try {
        // Llamada a la API para obtener la lista de ventas
        const response = await fetch("http://localhost:8080/api/venta/listar");
        if (!response.ok) throw new Error("Error al cargar ventas");

        const ventas = await response.json(); // Parsear respuesta como JSON

        // Procesar cada venta recibida
        ventas.forEach(venta => {
            let cantidad_autos = 0;
            let precio_subtotal = 0;

            // Calcular la cantidad de autos y el subtotal
            venta.vehiculos.forEach(auto => {
                cantidad_autos++;
                const floatPrecio = parseFloat(auto.precio);
                precio_subtotal += floatPrecio;
            });

            const precio_total = precio_subtotal * 1.21; // Aplicar IVA (21%)

            // Crear fila principal de la venta
            crear_fila(
                venta.id,
                formatearFecha(venta.fecha),
                cantidad_autos,
                precio_subtotal.toFixed(2),
                precio_total.toFixed(2),
                venta.dni_cliente,
                venta.dni_empleado,
                venta.metodo_pago,
                venta.observaciones
            );

            // Crear detalles (una fila por cada auto en la venta)
            venta.vehiculos.forEach(auto => {
                crear_detalle(venta.id, auto.id, auto.modelo.nombre, auto.precio, auto.version, auto.color);
            });
        });

    } catch (error) {
        // Manejo de errores al cargar ventas
        console.error("Hubo un error al obtener las ventas:", error);
    }

    // Ordenar las ventas por fecha descendente por defecto
    ordenar_ventas("fecha", "descendente");
}

// Crea una fila principal para una venta
function crear_fila(id_venta, fecha, cantidad, subtotal, total, dni_cliente, dni_empleado, metodo_pago, observaciones) {
    const fila = document.createElement("tr");
    fila.className = "Fila_venta";
    fila.id = "venta_" + id_venta;

    // Función interna para crear una celda
    const celda = (contenido, clase = "Celda_venta", rowspan = 1) => {
        const td = document.createElement("td");
        td.innerHTML = contenido;
        td.rowSpan = rowspan;
        td.className = clase;
        return td;
    };

    // Celda para observaciones (ícono informativo)
    const celda_obs = document.createElement("td");
    celda_obs.className = "Celda_venta observaciones";
    celda_obs.title = observaciones;
    celda_obs.innerHTML = "🛈";
    celda_obs.rowSpan = 1;

    // Guardar la fila principal y preparar su array de detalles
    filas_ventas.push(fila);
    venta_detalles[id_venta] = [];

    // Guardar las celdas principales para agregarlas luego
    fila._rowspan_celdas = [
        celda(fecha),
        celda(cantidad),
        celda(id_venta),
        celda(subtotal),
        celda(total),
        celda(dni_cliente),
        celda(dni_empleado),
        celda(metodo_pago),
        celda_obs
    ];

    const fechaDate = new Date(fecha);

    // Guardar datos útiles para ordenamiento
    fila._datos = {
        fecha: fechaDate,
        cantidad: parseInt(cantidad),
        id_venta: parseInt(id_venta),
        subtotal: parseFloat(subtotal),
        total: parseFloat(total),
        dni_cliente,
        dni_empleado,
        metodo_pago,
        observaciones
    };
}

// Crea una fila de detalle correspondiente a un vehículo vendido
function crear_detalle(id_venta, id_vehiculo, modelo, precio_unitario, version = "-", color = "-") {
    const fila_detalle = document.createElement("tr");

    // Crear celdas de detalle
    const celdas = [
        id_vehiculo, modelo, precio_unitario, version, color
    ].map(val => {
        const td = document.createElement("td");
        td.innerHTML = val;
        return td;
    });

    // Agregar celdas a la fila
    celdas.forEach(td => fila_detalle.appendChild(td));

    // Agregar fila al array correspondiente a esa venta
    venta_detalles[id_venta].push(fila_detalle);
}

// Renderiza todas las filas (ventas + detalles) en la tabla del DOM
function renderizar_filas() {
    const tabla = document.getElementById("tabla_registro");
    const encabezado = document.getElementById("fila_encabezado_registro");

    // Eliminar todas las filas anteriores (excepto encabezado)
    while (tabla.children.length > 1) {
        tabla.removeChild(tabla.lastChild);
    }

    // Agregar filas ordenadas nuevamente
    for (let fila of filas_ventas) {
        const id_venta = parseInt(fila.id.replace("venta_", ""));
        const detalles = venta_detalles[id_venta];

        if (detalles.length > 0) {
            const primera = detalles[0];

            // Insertar celdas principales en la primera fila de detalle
            fila._rowspan_celdas.forEach((celda, i) => {
                celda.rowSpan = detalles.length;
                if (i <= 2) primera.insertBefore(celda, primera.firstChild); // ID, fecha, cantidad al inicio
                else primera.appendChild(celda); // Resto al final
            });
        }

        // Agregar clase especial a la última fila de detalles
        const ultima = detalles[detalles.length - 1];
        if (ultima) ultima.classList.add("Ultima_fila_venta");

        // Agregar cada fila de detalle al DOM
        for (let d of detalles) {
            tabla.appendChild(d);
        }
    }
}

// Ordena las ventas según el criterio y orden seleccionados
function ordenar_ventas(forzar_criterio, forzar_orden) {
    // Obtener valores del DOM o usar los forzados
    let criterio = forzar_criterio || document.getElementById("ventas_select_criterio").value;
    let orden = forzar_orden || document.getElementById("ventas_select_orden").value;

    let comparar;

    // Definir función de comparación según el criterio
    switch (criterio) {
        case "fecha":
            comparar = (a, b) => new Date(a._datos.fecha).getTime() - new Date(b._datos.fecha).getTime();
            break;
        case "cantidad":
            comparar = (a, b) => parseInt(a._datos.cantidad) - parseInt(b._datos.cantidad);
            break;
        case "id":
            comparar = (a, b) => parseInt(a._datos.id_venta) - parseInt(b._datos.id_venta);
            break;
        case "subtotal":
            comparar = (a, b) => parseFloat(a._datos.subtotal) - parseFloat(b._datos.subtotal);
            break;
        case "total":
            comparar = (a, b) => parseFloat(a._datos.total) - parseFloat(b._datos.total);
            break;
        case "dni_cliente":
            comparar = (a, b) => parseInt(a._datos.dni_cliente) - parseInt(b._datos.dni_cliente);
            break;
        case "dni_empleado":
            comparar = (a, b) => parseInt(a._datos.dni_empleado) - parseInt(b._datos.dni_empleado);
            break;
        case "metodo_pago":
            comparar = (a, b) => a._datos.metodo_pago.localeCompare(b._datos.metodo_pago);
            break;
        case "longitud_observaciones":
            comparar = (a, b) => (a._datos.observaciones || "").length - (b._datos.observaciones || "").length;
            break;
        case "cantidad_de_detalles":
            comparar = (a, b) => {
                const idA = parseInt(a._datos.id_venta);
                const idB = parseInt(b._datos.id_venta);
                return (venta_detalles[idA]?.length || 0) - (venta_detalles[idB]?.length || 0);
            };
            break;
        default:
            comparar = () => 0;
    }

    // Aplicar orden ascendente o descendente
    if (orden === "descendente") {
        filas_ventas.sort((a, b) => -comparar(a, b));
    } else {
        filas_ventas.sort(comparar);
    }

    // Volver a renderizar las filas ordenadas
    renderizar_filas();
}

// Formatea una fecha ISO a un formato legible en español (Argentina)
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    if (isNaN(fecha)) return fechaISO; // Si no es una fecha válida, se retorna el texto original
    
    // Devuelve la fecha formateada con hora completa
    return fecha.toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
