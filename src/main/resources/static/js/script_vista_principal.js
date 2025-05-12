function inicio(){ //funcion llamada por el body del html cada vez que se carga la página

    array_filas = [];

    //debug, filas de ejemplo
    nueva_fila(1, "Logan", "Life 1.6", "Gris", 25000000, "A1234", 2019, "proveedor1", "0Km", 5);
    nueva_fila(2, "Kangoo", "Zen 1.6", "Rojo", 30000000, "A1634", 2020, "proveedor2", "0Km", 2);
    nueva_fila(3, "Sandero", "Life 1.6", "Azul", 22000000, "A2345", 2021, "proveedor3", "Usado", 3);
    nueva_fila(4, "Kardian", "Evolution", "Blanco", 28000000, "A3456", 2022, "proveedor4", "0Km", 4);
    nueva_fila(5, "Clio", "Mio 1.2", "Negro", 11000000, "H4567", 1994, "proveedor2", "Usado", 1);
    nueva_fila(6, "Arkana E-Tech Hybrid", "Espirit Alpine", "Gris", 43900000, "A6789", 2024, "proveedor3", "0Km", 1);
    nueva_fila(7, "Stepway", "Intents 1.6", "Naranja", 28000000, "HS7690", 2025, "proveedor4", "0Km", 1);
    nueva_fila(8, "Stepway", "Intents 1.6 CVT", "Blanco", 28000000, "HS7691", 2025, "proveedor4", "0Km", 1);
    nueva_fila(9, "Master", "Furgon L1H1", "Blanco", 54080000, "A6797", 2022, "proveedor5", "0Km", 3);
    nueva_fila(10, "Alskan", "Confort 2.3 dCi 160 2WD", "Azul", 36360000, "HS4561", 2023, "proveedor2", "0Km", 0);
}

var array_filas = []; //array que contiene las filas de la tabla

function nueva_fila(vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, stock){

    const tabla = document.getElementById("tabla_stock");

    const fila = document.createElement("tr"); //filas con los datos: modelo, precio, stock
    fila.id = "vehiculo_" + vehiculo_id;
    fila.className = "Fila_stock";

    const celda_imagen = document.createElement("td");
    const imagen = document.createElement("img");

    const celda_id_vehiculo = document.createElement("td");
    const celda_modelo = document.createElement("td");
    const celda_version = document.createElement("td");
    const celda_color = document.createElement("td");
    const celda_precio = document.createElement("td");
    const celda_nro_serie = document.createElement("td");
    const celda_año = document.createElement("td")
    const celda_proveedor = document.createElement("td");
    const celda_estado = document.createElement("td");
    const celda_stock = document.createElement("td");

    imagen.src = "images/imagen-placeholder-para-autos.jpg";
    imagen.className = "Imagenes_auto_filas";
    celda_imagen.appendChild(imagen);

    celda_id_vehiculo.innerHTML = parseInt(vehiculo_id);
    celda_modelo.innerHTML = modelo;
    celda_version.innerHTML = version;
    celda_color.innerHTML = color;
    celda_precio.innerHTML = parseFloat(precio);
    celda_nro_serie.innerHTML = serie;
    celda_año.innerHTML = parseInt(anio);
    celda_proveedor.innerHTML = proveedor;
    celda_estado.innerHTML = estado;
    celda_stock.innerHTML = parseInt(stock);

    fila.appendChild(celda_imagen);
    fila.appendChild(celda_id_vehiculo);
    fila.appendChild(celda_modelo);
    fila.appendChild(celda_version);
    fila.appendChild(celda_color);
    fila.appendChild(celda_precio);
    fila.appendChild(celda_nro_serie);
    fila.appendChild(celda_año);
    fila.appendChild(celda_proveedor);
    fila.appendChild(celda_estado);
    fila.appendChild(celda_stock);

    // pasa el ID de la fila como parámetro al hacer click en la fila
    fila.addEventListener('click', function() {
        abrir_vista_auto(this.id); 
    });

    tabla.appendChild(fila);
    //ordenar_tabla();

    array_filas.push(fila);
    

}

function ordenar_tabla(){

    const tabla = document.getElementById("tabla_stock");

    const hijos = Array.from(tabla.children);
    hijos.forEach(hijo => {
      if (hijo.tagName !== "TBODY") { //borramos todas las filas menos la cabecera
        hijo.remove();
      }
    });

    const variable_orden = document.getElementById("select_ordenar_por").value;
    const tipo_orden = document.getElementById("select_orden").value;

    if(variable_orden == "id"){
        if(tipo_orden == "ascendente"){
            //array_filas.sort((a, b) => a.children[1].innerHTML.localeCompare(b.children[1].innerHTML));
            array_filas.sort((a, b) => parseInt(a.children[1].innerHTML) - parseInt(b.children[1].innerHTML));
        }else{
            //array_filas.sort((a, b) => b.children[1].innerHTML.localeCompare(a.children[1].innerHTML));
            array_filas.sort((a, b) => parseInt(b.children[1].innerHTML) - parseInt(a.children[1].innerHTML));
        }
    }else if(variable_orden == "modelo"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[2].innerHTML.localeCompare(b.children[2].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[2].innerHTML.localeCompare(a.children[2].innerHTML));
        }
    }else if(variable_orden == "version"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[3].innerHTML.localeCompare(b.children[3].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[3].innerHTML.localeCompare(a.children[3].innerHTML));
        } 
    }else if(variable_orden == "color"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[4].innerHTML.localeCompare(b.children[4].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[4].innerHTML.localeCompare(a.children[4].innerHTML));
        }
    }else if(variable_orden == "precio"){
        if(tipo_orden == "ascendente"){
            //array_filas.sort((a, b) => a.children[5].innerHTML.localeCompare(b.children[5].innerHTML));
            array_filas.sort((a, b) => parseFloat(a.children[5].innerHTML) - parseFloat(b.children[5].innerHTML));
        }else{
            //array_filas.sort((a, b) => b.children[5].innerHTML.localeCompare(a.children[5].innerHTML));
            array_filas.sort((a, b) => parseFloat(b.children[5].innerHTML) - parseFloat(a.children[5].innerHTML));
        }
    }else if(variable_orden == "serie"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[6].innerHTML.localeCompare(b.children[6].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[6].innerHTML.localeCompare(a.children[6].innerHTML));
        }
    }else if(variable_orden == "anio"){
        if(tipo_orden == "ascendente"){
            //array_filas.sort((a, b) => a.children[7].innerHTML.localeCompare(b.children[7].innerHTML));
            array_filas.sort((a, b) => parseInt(a.children[7].innerHTML) - parseInt(b.children[7].innerHTML));

        }else{
            //array_filas.sort((a, b) => b.children[7].innerHTML.localeCompare(a.children[7].innerHTML));
            array_filas.sort((a, b) => parseInt(b.children[7].innerHTML) - parseInt(a.children[7].innerHTML));
        }
    }else if(variable_orden == "proveedor"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[8].innerHTML.localeCompare(b.children[8].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[8].innerHTML.localeCompare(a.children[8].innerHTML));
        }
    }else if(variable_orden == "estado"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => a.children[9].innerHTML.localeCompare(b.children[9].innerHTML));
        }else{
            array_filas.sort((a, b) => b.children[9].innerHTML.localeCompare(a.children[9].innerHTML));
        }
    }else if(variable_orden == "stock"){
        if(tipo_orden == "ascendente"){
            //array_filas.sort((a, b) => a.children[10].innerHTML.localeCompare(b.children[10].innerHTML));
            array_filas.sort((a, b) => parseInt(a.children[10].innerHTML) - parseInt(b.children[10].innerHTML));
        }else{
            //array_filas.sort((a, b) => b.children[10].innerHTML.localeCompare(a.children[10].innerHTML));
            array_filas.sort((a, b) => parseInt(b.children[10].innerHTML) - parseInt(a.children[10].innerHTML));
        }
    }

    for (let i = 0; i < array_filas.length; i++) {
        tabla.appendChild(array_filas[i]);
    }
    //volmemos a agregar las filas una vez ordenadas
}

function abrir_vista_auto(parametro_id){
    alert(parametro_id);
}


document.getElementById("form_buscar").addEventListener("input", function(e) {
    e.preventDefault();

    const input_value = document.getElementById("input_buscar").value;


    if((!inputBuscar.value || input_value.trim() === "") && document.getElementById("tabla_stock") && document.getElementById("input_buscar")){
        filtrar_filas();
    }
    
});

document.getElementById("form_buscar").addEventListener('change', function(e) {
    e.preventDefault();

    filtrar_filas();
});

function filtrar_filas(){
    if(document.getElementById("tabla_stock") && document.getElementById("input_buscar")){

        const tabla = document.getElementById("tabla_stock");
        const inputBuscar = document.getElementById("input_buscar");
        const input_value = document.getElementById("input_buscar").value;
        
        const textoBuscar = inputBuscar.value.toLowerCase();
        const filas = Array.from(tabla.children);

        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            if (textoFila.includes(textoBuscar) || fila.tagName == "TBODY" || input_value.trim() === "") {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });

    }else{
        alert("Salir de la página actual");
    }
}