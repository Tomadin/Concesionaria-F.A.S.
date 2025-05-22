document.getElementById('formulario_proveedor').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    const data = {
        nombre: document.getElementById('F4_nombre').value,
        apellido: document.getElementById('F4_apellido').value,
        correo: document.getElementById('F4_correo').value,
        telefono: document.getElementById('F4_telefono').value,
        ciudad: document.getElementById('F4_ciudad').value,
        fecha: document.getElementById('F4_fecha').value
    };

    console.log(document.getElementById('F4_nombre').value);
    console.log(document.getElementById('F4_apellido').value);
    console.log(document.getElementById('F4_correo').value);
    console.log(document.getElementById('F4_telefono').value);
    console.log(document.getElementById('F4_ciudad').value);
    console.log(document.getElementById('F4_fecha').value);

    fetch('http://localhost:8080/api/vendedores/crear', {
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
                alert('Proveedorcargado con éxito');
                console.log(result);
            })
            .catch(error => {
                alert('Error al enviar el proveedor');
                console.error(error);
            });
});