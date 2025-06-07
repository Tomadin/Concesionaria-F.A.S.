
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Define esta clase como un controlador REST (no devuelve vistas, solo datos JSON)
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*") // Permitir fetch desde HTML en /static
public class ClienteApiController {
  
    @Autowired  // Inyección automática del servicio que maneja los datos de clientes
    private ClienteServicio clienteServicio;
    
    
     /*
      Obtener todos los clientes en formato JSON
      Ruta: GET /api/clientes
     */
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteServicio.obtenerTodos(); // Devuelve la lista de todos los clientes
    }

     /*
     * Guardar un nuevo cliente recibido como JSON
     * Ruta: POST /api/clientes
     * Cuerpo de la solicitud: JSON con los datos del cliente
     * Retorna: el cliente creado con código 201
     */
    @PostMapping
    public ResponseEntity<Cliente> guardarCliente(@RequestBody Cliente cliente) {
        Cliente guardado = clienteServicio.guardarCliente(cliente); // Guarda usando el servicio
        return new ResponseEntity<>(guardado, HttpStatus.CREATED); // Retorna el cliente y 201 (creado)
    }
    
     /*
     * Eliminar un cliente por su ID
     * Ruta: DELETE /api/clientes/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable int id) {
        clienteServicio.eliminarCliente(id);  // Elimina el cliente
        return ResponseEntity.noContent().build(); // Respuesta vacía con estado 204 (sin contenido)
    }
}