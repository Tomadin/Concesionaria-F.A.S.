
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
    
    public Cliente guardarCliente(Cliente cliente){
       return repo.save(cliente);
    }
    
    
    public List<Cliente> obtenerTodos(){
        return repo.findAll();
    }
    
    public Optional<Cliente> buscarPorId(long id){
        return repo.findById(id); 
    }
    
    public void eliminarCliente(long id){
        repo.deleteById(id);
    }
}