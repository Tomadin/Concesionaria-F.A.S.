document.getElementById('formulario_modelo').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional

    const data = {
        nombre: document.getElementById('F2_modelo').value,
        version: document.getElementById('F2_version').value,
        carroceria: document.getElementById('F2_carroceria').value,
        motor: document.getElementById('F2_motor').value,
        transmision: document.getElementById('F2_transmision').value,
        cantPuertas: parseInt(document.getElementById('F2_nro_puertas').value, 10)


    };


    console.log(document.getElementById('F2_modelo').value);
    console.log(document.getElementById('F2_version').value);
    console.log(document.getElementById('F2_carroceria').value);
    console.log(document.getElementById('F2_motor').value);
    console.log(document.getElementById('F2_transmision').value);
    console.log(document.getElementById('F2_nro_puertas').value);


    fetch('http://localhost:8080/api/modelos/crear', {
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



