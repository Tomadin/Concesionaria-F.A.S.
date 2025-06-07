
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ClienteServicio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController // Esta clase responde con datos JSON (no vistas HTML)
@RequestMapping("/api/cliente")  // Ruta base para este controlador
public class ClienteController {
    @Autowired // Inyección del servicio que contiene la lógica de negocio de Cliente
    private ClienteServicio servicio;
    
    /*
     * Crea un nuevo cliente con los datos enviados en el cuerpo de la solicitud
     * Ruta: POST /api/cliente/crear
     * Recibe un objeto JSON de tipo Cliente
     * Devuelve el objeto Cliente guardado
     */
    @PostMapping("/crear")
    public Cliente crearModelo(@RequestBody Cliente cliente){
        return servicio.guardarCliente(cliente); // Guarda el cliente usando el servicio
    }
    
    /*
     * Lista todos los clientes disponibles
     * Ruta: GET /api/cliente/listar
     * Devuelve: Lista de clientes en JSON
     */
    @GetMapping("/listar")
    public List<Cliente> obtenerModelos(){
        return servicio.obtenerTodos(); // Devuelve todos los clientes registrados
    }
    
     /*
     * Busca un cliente por su DNI (parámetro en la URL)
     * Ruta: GET /api/cliente/buscar?dni=12345678
     * Devuelve: Cliente encontrado o 404 si no existe
     */
    @GetMapping("/buscar")
    public ResponseEntity<Cliente> buscarPorDNI(@RequestParam("dni") int dni){
        Optional<Cliente> cliente = servicio.buscarPorDni(dni);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get()); // Si existe, lo devuelve
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
