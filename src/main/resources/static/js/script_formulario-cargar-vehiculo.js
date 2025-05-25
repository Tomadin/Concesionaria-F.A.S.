document.addEventListener("DOMContentLoaded", function () {
    const select_modelo = document.getElementById("F1_modelo");
    const select_version = document.getElementById("F1_version");

    let modelosData = [];
    let imagen_valida = false;

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
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "--Seleccione una versión--";
            select_version.appendChild(opcionDefault);
            return;
        }

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

    // Función para vista previa de imagen
    window.preview_de_imagen = function () {
        const extensionesValidas = /(\.jpg|\.jpeg|\.png)$/i;
        const f_imagen = document.getElementById("F1_imagen");
        const preview = document.getElementById("F1_imagen_preview");

        if (!f_imagen || !extensionesValidas.exec(f_imagen.value)) {
            alert("El formato de la imagen debe ser .jpg, .jpeg o .png");
            preview.src = "images/imagen-placeholder-para-autos.jpg";
            f_imagen.value = "";
            imagen_valida = false;
        } else {
            preview.src = URL.createObjectURL(f_imagen.files[0]);
            imagen_valida = true;
        }
    };

    // Enviar datos
    document.getElementById("F1_boton_submit").addEventListener("click", function () {

        if (!imagen_valida) {
            alert("La imagen debe ser .jpg, .jpeg o .png");
            return;
        }

        const imagenInput = document.getElementById('F1_imagen');
        const imagenFile = imagenInput.files[0];

        let matricula_var = document.getElementById('F1_matricula').value?.trim() || "-";

        const formData = new FormData();

        const modeloIdSeleccionado = document.getElementById('F1_modelo').value;
        const modeloSeleccionado = modelosData.find(m => m.id == modeloIdSeleccionado);

        if (!modeloSeleccionado) {
            alert("Modelo no válido.");
            return;
        }

        formData.append('modelo', modeloIdSeleccionado);
        formData.append('version', document.getElementById('F1_version').value);
        formData.append('proveedor', document.getElementById('F1_proveedor').value);
        formData.append('matricula', matricula_var);
        formData.append('precio', parseFloat(document.getElementById('F1_precio').value));
        formData.append('color', document.getElementById('F1_color').value);
        formData.append('anio', parseInt(document.getElementById('F1_anio').value, 10));
        formData.append('serie', document.getElementById('F1_serie').value);
        formData.append('cantPuertas', modeloSeleccionado.cantPuertas); // <--- clave
        formData.append('estado', "DISPONIBLE");
        formData.append('motor',document.getElementById('v_c_motor').value);
        formData.append('carroceria',document.getElementById('v_c_carroceria').value);
        formData.append('transmision',document.getElementById('v_c_transmision').value);
        formData.append('cantpuertas',document.getElementById('v_c_puertas').value);
        

        
        if (imagenFile) {
            formData.append('imagen', imagenFile);
        }



        fetch('http://localhost:8080/autos/crear', {
            method: 'POST',
            body: formData
        })
                .then(response => {
                    if (!response.ok)
                        throw new Error('Error en el servidor');
                    return response.json();
                })
                .then(result => {
                    alert('Vehiculo cargado con éxito');
                    console.log(result);
                })
                .catch(error => {
                    alert('Error al enviar el vehiculo');
                    console.error(error);
                });
    });
});

