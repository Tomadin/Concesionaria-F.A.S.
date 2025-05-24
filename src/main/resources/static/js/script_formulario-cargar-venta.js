document.addEventListener("DOMContentLoaded", function () {
    const select_modelo = document.getElementById("F5_select_modelo");
    const select_color = document.getElementById("F5_select_color");
    const formulario = document.getElementById("formulario_venta");

    let modelosData = [];
    let vehiculos = {}; // Diccionario de autos clave modeloID_color
    let vehiculos_a_comprar = {}; // Clave modeloID_color => [cantidad, precio]

    // Cargar datos de vehículos al inicio
    fetch("http://localhost:8080/autos/listar")
        .then(response => response.json())
        .then(data => {
            modelosData = data;
            const coloresSet = new Set();

            data.forEach(auto => {
                const modeloId = auto.modelo.id;
                const modeloNombre = auto.modelo.nombre;

                // Modelo
                if (![...select_modelo.options].some(opt => opt.value === String(modeloId))) {
                    const modeloOption = document.createElement("option");
                    modeloOption.value = modeloId;
                    modeloOption.textContent = modeloNombre;
                    select_modelo.appendChild(modeloOption);
                }

                // Color
                if (!coloresSet.has(auto.color)) {
                    const colorOption = document.createElement("option");
                    colorOption.value = auto.color;
                    colorOption.textContent = auto.color;
                    select_color.appendChild(colorOption);
                    coloresSet.add(auto.color);
                }

                // Diccionario vehiculos con todos los datos completos
                const clave = `${modeloId}_${auto.color}`;
                vehiculos[clave] = {
                    id: auto.id,
                    color: auto.color,
                    anioFabricacion: auto.anioFabricacion || auto.AnioFabricacion, // por si hay inconsistencia
                    stock: auto.stock,
                    matricula: auto.matricula,
                    serie: auto.serie,
                    precio: auto.precio,
                    version: auto.version,
                    proveedor: auto.proveedor,
                    kilometraje: auto.kilometraje || auto.Kilometraje || 0,
                    modelo: {
                        id: modeloId,
                        nombre: auto.modelo.nombre,
                        version: auto.modelo.version,
                        carroceria: auto.modelo.carroceria,
                        motor: auto.modelo.motor,
                        transmision: auto.modelo.transmision,
                        cantPuertas: auto.modelo.cantPuertas
                    }
                };
            });
        })
        .catch(error => {
            console.error("Error al cargar vehículos:", error);
            select_modelo.innerHTML = "<option>Error al cargar modelos</option>";
        });

    // Enviar venta
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const listaVehiculos = Object.entries(vehiculos_a_comprar).map(([clave, [cantidad, precio]]) => {
            const [modeloId, color] = clave.split('_');
            const datosVehiculo = vehiculos[clave];

            return {
                id: datosVehiculo.id,
                color: datosVehiculo.color,
                anioFabricacion: datosVehiculo.anioFabricacion,
                stock: datosVehiculo.stock,
                matricula: datosVehiculo.matricula,
                serie: datosVehiculo.serie,
                precio: datosVehiculo.precio,
                version: datosVehiculo.version,
                proveedor: datosVehiculo.proveedor || "renault",
                kilometraje: datosVehiculo.kilometraje || 0,
                modelo: {
                    id: parseInt(modeloId),
                    nombre: datosVehiculo.modelo.nombre,
                    version: datosVehiculo.modelo.version,
                    carroceria: datosVehiculo.modelo.carroceria,
                    motor: datosVehiculo.modelo.motor,
                    transmision: datosVehiculo.modelo.transmision,
                    cantPuertas: datosVehiculo.modelo.cantPuertas
                }
            };
        });

        const data = {
            dni_cliente: parseInt(document.getElementById('F5_dni_cliente').value, 10),
            dni_empleado: parseInt(document.getElementById('F5_dni_empleado').value, 10),
            metodo_pago: document.getElementById('F5_select_metodo_pago').value,
            vehiculos: listaVehiculos,
            observaciones: document.getElementById('F5_observaciones').value
        };

        fetch('http://localhost:8080/api/venta/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en el servidor');
            return response.json();
        })
        .then(result => {
            alert('Venta cargada con éxito');
            console.log(result);
            formulario.reset();
            borrar_todos_vehiculos();
        })
        .catch(error => {
            alert('Error al cargar la venta');
            console.error(error);
        });
    });

    // Agregar vehículo a la tabla
    window.agregar_vehiculo = function () {
        const modelo_agregar = document.getElementById('F5_select_modelo').value;
        const color_agregar = document.getElementById('F5_select_color').value;
        const cantidad = parseInt(document.getElementById('F5_cantidad').value);

        if (cantidad <= 0 || cantidad > 100) {
            alert("La cantidad debe estar entre 1 y 100");
            return;
        }

        if (modelo_agregar === "modelo_default_option" || color_agregar === "color_default_option") {
            alert("Debe elegir un modelo y un color");
            return;
        }

        const clave = `${modelo_agregar}_${color_agregar}`;
        const datosVehiculo = vehiculos[clave];
        if (!datosVehiculo) {
            alert("No se encontraron datos del vehículo seleccionado");
            return;
        }

        const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
        if (vehiculos_a_comprar[clave]) {
            document.getElementById("fila_" + clave).remove();
        }

        vehiculos_a_comprar[clave] = [cantidad, datosVehiculo.precio];

        const nueva_fila = document.createElement("tr");
        nueva_fila.id = "fila_" + clave;

        nueva_fila.innerHTML = `
            <td>${datosVehiculo.modelo.nombre}</td>
            <td>${datosVehiculo.version}</td>
            <td>${color_agregar}</td>
            <td>${cantidad}</td>
            <td>${datosVehiculo.precio}</td>
            <td>${(datosVehiculo.precio * cantidad)}</td>
            <td><input type="button" class="Botones_secundarios" style="width: 80px;" value="Borrar" onclick="borrar_vehiculo('${clave}')"></td>
        `;

        tbody.appendChild(nueva_fila);
        actualizar_subtotal_y_total();
    };

    // Borrar vehículo específico
    window.borrar_vehiculo = function (clave) {
        document.getElementById("fila_" + clave).remove();
        delete vehiculos_a_comprar[clave];
        actualizar_subtotal_y_total();
    };

    // Borrar todos los vehículos
    window.borrar_todos_vehiculos = function () {
        const tbody = document.getElementById("tbody_tabla_vehiculos_agregados");
        Array.from(tbody.children).forEach(fila => {
            if (fila.id !== "F5_fila_encabezado") fila.remove();
        });
        vehiculos_a_comprar = {};
        actualizar_subtotal_y_total();
    };

    // Subtotal y total
    function actualizar_subtotal_y_total() {
        const texto_subtotal = document.getElementById("F5_precio_subtotal");
        const texto_total = document.getElementById("F5_precio_total");

        let subtotal = 0;
        for (let clave in vehiculos_a_comprar) {
            const [cantidad, precio] = vehiculos_a_comprar[clave];
            subtotal += cantidad * precio;
        }

        const total = subtotal * 1.21;
        texto_subtotal.innerHTML = "Subtotal: $" + subtotal.toFixed(2);
        texto_total.innerHTML = "Total (IVA incluído): $" + total.toFixed(2);
    }

    // Mostrar disponibilidad
    window.actualizar_disponibilidad = function () {
        const modelo_id = document.getElementById("F5_select_modelo").value;
        const color = document.getElementById("F5_select_color").value;
        const disponibilidad = document.getElementById("F5_disponibilidad");

        if (modelo_id !== "modelo_default_option" && color !== "color_default_option") {
            const clave = `${modelo_id}_${color}`;
            const datos = vehiculos[clave];
            if (datos) {
                disponibilidad.innerHTML = `Disponibles: ${datos.stock}`;
            } else {
                disponibilidad.innerHTML = `No disponible`;
            }
        } else {
            disponibilidad.innerHTML = "Seleccione un modelo y color para ver la disponibilidad";
        }
    };
});
