async function inicio(){ //funcion llamada por el body del html cada vez que se carga la página

    array_filas = [];
    diccionario_atributos = {};

    try {
        const response = await fetch('http://localhost:8080/autos/listar');
        if (!response.ok) throw new Error('Error al cargar vehículos');

        const vehiculos = await response.json(); // Parseamos JSON

        vehiculos.forEach(v => {
            nueva_fila(
                v.id, 
                v.modelo.nombre, 
                v.version, 
                v.color, 
                v.precio, 
                v.serie, 
                v.anioFabricacion, 
                "Renault", 
                v.estado, 
                v.imagenBase64,
                v.modelo.motor,
                v.modelo.carroceria,
                v.modelo.transmision,
                v.modelo.cantPuertas
            );
            console.log(v.imagenBase64);
        });

    } catch (error) {
        console.error('Hubo un error al obtener los vehículos:', error);
    }
    
    //parámetro de la url que resulta de usar la búsqueda desde otra página como los formularios
    const hash = window.location.hash;
    if (hash) {
        const busqueda = hash.substring(1);
        document.getElementById("input_buscar").value = busqueda;
        filtrar_filas(true);
    }

    //debug, filas de ejemplo
    /*
    nueva_fila(1, "Logan", "Life 1.6", "Gris", 24800000, "A1234", 2019, "proveedor1", "Disponible", 5, null, null, null, null, null);
    nueva_fila(2, "Kangoo", "Zen 1.6", "Rojo", 30000000, "A1634", 2020, "proveedor2", "Vendido", 2, null, null, null, null, null);
    nueva_fila(3, "Sandero", "Life 1.6", "Azul", 22000000, "A2345", 2021, "proveedor3", "Disponible", 3, null, null, null, null, null);
    nueva_fila(4, "Kardian", "Evolution", "Blanco", 28000000, "A3456", 2022, "proveedor4", "Almacenado", 4, null, null, null, null, null);
    nueva_fila(5, "Clio", "Mio 1.2", "Negro", 11000000, "H4567", 1994, "proveedor2", "Disponible", 1, null, null, null, null, null, null, null);
    nueva_fila(6, "Arkana E-Tech Hybrid", "Espirit Alpine", "Gris", 43900000, "A6789", 2024, "proveedor3", "Vendido", 1, null, null, null, null, null);
    nueva_fila(7, "Stepway", "Intents 1.6", "Negro", 28740000, "HS7690", 2025, "proveedor4", "Almacenado", 1, null, "1.6 L 4 motor en línea", "Autoportante en acero", "Caja automática CVT", 4);
    nueva_fila(8, "Stepway", "Intents 1.6 CVT", "Blanco", 28000000, "HS7691", 2025, "proveedor4", "Almacenado", 1, null, null, null, null, null);
    nueva_fila(9, "Master", "Furgon L1H1", "Blanco", 54080000, "A6797", 2022, "proveedor5", "Disponible", 3, null, null, null, null, null);
    nueva_fila(10, "Alskan", "Confort 2.3 dCi 160 2WD", "Azul", 36360000, "HS4561", 2023, "proveedor2", "Disponible", 0, null, null, null, null, null);
    */
     
}

var array_filas = []; //array que contiene las filas de la tabla
var diccionario_atributos = {} //diccionario que contiene los atributos cada vehiculo, y de su modelo - serie

function nueva_fila(vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, imagen_url, motor, carroceria, transmision, puertas){

    console.log(anio);

    const tabla = document.getElementById("tabla_stock")

    const fila = document.createElement("tr"); //filas con los datos: modelo, precio, stock
    fila.id = "vehiculo_" + vehiculo_id;
    fila.className = "Fila_stock";

    const celda_imagen = document.createElement("td");
    const nueva_imagen = document.createElement("img");

    const celda_id_vehiculo = document.createElement("td");
    const celda_modelo = document.createElement("td");
    const celda_version = document.createElement("td");
    const celda_color = document.createElement("td");
    const celda_precio = document.createElement("td");
    const celda_nro_serie = document.createElement("td");
    const celda_año = document.createElement("td")
    const celda_proveedor = document.createElement("td");
    const celda_estado = document.createElement("td");
    const celda_motor = document.createElement("td");
    const celda_carroceria=document.createElement("td");
    const celda_transmision=document.createElement("td");
    const celda_cantpuertas =document.createElement("td");
    

    let imagen_valida = true; 
    //imagen_valida= checkImage(imagen_url); //IMPORTANTE - NO BORRAR - EN IMPLEMENTACIÓN (es para verificar que la imágen exista, sino se usa una de placeholder)

    if(imagen_url===null || imagen_url===undefined || !imagen_valida){
        nueva_imagen.src = "images/imagen-placeholder-para-autos.jpg";
        imagen_url = "images/imagen-placeholder-para-autos.jpg";
        console.log("Estableciendo imagen por defecto");
    }else{
        nueva_imagen.src =  `data:image/jpeg;base64,${imagen_url}`;
    }

    nueva_imagen.className = "Imagenes_auto_filas";
    celda_imagen.appendChild(nueva_imagen);

    celda_id_vehiculo.innerHTML = parseInt(vehiculo_id);
    celda_modelo.innerHTML = modelo;
    celda_version.innerHTML = version;
    celda_color.innerHTML = color;
    celda_precio.innerHTML = parseFloat(precio);
    celda_nro_serie.innerHTML = serie;
    celda_año.innerHTML = parseInt(anio);
    celda_proveedor.innerHTML = proveedor;
    celda_estado.innerHTML = estado;
    
    
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
    
    

    // pasa el ID de la fila como parámetro al hacer click en la fila
    fila.addEventListener('click', function() {
        abrir_ventana_auto(this.id); 
    });

    tabla.appendChild(fila);
    //ordenar_tabla();

    array_filas.push(fila);

    diccionario_atributos["vehiculo_" + vehiculo_id] = [vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, imagen_url, imagen_valida, motor, carroceria, transmision, puertas];
}

function checkImage(url) {

    if(url===null || url===undefined){
        console.log("La URL es null o undefined");
        return false;
    }

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
        if (request.status === 200) {
        var urlObj = new URL(url);
        var extension = urlObj.pathname.split(".").pop().toLowerCase();
        if (extension === "jpg" || extension === "png" || extension === "gif") {
            var contentType = request.getResponseHeader("Content-Type");
            if (contentType.startsWith("image/")) {
            console.log("La URL es una imagen y existe");
            return true;
            } else {
            console.log("La URL existe, pero no es una imagen");
            return false;
            }
        } else {
            console.log("La URL existe, pero no tiene una extensión de imagen");
            return false;
        }
        } else {
        console.log("La URL no existe");
        return false;
        }
    }
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
    }
    

    for (let i = 0; i < array_filas.length; i++) {
        tabla.appendChild(array_filas[i]);
    }
    //volmemos a agregar las filas una vez ordenadas
}


document.getElementById("form_buscar").addEventListener("input", function(e) {
    e.preventDefault();

    const input_value = document.getElementById("input_buscar").value;


    if((!input_value || input_value.trim() === "") && document.getElementById("tabla_stock") && document.getElementById("input_buscar")){
        filtrar_filas(true);
    }
    
});

document.getElementById("form_buscar").addEventListener('submit', function(e) {
    e.preventDefault();

    filtrar_filas(false);
});


function filtrar_filas(suprimir_alerta){
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

    }else if(!suprimir_alerta){
        if(!confirm("Salir de la página actual? Se perderán los cambios realizados.")){
            return;
        }

        const busqueda = document.getElementById("input_buscar").value
        const urlRedireccion = `${"http://localhost:8080/"}#${busqueda}`;

        // Redireccionar a la nueva URL
        window.location.href = urlRedireccion;
    }
}


function abrir_ventana_auto(p_id){ //parámetro id
    console.log(p_id);
    var ventana = document.getElementById("ventana_auto");
    ventana.hidden = false;
    llenar_vista_completa(p_id);
}

//cerrar vista completa del auto
function cerrar_ventana_auto(){
    var ventana = document.getElementById("ventana_auto");
    ventana.hidden = true;
}

//cerrar vista completa del auto al presionar la tecla esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cerrar_ventana_auto();
  }
});

function llenar_vista_completa(p_id){

  //[vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, stock, imagen_url, imagen_valida, motor, carroceria, transmision, puertas]

  if(diccionario_atributos[p_id][0]===undefined || diccionario_atributos[p_id][0]===null){
    document.getElementById("v_c_id").innerHTML = "ID : -";
  } else {
    document.getElementById("v_c_id").innerHTML = "ID : " + diccionario_atributos[p_id][0];
  }

  if(diccionario_atributos[p_id][10]===undefined || diccionario_atributos[p_id][10]===null || diccionario_atributos[p_id][11] === 0){
    document.getElementById("v_c_imagen").src = "images/imagen-placeholder-para-autos.jpg"; // imagen por defecto
  } else {
    const imagen = diccionario_atributos[p_id][9];
    document.getElementById("v_c_imagen").src = `data:image/jpeg;base64,${imagen}`;
  }

  if(diccionario_atributos[p_id][1]===undefined || diccionario_atributos[p_id][1]===null){
    document.getElementById("v_c_modelo").innerHTML = "modelo_placeholder";
  } else {
    document.getElementById("v_c_modelo").innerHTML = diccionario_atributos[p_id][1];
  }

  if(diccionario_atributos[p_id][2]===undefined || diccionario_atributos[p_id][2]===null){
    document.getElementById("v_c_version").innerHTML = "version_placeholder";
  } else {
    document.getElementById("v_c_version").innerHTML = diccionario_atributos[p_id][2];
  }

  if(diccionario_atributos[p_id][4]===undefined || diccionario_atributos[p_id][4]===null){
    document.getElementById("v_c_precio").innerHTML = "Precio (ARS) : -";
  } else {
    document.getElementById("v_c_precio").innerHTML = "Precio (ARS) : $" + diccionario_atributos[p_id][4];
  }

  if(diccionario_atributos[p_id][7]===undefined || diccionario_atributos[p_id][7]===null){
    document.getElementById("v_c_proveedor").innerHTML = "Proveedor : -";
  } else {
    document.getElementById("v_c_proveedor").innerHTML = "Proveedor : " + diccionario_atributos[p_id][7];
  }

  if(diccionario_atributos[p_id][3]===undefined || diccionario_atributos[p_id][3]===null){
    document.getElementById("v_c_color").innerHTML = "Color : -";
  } else {
    document.getElementById("v_c_color").innerHTML = "Color : " + diccionario_atributos[p_id][3];
  }

  if(diccionario_atributos[p_id][5]===undefined || diccionario_atributos[p_id][5]===null){
    document.getElementById("v_c_serie").innerHTML = "Número de serie : -";
  } else {
    document.getElementById("v_c_serie").innerHTML = "Número de serie : " + diccionario_atributos[p_id][5];
  }

  if(diccionario_atributos[p_id][6]===undefined || diccionario_atributos[p_id][6]===null){
    document.getElementById("v_c_anio").innerHTML = "Año de fabricación : -";
  } else {
    document.getElementById("v_c_anio").innerHTML = "Año de fabricación : " + diccionario_atributos[p_id][6];
  }

  if(diccionario_atributos[p_id][8]===undefined || diccionario_atributos[p_id][8]===null){
    document.getElementById("v_c_estado").innerHTML = "Estado del vehículo : -";
  } else {
    document.getElementById("v_c_estado").innerHTML = "Estado del vehículo : " + diccionario_atributos[p_id][8];
  }

  if(diccionario_atributos[p_id][11]===undefined || diccionario_atributos[p_id][11]===null){
    document.getElementById("v_c_motor").innerHTML = "Motor : -";
  } else {
    document.getElementById("v_c_motor").innerHTML = "Motor : " + diccionario_atributos[p_id][11];
  }

  if(diccionario_atributos[p_id][12]===undefined || diccionario_atributos[p_id][12]===null){
    document.getElementById("v_c_carroceria").innerHTML = "Tipo de carroceria : -";
  } else {
    document.getElementById("v_c_carroceria").innerHTML = "Tipo de carroceria : " + diccionario_atributos[p_id][12];
  }

  if(diccionario_atributos[p_id][13]===undefined || diccionario_atributos[p_id][13]===null){
    document.getElementById("v_c_transmision").innerHTML = "Transmision : -";
  } else {
    document.getElementById("v_c_transmision").innerHTML = "Transmision : " + diccionario_atributos[p_id][13];
  }

  if(diccionario_atributos[p_id][14]===undefined || diccionario_atributos[p_id][14]===null){
    document.getElementById("v_c_puertas").innerHTML = "Número de puertas : -";
  } else {
    document.getElementById("v_c_puertas").innerHTML = "Número de puertas : " + diccionario_atributos[p_id][14];
  }
}