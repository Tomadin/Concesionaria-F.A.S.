function inicio(){ //funcion llamada por el body del html cada vez que se carga la página

    for(let i=0; i<100; i++){
        nueva_fila();
    }
}


var asignador_de_id_filas = 0;
/*cada vez que una fila es agregada a la tabla de stock, se le asigna un id usando la variable global de arriba.
Luego la variable global aumenta para que la próxima fila tenga un id distinto
*/
function asignar_id_de_fila(){
    asignador_de_id_filas++;
    return (asignador_de_id_filas - 1); 
}

function nueva_fila(){

    const nuevo_id = asignar_id_de_fila()

    const tabla = document.getElementById("tabla_stock");

    const fila = document.createElement("tr"); //filas con los datos: modelo, precio, stock
    fila.className = "Fila_stock";


    const celda_imagen = document.createElement("td");
    const imagen = document.createElement("img");

    const celda_matricula_auto = document.createElement("td");
    const celda_nro_serie = document.createElement("td");
    const celda_modelo = document.createElement("td");
    const celda_precio = document.createElement("td");
    const celda_año = document.createElement("td")
    const celda_color = document.createElement("td");
    const celda_proveedor = document.createElement("td");
    const celda_stock = document.createElement("td");


    imagen.src = "../static/images/renault_header.jpg";
    imagen.className = "Imagenes_auto_filas";
    celda_imagen.appendChild(imagen);

    celda_matricula_auto.innerHTML = "auto_" + nuevo_id;
    celda_nro_serie.innerHTML = "nro_serie_placeholder";
    celda_modelo.innerHTML = "modelo_placeholder";
    celda_precio.innerHTML = "$0";
    celda_año.innerHTML = "2025";
    celda_color.innerHTML = "color_placeholder";
    celda_proveedor.innerHTML = "proveedor_placeholder";
    celda_stock.innerHTML = "Disponibilidad";

    fila.appendChild(celda_imagen);
    fila.appendChild(celda_matricula_auto);
    fila.appendChild(celda_nro_serie);
    fila.appendChild(celda_modelo);
    fila.appendChild(celda_precio);
    fila.appendChild(celda_año);
    fila.appendChild(celda_color);
    fila.appendChild(celda_proveedor);
    fila.appendChild(celda_stock);

    // pasa el ID de la fila como parámetro al hacer click en la fila
    fila.addEventListener('click', function() {
        abrir_vista_auto(this.id); 
    });

    fila.id = "id_stock_" + nuevo_id;

    tabla.appendChild(fila);

}


function abrir_vista_auto(id){
    alert(id);
}