
document.addEventListener("DOMContentLoaded", function () {
    const select_modelo = document.getElementById("F1_modelo");
    const select_version = document.getElementById("F1_version");

    let modelosData = [];

    // Cargo modelos y guardo data para usar luego
    fetch("http://localhost:8080/api/modelos")
        .then(response => response.json())
        .then(data => {
            modelosData = data;

            select_modelo.innerHTML = ""; // limpio
            const op = document.createElement("option");
            op.value = "";
            op.textContent = "--Seleccione un modelo--";
            select_modelo.appendChild(op);

            data.forEach(modelo => {
                const option = document.createElement("option");
                option.value = modelo.id;
                option.textContent = modelo.nombre;
                select_modelo.appendChild(option);
            });

            select_version.innerHTML = "<option value=''>--Seleccione una versión--</option>"; // Inicial
        })
        .catch(error => {
            console.error("Error al cargar modelos:", error);
            select_modelo.innerHTML = "<option>Error al cargar modelos</option>";
        });

    // Evento para cambiar versiones cuando seleccionan modelo
    select_modelo.addEventListener("change", function () {
        const modeloIdSeleccionado = this.value;
        select_version.innerHTML = ""; // limpio versiones

        if (!modeloIdSeleccionado) {
            // Si no hay modelo seleccionado, pongo opción por defecto
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "--Seleccione una versión--";
            select_version.appendChild(opcionDefault);
            return;
        }

        // Busco el modelo seleccionado en la data
        const modeloSeleccionado = modelosData.find(m => m.id == modeloIdSeleccionado);

        if (modeloSeleccionado && modeloSeleccionado.version) {
            const opcionVersion = document.createElement("option");
            opcionVersion.value = modeloSeleccionado.version;
            opcionVersion.textContent = modeloSeleccionado.version;
            select_version.appendChild(opcionVersion);
        } else {
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "--Sin versión disponible--";
            select_version.appendChild(opcionDefault);
        }
    });
});
