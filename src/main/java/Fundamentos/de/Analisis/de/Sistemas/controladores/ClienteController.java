
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

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {
    @Autowired
    private ClienteServicio servicio;
    
    @PostMapping("/crear")
    public Cliente crearModelo(@RequestBody Cliente cliente){
        return servicio.guardarCliente(cliente);
    }
    
    @GetMapping("/listar")
    public List<Cliente> obtenerModelos(){
        return servicio.obtenerTodos();
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<Cliente> buscarPorDNI(@RequestParam("dni") int dni){
        Optional<Cliente> cliente = servicio.buscarPorDni(dni);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
