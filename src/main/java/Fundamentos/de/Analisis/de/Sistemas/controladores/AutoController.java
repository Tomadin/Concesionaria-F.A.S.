/*
 * Los controladores en Spring Boot se encargan de recibir y gestionar las solicitudes HTTP del usuario,
 * actuando como intermediarios entre el frontend (la interfaz del usuario) y la lógica del negocio (servicios).
 *
 * Su principal función es:
 * - Interpretar las peticiones HTTP entrantes (GET, POST, PUT, DELETE, etc.).
 * - Llamar a los métodos correspondientes del servicio (lógica de negocio).
 * - Preparar y devolver las respuestas apropiadas (HTML, JSON, error, etc.).
 *
 * En este proyecto, por ejemplo, el controlador AutoController se encarga de:
 * - Mostrar formularios para registrar vehículos.
 * - Recibir datos desde el frontend para crear autos.
 * - Listar todos los autos registrados.
 * - Obtener información detallada de un auto específico.
 * 
 * También puede manejar archivos (como imágenes) y controlar errores en las operaciones.
 *
 * El controlador no debe contener lógica de negocio compleja, sino delegarla al servicio correspondiente.
 */

package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.modelos.Modelo;
import Fundamentos.de.Analisis.de.Sistemas.servicios.AutoServicio;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


@Controller // Indica que esta clase es un controlador web
@RequestMapping("/autos")   // Todas las rutas definidas aquí comienzan con /autos
public class AutoController {
    
    @Autowired // Inyecta automáticamente una instancia del servicio de autos
    private AutoServicio autoServicio;
    
     /*
     * Muestra el formulario para cargar un nuevo vehículo
     * Ruta: GET /autos/nuevo
     */
    @GetMapping("/nuevo")  
    public String mostrarFormularioAuto(Model model){
        model.addAttribute("auto",new Auto()); // Se añade un nuevo objeto Auto al modelo para el formulario
        return "formulario-cargar-vehiculo";  // Devuelve la vista HTML correspondiente
    }
    

    /*
     * Crea un nuevo auto desde los datos del formulario (API REST)
     * Ruta: POST /autos/crear
     * Retorna un JSON con el objeto creado o un error
     */
    @PostMapping("/crear")
    @ResponseBody
    public ResponseEntity<?> crearAuto(
        @RequestParam("modelo") Modelo modelo,
        @RequestParam("version") String version,
        @RequestParam("proveedor") String proveedor,
        @RequestParam("matricula") String matricula,
        @RequestParam("precio") float precio,
        @RequestParam("color") String color,
        @RequestParam("anio") int anio,
        @RequestParam("serie") String serie,
        @RequestParam("estado") String estado,
        @RequestParam(value = "imagen", required = false) MultipartFile imagen
    ) {
        try {
            Auto auto = new Auto();
            auto.setModelo(modelo);
            auto.setVersion(version);
            auto.setProveedor(proveedor);
            auto.setMatricula(matricula);
            auto.setPrecio(precio);
            auto.setColor(color);
            auto.setEstado(estado);
            auto.setAnioFabricacion(anio);
            auto.setSerie(serie);
            
            if (imagen != null && !imagen.isEmpty()) { // Si se envía una imagen, se convierte en arreglo de bytes
                auto.setImagen(imagen.getBytes()); 
            }
            
            autoServicio.guardarAuto(auto);// Guarda el auto a través del servicio
            
            return ResponseEntity.ok(auto);  // Devuelve el objeto auto como respuesta exitosa
        } catch (IOException e) {
            e.printStackTrace(); // Devuelve error 500 si falla el procesamiento de la imagen
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la imagen");
        }
    }
    
    /*
     * Lista todos los autos registrados (en formato JSON)
     * Ruta: GET /autos/listar
     */
    @GetMapping("/listar")
    @ResponseBody //Lo convierte en un JSON
    @CrossOrigin(origins = "http://localhost:8080")  // Permite solicitudes desde el frontend local
    public List<Auto> listarAutos(){
        return autoServicio.obtenerTodos();   // Devuelve lista de autos desde el servicio
    }
    
    /*
    @PostMapping("/restarStock/{id}")
    public void restarStock(@PathVariable int id, @RequestParam int cantidad) {
    autoServicio.restarStock(id, cantidad);
    }
*/
    
    
    /*
     * Devuelve un auto específico por su ID
     * Ruta: GET /autos/{id}
     * Retorna JSON o 404 si no se encuentra
     */
    @GetMapping("/{id}")
@ResponseBody
@CrossOrigin(origins = "http://localhost:8080") 
public ResponseEntity<Auto> obtenerAutoPorId(@PathVariable("id") Long id) {
    Auto auto = autoServicio.obtenerPorId(id); // Busca auto por ID
    if (auto != null) {
        return ResponseEntity.ok(auto); // Devuelve auto si existe
    } else {
        return ResponseEntity.notFound().build();  // Retorna 404 si no se encuentra
    }
}
}
