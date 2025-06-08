/* 
- inicio(): Función principal al cargar la página; obtiene y muestra autos desde el backend.
- nueva_fila(): Crea una fila en la tabla con los datos del vehículo.
- ordenar_tabla(): Ordena las filas de la tabla según atributo y orden seleccionados.
- filtrar_filas(): Filtra las filas de la tabla según texto ingresado en la barra de búsqueda.
- abrir_ventana_auto(): Muestra una vista detallada del vehículo seleccionado.
- cerrar_ventana_auto(): Oculta la vista detallada del vehículo.
- llenar_vista_completa(): Llena los datos detallados del vehículo en la vista ampliada.
- cargar_resumen_ventas(): Obtiene y muestra el total de ventas y unidades vendidas desde el backend.
- array_filas: Arreglo global que contiene todas las filas creadas de vehículos.
- diccionario_atributos: Diccionario que almacena los atributos de cada vehículo por ID.
*/


async function inicio(){ //funcion llamada por el body del html cada vez que se carga la página

    array_filas = []; //vacío el array que contiene las filas de la tabla
    diccionario_atributos = {}; // vacío el diccionario que contiene los atributos cada vehiculo, y de su modelo - serie

    try {
        const response = await fetch('http://localhost:8080/autos/listar');//llamo a listar en src\main\java\Fundamentos\de\Analisis\de\Sistemas\controladores\AutoController.java
        if (!response.ok) throw new Error('Error al cargar vehículos');

        //desde java obtengo los atributos de la entidad vehiculo en forma de json
        const vehiculos = await response.json(); // Parseamos JSON y lo convertimos a objeto

        vehiculos.forEach(v => { //itero sobre cada diccionario dentro del objeto y creo una nueva fila de stock con los atributos del vehiculo
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
                v.imagenBase64,//imagen expresada en caracteres ascii
                v.modelo.motor,
                v.modelo.carroceria,
                v.modelo.transmision,
                v.modelo.cantPuertas
            );
            //console.log(v.imagenBase64);
        });

    } catch (error) {
        console.error('Hubo un error al obtener los vehículos:', error);
    }
    
    //parámetro de la url que resulta de usar la búsqueda desde otra página como los formularios
    const hash = window.location.hash;
    if (hash) { //ejemplo: http://localhost:8080/#Megane
        const busqueda = hash.substring(1);
        document.getElementById("input_buscar").value = busqueda;
        filtrar_filas(true);
    }
    
    cargar_resumen_ventas(); //resumen unidades vendidas y ganancias totales
}

var array_filas = []; //array que contiene las filas de la tabla
var diccionario_atributos = {} //diccionario que contiene los atributos cada vehiculo, y de su modelo - serie


function nueva_fila(vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, imagen_url, motor, carroceria, transmision, puertas){

    console.log("Nueva fila. ID vehículo: " + vehiculo_id);

    const tabla = document.getElementById("tabla_stock")

    const fila = document.createElement("tr"); //filas con atributos de la entidad vehiculo en la base de datos
    fila.id = "vehiculo_" + vehiculo_id;
    fila.className = "Fila_stock";

    //creamos celdas para todos los atributos 
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
    

    if(imagen_url===null || imagen_url===undefined){// si la imagen no es valida se muestra una por defecto
        nueva_imagen.src = "images/imagen-placeholder-para-autos.jpg";
        imagen_url = "images/imagen-placeholder-para-autos.jpg";
        console.log("Estableciendo imagen por defecto");
    }else{
        nueva_imagen.src =  `data:image/jpeg;base64,${imagen_url}`; //convertimos la imagen de base64 a jpeg
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
    
    //una vez creadas las celdas y definidas las agregamos a la fila (tr)
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
        abrir_ventana_auto(this.id); //se abre una vista más grande con los datos del vehículo
    });

    tabla.appendChild(fila); //una vez lista la fila (tr) la agregamos a la tabla de stock
    //ordenar_tabla();

    array_filas.push(fila); //guardamos la fila (tr) para reordenar la tabla luego si el usuario quiere

    //guardamos los atributos con el fin de usarlos en abrir_ventana_auto()
    diccionario_atributos["vehiculo_" + vehiculo_id] = [vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, imagen_url, motor, carroceria, transmision, puertas];
}

function ordenar_tabla(){

  /*
  Ordenar la tabla usando dos criterios:
    1. El atributo a tener en cuenta para ordenar: ej; ID
    2. El orden: ascendente o descendente
  */

    const tabla = document.getElementById("tabla_stock");

    const hijos = Array.from(tabla.children);
    hijos.forEach(hijo => {
      if (hijo.tagName !== "TBODY") { //borramos todas las filas menos la cabecera
        hijo.remove();                //más tarde se van a volver a agregar
      }
    });

    const variable_orden = document.getElementById("select_ordenar_por").value; //criterio atributo
    const tipo_orden = document.getElementById("select_orden").value;

    //usamos el método iterativo sort() de Array
    //por cada fila dentro del array: 
     //se compara el atributo elegido de la primer fila (a) con los de la segunda (b) o alrevez si el orden es descendente

    if(variable_orden == "id"){
        if(tipo_orden == "ascendente"){
            array_filas.sort((a, b) => parseInt(a.children[1].innerHTML) - parseInt(b.children[1].innerHTML));
        }else{
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
            array_filas.sort((a, b) => parseFloat(a.children[5].innerHTML) - parseFloat(b.children[5].innerHTML));
        }else{
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
            array_filas.sort((a, b) => parseInt(a.children[7].innerHTML) - parseInt(b.children[7].innerHTML));

        }else{
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
    
  //volmemos a agregar las filas una vez ordenadas
    for (let i = 0; i < array_filas.length; i++) {
        tabla.appendChild(array_filas[i]);
    }
}

//AL CAMBIAR LA BARRA DE BÚSQUEDA (verificar si está vacía)
document.getElementById("form_buscar").addEventListener("input", function(e) {
  e.preventDefault();

  const input_value = document.getElementById("input_buscar").value;

  //se llama a filtra_filas() sólo si la barra de búsqueda está vacía
  if((!input_value || input_value.trim() === "") && document.getElementById("tabla_stock") && document.getElementById("input_buscar")){
      filtrar_filas();
  }
    
});

//AL APRETAR BOTÓN CON EL SÍMBOLO DE LUPA (BUSCAR)
// se toma el valor de la barra de búsqueda y se busca en la fila de stock
document.getElementById("form_buscar").addEventListener('submit', function(e) {
  e.preventDefault();

  filtrar_filas();
});


//si cualquiera de las columnas de una fila tiene texto coincidente con la búsqueda, no se filtra
function filtrar_filas(){
  if(document.getElementById("tabla_stock") && document.getElementById("input_buscar")){

      const tabla = document.getElementById("tabla_stock");
      const inputBuscar = document.getElementById("input_buscar");
      const input_value = document.getElementById("input_buscar").value;
      
      const textoBuscar = inputBuscar.value.toLowerCase();
      const filas = Array.from(tabla.children); //array local con las filas de la tabla

      filas.forEach(fila => {
          const textoFila = fila.textContent.toLowerCase(); //se compara el texo en minúscula
          //TBODY es el encabezado de la tabla (primer fila que no se debe borrar)
          //includes se refiere a si parte del texto de la búsqueda (ordenado) o todo el texto coincide
          if (textoFila.includes(textoBuscar) || fila.tagName == "TBODY" || input_value.trim() === "") {
              fila.style.display = ""; //se muestra la no filtrada (se quita el display="none")
          } else {
              fila.style.display = "none"; //se esconde la fila filtrada
          }
      });
  }
}

//vista mas detallada del auto (se abre al hacer click sobre una de las filas del stock)
function abrir_ventana_auto(p_id){ //parámetro id
    console.log(p_id);
    var ventana = document.getElementById("ventana_auto");
    ventana.hidden = false;
    llenar_vista_completa(p_id);
}

//cerrar vista completa del auto al hacer click en el botón con forma de X
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

//lleno los elementos con los atributos del array elegido en el diccionario (clave: id del auto, valor: array con los atributos del vehículo)
function llenar_vista_completa(p_id){

  //atributos del array [vehiculo_id, modelo, version, color, precio, serie, anio, proveedor, estado, stock, imagen_url, motor, carroceria, transmision, puertas]

  if(diccionario_atributos[p_id][0]===undefined || diccionario_atributos[p_id][0]===null){
    document.getElementById("v_c_id").innerHTML = "ID : -";
  } else {
    document.getElementById("v_c_id").innerHTML = "ID : " + diccionario_atributos[p_id][0];
  }

  if(diccionario_atributos[p_id][10]===undefined || diccionario_atributos[p_id][10]===null || diccionario_atributos[p_id][11] === 0){
    document.getElementById("v_c_imagen").src = "images/imagen-placeholder-para-autos.jpg"; // imagen por defecto
  } else {
    const imagen = diccionario_atributos[p_id][9];
    document.getElementById("v_c_imagen").src = `data:image/jpeg;base64,${imagen}`; //convierto la base64 en jpeg
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

//mostrar total de unidades vendidas y total de ganancias
async function cargar_resumen_ventas(){

  try {                    //ctrl + click o copiar para ver el objeto/diccionario en el navegador
    const response = await fetch("http://localhost:8080/api/venta/listar"); //llamo a listar de src\main\java\Fundamentos\de\Analisis\de\Sistemas\controladores\VentaController.java
    if (!response.ok) throw new Error("Error al cargar resumen de ventas");

    const ventas = await response.json(); //convierto json a objeto

    let resumen_ventas = 0;
    let resumen_unidades = 0;

    ventas.forEach(venta => { //itero sobre todas las ventas 

        let cantidad_autos = 0;
        let precio_subtotal = 0;
        venta.vehiculos.forEach(auto => { //itero sobre cada detalle de la venta ()
            cantidad_autos ++; //por cada detalle aumenta las unidades vendidas de sa venta

            const floatPrecio = parseFloat(auto.precio);
            precio_subtotal += floatPrecio; //por cada detalle aumenta la ganancia total de esa venta
        });
        const precio_total = precio_subtotal * 1.21; //sumo el iva

        resumen_ventas += precio_total; //sumo la ganancia de esa venta a la ganancia TOTAL
        resumen_unidades += cantidad_autos; //sumo las unidades vendidas de esa venta al TOTAL
    });

    //muestro el resumen 
    document.getElementById("sumario_unidades").innerHTML = resumen_unidades + " unidades";
    document.getElementById("sumario_ganancias").innerHTML = "$" + resumen_ventas.toFixed(2);

  } catch (error) {
    console.error("Hubo un error al obtener el resumen de las ventas:", error);
  }
}