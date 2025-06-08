// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const select_modelo = document.getElementById("F1_modelo");
    const select_version = document.getElementById("F1_version");

    let modelosData = []; // Array para almacenar los modelos obtenidos del backend
    let imagen_valida = false; // Bandera para controlar si la imagen es válida

    // Solicita los modelos desde el servidor y los carga en el <select>
    fetch("http://localhost:8080/api/modelos")
        .then(response => response.json())
        .then(data => {
            modelosData = data; // Guarda los modelos obtenidos

            select_modelo.innerHTML = ""; // Limpia el <select> de modelos
            const op = document.createElement("option");
            op.value = "";
            op.textContent = "--Seleccione un modelo--"; // Opción por defecto
            select_modelo.appendChild(op);

            // Agrega cada modelo como opción al <select>
            data.forEach(modelo => {
                const option = document.createElement("option");
                option.value = modelo.id;
                option.textContent = modelo.nombre;
                select_modelo.appendChild(option);
            });

            // Inicializa el <select> de versiones
            select_version.innerHTML = "<option value=''>--Seleccione una versión--</option>";
        })
        .catch(error => {
            // En caso de error al cargar los modelos
            console.error("Error al cargar modelos:", error);
            select_modelo.innerHTML = "<option>Error al cargar modelos</option>";
        });

    // Evento que se ejecuta cuando se cambia el modelo seleccionado
    select_modelo.addEventListener("change", function () {
        const modeloIdSeleccionado = this.value;
        select_version.innerHTML = ""; // Limpia las versiones

        if (!modeloIdSeleccionado) {
            // Si no se seleccionó un modelo, muestra opción por defecto
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "--Seleccione una versión--";
            select_version.appendChild(opcionDefault);
            return;
        }

        // Busca el modelo seleccionado en los datos cargados
        const modeloSeleccionado = modelosData.find(m => m.id == modeloIdSeleccionado);

        if (modeloSeleccionado && modeloSeleccionado.version) {
            // Si el modelo tiene versión, la agrega como opción
            const opcionVersion = document.createElement("option");
            opcionVersion.value = modeloSeleccionado.version;
            opcionVersion.textContent = modeloSeleccionado.version;
            select_version.appendChild(opcionVersion);
        } else {
            // Si no hay versión, muestra mensaje correspondiente
            const opcionDefault = document.createElement("option");
            opcionDefault.value = "";
            opcionDefault.textContent = "--Sin versión disponible--";
            select_version.appendChild(opcionDefault);
        }
    });

    // Función para mostrar la vista previa de la imagen seleccionada
    window.preview_de_imagen = function () {
        const extensionesValidas = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
        const f_imagen = document.getElementById("F1_imagen");
        const preview = document.getElementById("F1_imagen_preview");

        if (!f_imagen || !extensionesValidas.exec(f_imagen.value)) {
            // Si el formato no es válido, muestra mensaje de error
            alert("El formato de la imagen debe ser .jpg, .jpeg, .png o .webp");
            preview.src = "images/imagen-placeholder-para-autos.jpg"; // Imagen por defecto
            f_imagen.value = ""; // Limpia el input
            imagen_valida = false;
        } else {
            // Si es válida, muestra la vista previa
            preview.src = URL.createObjectURL(f_imagen.files[0]);
            imagen_valida = true;
        }
    };

    // Evento para el botón de envío de formulario
    document.getElementById("F1_boton_submit").addEventListener("click", function (event) {

        event.preventDefault(); // Previene el envío estándar del formulario

        if (!imagen_valida) {
            // Verifica si la imagen cargada es válida
            alert("La imagen debe ser .jpg, .jpeg, .png o .webp");
            return;
        }

        const imagenInput = document.getElementById('F1_imagen');
        const imagenFile = imagenInput.files[0];

        // Obtiene la matrícula o usa un valor por defecto
        let matricula_var = document.getElementById('F1_matricula').value?.trim() || "-";

        const formData = new FormData(); // Crea el objeto FormData para enviar los datos

        // Busca el modelo seleccionado en los datos previamente cargados
        const modeloIdSeleccionado = document.getElementById('F1_modelo').value;
        const modeloSeleccionado = modelosData.find(m => m.id == modeloIdSeleccionado);

        if (!modeloSeleccionado) {
            // Verifica que se haya seleccionado un modelo válido
            alert("Modelo no válido.");
            return;
        }

        // Agrega todos los campos al FormData
        formData.append('modelo', modeloIdSeleccionado);
        formData.append('version', document.getElementById('F1_version').value);
        formData.append('proveedor', document.getElementById('F1_proveedor').value);
        formData.append('matricula', matricula_var);
        formData.append('precio', parseFloat(document.getElementById('F1_precio').value));
        formData.append('color', document.getElementById('F1_color').value);
        formData.append('anio', parseInt(document.getElementById('F1_anio').value, 10));
        formData.append('serie', document.getElementById('F1_serie').value);
        formData.append('cantPuertas', modeloSeleccionado.cantPuertas); // Extrae del modelo
        formData.append('estado', "DISPONIBLE"); // Estado por defecto
        formData.append('motor', modeloSeleccionado.motor);
        formData.append('carroceria', modeloSeleccionado.carroceria);
        formData.append('transmision', modeloSeleccionado.transmision);
        formData.append('cantpuertas', modeloSeleccionado.cantPuertas);

        // Agrega el archivo de imagen si está presente
        if (imagenFile) {
            formData.append('imagen', imagenFile);
        }

        // Envío de los datos al servidor
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
                alert('Vehiculo cargado con éxito'); // Mensaje de éxito
                console.log(result); 
            })
            .catch(error => {
                alert('Error al enviar el vehiculo'); // Mensaje de error
                console.error(error); 
            });
    });
});
