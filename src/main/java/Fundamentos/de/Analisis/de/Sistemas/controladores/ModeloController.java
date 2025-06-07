
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Modelo;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ModeloServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Indica que es un controlador REST: responde con JSON, no vistas HTML
@RequestMapping("/api/modelos") // Ruta base: todas las rutas comienzan con /api/modelo
public class ModeloController {
    
    @Autowired //lógica relacionada a los modelo
    private ModeloServicio servicio;
    
    /*
     * Crear un nuevo modelo de vehículo
     * Ruta: POST /api/modelos/crear
     * Cuerpo: JSON con los datos del modelo
     * Retorna: el modelo guardado (en JSON)
     */
    @PostMapping("/crear")
    public Modelo crearModelo(@RequestBody Modelo modelo){
        return servicio.modeloGuardar(modelo); // Llama al servicio para guardar el modelo
    }
    
    /*
     * Obtener todos los modelos existentes
     * Ruta: GET /api/modelos
     * Retorna: lista de modelos en formato JSON
     */
    @GetMapping("")
    public List<Modelo> obtenerModelos(){
        return servicio.listarTodos(); // Llama al servicio para obtener todos los modelos
    }
    
    
}
