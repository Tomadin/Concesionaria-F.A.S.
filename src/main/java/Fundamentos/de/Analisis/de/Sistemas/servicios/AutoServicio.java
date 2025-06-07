/*
 * Los servicios (@Service) representan la capa intermedia de la lógica de negocio en una aplicación Spring Boot.
 * 
 * Su función principal es encapsular la lógica que opera entre el controlador (que recibe la petición del usuario)
 * y el repositorio (que accede a la base de datos).
 * 
 * Esta capa permite mantener un código organizado, desacoplado y fácil de mantener. 
 * Además, facilita la reutilización de la lógica y su testeo unitario.
 */

package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.AutoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Anotación que marca esta clase como un componente de servicio de Spring.
// Spring la detecta automáticamente y la gestiona como un bean.
@Service
public class AutoServicio {
    
    @Autowired // Inyección automática del repositorio de Autos para acceder a la base de datos.
    private AutoRepository autoRepository;
    
    public void guardarAuto(Auto auto){ // Método que guarda un objeto Auto en la base de datos.
        autoRepository.save(auto);
    }
    public List<Auto> obtenerTodos(){ // Método que devuelve una lista con todos los autos registrados.
        return autoRepository.findAll();
    }
    public Auto obtenerPorId(long id){ 
        return autoRepository.findById(id).orElse(null);  // Método que busca un Auto por su ID. 
                                                            // Si no lo encuentra, retorna null (se puede usar Optional si querés evitar nulos) 
    }
    public void eliminarAuto(long id){ // Método que elimina un Auto de la base de datos por su ID.
        autoRepository.deleteById(id);
    }


    public void cambiarEstado(Auto auto) { // Método que cambia el estado de un Auto entre "DISPONIBLE" y "VENDIDO".
        if(auto.getEstado().equalsIgnoreCase("DISPONIBLE")){
            auto.setEstado("VENDIDO");
        } else{
            auto.setEstado("DISPONIBLE");
        }
    }

    
}
