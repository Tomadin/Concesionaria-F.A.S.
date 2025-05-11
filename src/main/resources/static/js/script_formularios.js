document.getElementById("formulario_general").addEventListener('submit', function(e) {
    e.preventDefault();

    /*
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
    */
   
});

function cargar_formulario(){
    crear_formulario_vehiculo();
}

function limpiar_formulario(){
    document.getElementById("formulario_general").reset();
    document.getElementById("formulario_general").innerHTML = null
}

function crear_elemento(id, label, input_o_select, tipo, placeholder, default_select, requerido){

    const new_div = document.createElement("div");
    new_div.className = "form-group";

    if(label != null){
        const new_label = document.createElement("label");
        new_label.setAttribute("for", id);
        new_label.innerHTML = label;
        new_div.appendChild(new_label);
    }


    const new_input = document.createElement("input");
    const new_select = document.createElement("select");

    if(input_o_select == null){
        console.log("Error, parámetro input_o_select no puede ser nulo");
        return null;
    }

    switch(input_o_select){
        case "input":

            if(id != null){
                new_input.setAttribute("id", id);    
            }
            if(tipo != null){
                new_input.setAttribute("type", tipo);  
            }
            if(placeholder != null){
                new_input.setAttribute("placeholder", placeholder);
            }
            if(requerido){
                new_input.required = true;
            }
            new_div.appendChild(new_input);
            break;

        case "select":

            if(id != null){
                new_select.setAttribute("id", id);
            }
            const option = document.createElement("option");
            if(default_select != null){
                option.innerHTML = default_select;
            }
            if(requerido){
                new_select.required = true
            }
            new_select.appendChild(option);
            new_div.appendChild(new_select);
            break;

        default:
            console.log("Error, parámetro input_o_select no es válido");
            return null;
    }

    document.getElementById("formulario_general").appendChild(new_div);

}


function crear_formulario_vehiculo(){
    document.getElementById("h2_formulario").innerHTML = "Cargar Vehículo";

    crear_elemento("modelo", "Modelo", "select", null, null, "--Seleccione un modelo--", true);
    crear_elemento("version", "Versión", "select", null, null, "--Seleccione una versión--", true);
    crear_elemento("proveedor", "Proveedor", "select", null, null, "--Seleccione un proveedor--", true);
    crear_elemento("matricula", "Matrícula", "input", "text", "Dejar vacío para vehículos sin matricula", null, null, false);
    crear_elemento("precio", "Precio (ARS)", "input", "number", null, null, true);
    document.getElementById("precio").setAttribute("min", "0");
    crear_elemento("color", "Color", "input", "text", null, null, true);
    crear_elemento("anio", "Año", "input", "number", null, null, true);
    document.getElementById("anio").setAttribute("min", "1900");
    document.getElementById("anio").setAttribute("max", "2099");
    crear_elemento("serie", "Número de serie", "input", "text", null, null, true);
    crear_elemento("kilometraje", "Kilometraje", "input", "number", null, null, true);
    document.getElementById("kilometraje").setAttribute("min", "0");
    document.getElementById("kilometraje").setAttribute("step", "0.01");
    crear_elemento("estado", "Estado del vehículo", "select", null, null, "--Seleccione un estado--", true);
    crear_elemento("imagen", "Imagen", "input", "file", null, null, true);

    const boton_cargar = document.createElement("button");
    boton_cargar.setAttribute("type", "submit");
    boton_cargar.innerHTML = "Cargar vehículo";
    boton_cargar.setAttribute("id", "boton_cargar");
    boton_cargar.setAttribute("class", "Cargar");
    document.getElementById("formulario_general").appendChild(boton_cargar);
}