//ESTA FUNCIÓN ES PARA BUSCAR EN LA PÁGINA PRINCIPAL DESDE LAS OTRAS PÁGINAS
//ESTE SCRIPT NO ES ACCESIBLE DESDE LA PÁGINA PRINCIPAL


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