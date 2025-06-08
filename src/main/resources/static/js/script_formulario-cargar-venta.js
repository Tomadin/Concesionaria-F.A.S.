// Script para manejar la carga, selección y carrito de vehículos en el sistema de ventas

document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault(); // Prevenir comportamiento por defecto (aunque no es necesario aquí)

    const select_modelo = document.getElementById("F5_select_modelo");
    const select_color = document.getElementById("F5_select_color");
    const formulario = document.getElementById("formulario_venta");

    // VARIABLES GLOBALES
    let modelosData = []; // Todos los modelos recibidos desde la API
    let vehiculos = {}; // Diccionario: clave modelo_color -> array de vehículos disponibles
    let vehiculos_a_comprar = {}; // Diccionario: modelo_color -> array de vehículos seleccionados para comprar

    // CARGAR VEHÍCULOS DESDE API
    fetch("http://localhost:8080/autos/listar")
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            modelosData = data;
            data.forEach(auto => {
                if (auto.estado !== "VENDIDO") { // Filtrar solo los vehículos no vendidos
                    const modeloId = auto.modelo.id;
                    const clave = `${modeloId}_${auto.color}`; // Clave única por modelo y color

                    // Crear array si no existe
                    if (!vehiculos[clave]) {
                        vehiculos[clave] = [];
                    }

                    // Guardar vehículo
                    vehiculos[clave].push({
                        id: auto.id,
                        color: auto.color,
                        anioFabricacion: auto.anioFabricacion || auto.AnioFabricacion,
                        estado: auto.estado,
                        matricula: auto.matricula,
                        serie: auto.serie,
                        precio: auto.precio,
                        version: auto.version,
                        proveedor: auto.proveedor,
                        kilometraje: auto.kilometraje || 0,
                        modelo: auto.modelo
                    });

                    // Cargar modelo si no está aún en el combo
                    if (![...select_modelo.options].some(opt => opt.value === String(modeloId))) {
                        const modeloOption = document.createElement("option");
                        modeloOption.value = modeloId;
                        modeloOption.textContent = auto.modelo.nombre;
                        select_modelo.appendChild(modeloOption);
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar vehículos:", error);
            select_modelo.innerHTML = "<option>Error al cargar modelos</option>";
        });

    // CUANDO SE CAMBIA EL MODELO: cargar colores disponibles
    select_modelo.addEventListener("change", function () {
        const modeloId = select_modelo.value;
        select_color.innerHTML = '<option value="color_default_option">Seleccione un color</option>';

        const coloresUsados = new Set(); // Evitar duplicados

        for (let clave in vehiculos) {
            const [modelo, color] = clave.split("_");
            if (modelo === modeloId && !coloresUsados.has(color)) {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                select_color.appendChild(option);
                coloresUsados.add(color);
            }
        }
    });

    // AGREGAR VEHÍCULO AL CARRITO
    window.agregar_vehiculo = function () {
        const modelo_agregar = document.getElementById('F5_select_modelo').value;
        const color_agregar = document.getElementById('F5_select_color').value;
        const cantidad = parseInt(document.getElementById('F5_cantidad').value);

        // Validaciones
        if (cantidad <= 0 || cantidad > 100) {
            alert("La cantidad debe estar entre 1 y 100");
            return;
        }
        if (modelo_agregar === "modelo_default_option" || color_agregar === "color_default_option") {
            alert("Debe elegir un modelo y un color");
            return;
        }

        const clave = `${modelo_agregar}_${color_agregar}`;
        const disponibles = vehiculos[clave];
        if (!disponibles || disponibles.length === 0) {
            alert("No hay vehículos disponibles para ese modelo y color");
            return;
        }

        // Inicializar array si no existe
        if (!vehiculos_a_comprar[clave]) vehiculos_a_comprar[clave] = [];

        const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
        const agregados = vehiculos_a_comprar[clave].map(v => v.id);
        let agregadosEnEsteLote = 0;

        for (let vehiculo of disponibles) {
            if (!agregados.includes(vehiculo.id)) {
                vehiculos_a_comprar[clave].push(vehiculo);
                agregadosEnEsteLote++;

                const fila = document.createElement("tr");
                fila.dataset.clave = clave;
                fila.dataset.vehiculoId = vehiculo.id;
                fila.innerHTML = `
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.modelo.nombre}</td>
                    <td>${vehiculo.version}</td>
                    <td>${vehiculo.color}</td>
                    <td>${vehiculo.precio}</td>
                    <td>${vehiculo.precio}</td>
                    <td><input type="button" class="Botones_secundarios" style="width: 80px;" value="Borrar" onclick="borrar_vehiculo_individual(${vehiculo.id}, '${clave}')"></td>
                `;
                tbody.appendChild(fila);
            }
            if (agregadosEnEsteLote >= cantidad) break;
        }

        actualizar_subtotal_y_total(); // Actualizar los totales
    };

    // BORRAR UN VEHÍCULO INDIVIDUAL
    window.borrar_vehiculo_individual = function (id, clave) {
        const fila = document.querySelector(`tr[data-vehiculo-id='${id}']`);
        if (fila) fila.remove();

        if (vehiculos_a_comprar[clave]) {
            vehiculos_a_comprar[clave] = vehiculos_a_comprar[clave].filter(v => v.id !== id);
            if (vehiculos_a_comprar[clave].length === 0) delete vehiculos_a_comprar[clave];
        }

        actualizar_subtotal_y_total();
    };

    // BORRAR ÚLTIMO VEHÍCULO AGREGADO
    window.borrar_ultimo_vehiculo = function () {
        const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
        const filas = Array.from(tbody.querySelectorAll("tr")).reverse(); // Orden inverso para borrar el último

        for (const fila of filas) {
            const id = parseInt(fila.dataset.vehiculoId);
            const clave = fila.dataset.clave;

            if (!isNaN(id) && clave) {
                fila.remove();

                if (vehiculos_a_comprar[clave]) {
                    vehiculos_a_comprar[clave] = vehiculos_a_comprar[clave].filter(v => v.id !== id);
                    if (vehiculos_a_comprar[clave].length === 0) delete vehiculos_a_comprar[clave];
                }

                break; // Solo borra uno
            }
        }

        actualizar_subtotal_y_total();
    };

    // BORRAR TODOS LOS VEHÍCULOS DEL CARRITO
    window.borrar_todos_vehiculos = function () {
        const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
        Array.from(tbody.children).forEach(fila => {
            if (fila.id !== "F5_fila_encabezado") fila.remove(); // Mantiene la fila de encabezado
        });

        vehiculos_a_comprar = {}; // Vacía el carrito
        actualizar_subtotal_y_total();
    };

    // ACTUALIZAR SUBTOTAL Y TOTAL
    function actualizar_subtotal_y_total() {
        const texto_subtotal = document.getElementById("F5_precio_subtotal");
        const texto_total = document.getElementById("F5_precio_total");

        let subtotal = 0;
        for (let clave in vehiculos_a_comprar) {
            vehiculos_a_comprar[clave].forEach(auto => subtotal += auto.precio);
        }

        const total = subtotal * 1.21; // Aplicar IVA (21%)
        texto_subtotal.innerHTML = "Subtotal: $" + subtotal.toFixed(2);
        texto_total.innerHTML = "Total (IVA incluído): $" + total.toFixed(2);
    }

    // ENVÍO DEL FORMULARIO DE VENTA
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const dniCliente = parseInt(document.getElementById('F5_dni_cliente').value, 10);

        // Buscar cliente por DNI
        fetch(`http://localhost:8080/api/cliente/buscar?dni=${dniCliente}`)
            .then(res => {
                if (!res.ok) throw new Error("Cliente no encontrado");
                return res.json();
            })
            .then(cliente => {
                const listaVehiculos = [];
                for (let clave in vehiculos_a_comprar) {
                    vehiculos_a_comprar[clave].forEach(v => listaVehiculos.push(v));
                }

                const data = {
                    dni_cliente: dniCliente,
                    dni_empleado: parseInt(document.getElementById('F5_dni_vendedor').value, 10),
                    metodo_pago: document.getElementById('F5_select_metodo_pago').value,
                    vehiculos: listaVehiculos,
                    observaciones: document.getElementById('F5_observaciones').value
                };

                return fetch('http://localhost:8080/api/venta/crear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            })
            .then(response => {
                if (!response.ok) throw new Error('Error en el servidor');
                return response.json();
            })
            .then(result => {
                alert('Venta cargada con éxito');
                formulario.reset();
                borrar_todos_vehiculos(); // Vaciar carrito tras venta
            })
            .catch(error => {
                alert(error.message);
                console.error(error);
            });
    });

    // MOSTRAR DISPONIBILIDAD
    window.actualizar_disponibilidad = function () {
        const modelo_id = document.getElementById("F5_select_modelo").value;
        const color = document.getElementById("F5_select_color").value;
        const disponibilidad = document.getElementById("F5_disponibilidad");

        if (modelo_id !== "modelo_default_option" && color !== "color_default_option") {
            const clave = `${modelo_id}_${color}`;
            const datos = vehiculos[clave];
            if (datos && datos.length > 0) {
                disponibilidad.innerHTML = `Disponible (${datos.length} disponibles)`;
            } else {
                disponibilidad.innerHTML = `No disponible`;
            }
        } else {
            disponibilidad.innerHTML = "Seleccione un modelo y color para ver la disponibilidad";
        }
    };
});
