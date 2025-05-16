document.getElementById('formulario_cliente').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    const data = {
        dni: parseInt(document.getElementById('F3_dni').value, 10),
        nombre: document.getElementById('F3_nombre').value,
        apellido: document.getElementById('F3_apellido').value,
        correo: document.getElementById('F3_correo').value,
        telefono: document.getElementById('F3_telefono').value,
        ciudad: document.getElementById('F3_ciudad').value,
        calle: document.getElementById('F3_calle').value,
        numero_calle: parseInt(document.getElementById('F3_nro_calle').value, 10),
        fecha: document.getElementById('F3_fecha').value,
    };

    console.log(document.getElementById('F3_dni').value);
    console.log(document.getElementById('F3_nombre').value);
    console.log(document.getElementById('F3_apellido').value);
    console.log(document.getElementById('F3_correo').value);
    console.log(document.getElementById('F3_telefono').value);
    console.log(document.getElementById('F3_ciudad').value);
    console.log(document.getElementById('F3_calle').value);
    console.log(document.getElementById('F3_nro_calle').value);
    console.log(document.getElementById('F3_fecha').value);

    fetch('http://localhost:8080/api/clientes/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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