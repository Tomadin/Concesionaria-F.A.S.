//ESTA FUNCIÓN ES PARA BUSCAR EN LA PÁGINA PRINCIPAL DESDE LAS OTRAS PÁGINAS
//ESTE SCRIPT NO ES ACCESIBLE DESDE LA PÁGINA PRINCIPAL. La página principal tiene el suyo


document.getElementById("form_buscar").addEventListener('submit', function(e) {
  e.preventDefault();

  filtrar_filas();
});


function filtrar_filas(){
    //ventana emergente con opcion aceptar o cancelar
    if(!confirm("Salir de la página actual? Se perderán los cambios realizados.")){
        return;
    }
    //si se acepta, se sale de la página actual y se pasa el parámetro de búsqueda por la barra de búsqueda del navegador
    const busqueda = document.getElementById("input_buscar").value
    const urlRedireccion = `${"http://localhost:8080/"}#${busqueda}`;

    // Redireccionar a la nueva URL (página principal con parámetro de búsqueda)
    window.location.href = urlRedireccion;
  
}