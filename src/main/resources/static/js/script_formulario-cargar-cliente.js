document.getElementById('formulario_cliente').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    //guardar los datos del formulario en un objeto
    const data = {
        dni: parseInt(document.getElementById('F3_dni').value),
        nombre: document.getElementById('F3_nombre').value,
        apellido: document.getElementById('F3_apellido').value,
        correoElectronico: document.getElementById('F3_correo').value,
        telefono: document.getElementById('F3_telefono').value,
        calle: document.getElementById('F3_calle').value,
        numeroCalle: document.getElementById('F3_nro_calle').value,
        fechaNacimiento: document.getElementById('F3_fecha').value
    };

    fetch('http://localhost:8080/api/cliente/crear', {
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
                alert('Cliente cargado con éxito');
                //console.log(result); //Con esto revisas los datos que se mandaron por consola del navegador.
            })
            .catch(error => {
                alert('Error al enviar el cliente');
                console.error(error);
            });
});




