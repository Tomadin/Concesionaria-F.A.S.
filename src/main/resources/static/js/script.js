setInterval(reloj, 100); 
// cada 100 milisegundos se llama a la funcion para actualizar la página


function inicio(){ //funcion llamada por el body del html cada vez que se carga la página
    reloj();

    for(let i=0; i<100; i++){
        actualizar_tabla_stock(i);
    }
    
}


//actualiza los elementos de la página constantemente
function reloj(){

}



function actualizar_tabla_stock(i){

    const tabla = document.getElementById("tabla_stock");

    const fila = document.createElement("tr"); //filas con los datos: modelo, precio, stock

    const celda_modelo = document.createElement("th"); 
    const celda_precio = document.createElement("th");
    const celda_stock = document.createElement("th")

    celda_modelo.innerHTML = "auto_" + i;
    celda_precio.innerHTML = "$0";
    celda_stock.innerHTML = "Disponibilidad";

    fila.appendChild(celda_modelo);
    fila.appendChild(celda_precio);
    fila.appendChild(celda_stock);

    tabla.appendChild(fila);

}