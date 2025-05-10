document.getElementById('carForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const vehiculo = {
    matricula: document.getElementById('matricula').value,
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    puertas: document.getElementById('puertas').value,
    color: document.getElementById('color').value,
    precio: document.getElementById('precio').value,
    anio: document.getElementById('anio').value,
    proveedor: document.getElementById('proveedor').value,
    imagen: document.getElementById('imagen').files[0]?.name || 'sin_imagen.jpg'
    };

    console.log("Vehículo cargado:", vehiculo);

    // Aquí puedes hacer un POST a tu backend si estás usando Spring Boot
    alert('Vehículo cargado correctamente');
    document.getElementById('carForm').reset();
});