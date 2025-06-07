
package Fundamentos.de.Analisis.de.Sistemas.servicios;


import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.ClienteRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServicio {
    @Autowired
    private ClienteRepository repo;
    
    public Cliente guardarCliente(Cliente cliente){ // Guarda un cliente en la base de datos y devuelve el objeto guardado (con ID si es nuevo).
       return repo.save(cliente);
    }
    
    
    public List<Cliente> obtenerTodos(){ // Retorna una lista con todos los clientes registrados en la base de datos.
        return repo.findAll();
    }
    
    public Optional<Cliente> buscarPorId(long id){ // Busca un cliente por su ID. Devuelve un Optional que puede contener el cliente o estar vacío.
        return repo.findById(id); 
    }
    
    public void eliminarCliente(long id){  // Elimina un cliente por su ID.
        repo.deleteById(id);
    }
 
    public Optional<Cliente> buscarPorDni(int dni) { // Busca un cliente por su DNI. Devuelve un Optional con el resultado.
        return repo.findByDni(dni);
    }

}