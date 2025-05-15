
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*") // Permitir fetch desde HTML en /static
public class ClienteApiController {

    @Autowired
    private ClienteServicio clienteServicio;

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteServicio.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<Cliente> guardarCliente(@RequestBody Cliente cliente) {
        Cliente guardado = clienteServicio.guardarCliente(cliente);
        return new ResponseEntity<>(guardado, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable int id) {
        clienteServicio.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}