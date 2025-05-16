var imagen_valida = false;

document.getElementById('formulario_vehiculo').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    if (!imagen_valida) {
        alert("La imagen debe ser .jpg, .jpeg o .png");
        return;
    }

    const imagenInput = document.getElementById('F1_imagen');
    const imagenFile = imagenInput.files[0];

    let matricula_var; // esta variable no es obligatoria en el formulario

    if (!document.getElementById('F1_matricula').value || document.getElementById('F1_matricula').value.trim() === "" || document.getElementById('F1_matricula').value === null) {
        matricula_var = "-";
    } else {
        matricula_var = document.getElementById('F1_matricula').value;
    }

    //USAMOS FORMDATA EN LUGAR DE JSON PARA PODER ENVIAR LA IMAGEN
    const formData = new FormData();
    formData.append('modelo', document.getElementById('F1_modelo').value);
    formData.append('version', document.getElementById('F1_version').value);
    formData.append('proveedor', document.getElementById('F1_proveedor').value);
    formData.append('matricula', matricula_var);
    formData.append('precio', parseFloat(document.getElementById('F1_precio').value));
    formData.append('color', document.getElementById('F1_color').value);
    formData.append('anio', parseInt(document.getElementById('F1_anio').value, 10));
    formData.append('serie', document.getElementById('F1_serie').value);
    formData.append('estado', document.getElementById('F1_estado').value);

    if (imagenFile) {
        formData.append('imagen', imagenFile);
    }
    else {
        formData.append('imagen', null);
    }


    console.log(document.getElementById('F1_modelo').value);
    console.log(document.getElementById('F1_version').value);
    console.log(document.getElementById('F1_proveedor').value);
    console.log(matricula_var);
    console.log(document.getElementById('F1_precio').value);
    console.log(document.getElementById('F1_color').value);
    console.log(document.getElementById('F1_anio').value);
    console.log(document.getElementById('F1_serie').value);
    console.log(document.getElementById('F1_estado').value);
    console.log(document.getElementById('F1_imagen').value);


    fetch('http://localhost:8080/api/autos/crear', {
        method: 'POST',
        body: formData, 
    })
    .then(response => {
        if (!response.ok)
            throw new Error('Error en el servidor');
        return response.json();
    })
    .then(result => {
        alert('Modelo cargado con éxito');
        console.log(result);
    })
    .catch(error => {
        alert('Error al enviar el modelo');
        console.error(error);
    });
});


function preview_de_imagen() {
    var extensionesValidas = /(\.jpg|\.jpeg|\.png)$/i;
    const f_imagen = document.getElementById("F1_imagen");
    if (f_imagen) {
        if (!extensionesValidas.exec(f_imagen.value)) {
            alert("El formato de la imagen debe ser .jpg, .jpeg o .png");
            document.getElementById('F1_imagen_preview').src = "images/imagen-placeholder-para-autos.jpg";
            document.getElementById('F1_imagen').value = "";
            imagen_valida = false;
        } else {
            document.getElementById('F1_imagen_preview').src = URL.createObjectURL(f_imagen.files[0]);
            imagen_valida = true;
        }
    } else {
        imagen_valida = false;
    }
}