
package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Vendedor;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.VendedorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendedorServicio {
    @Autowired
    private VendedorRepository repo;
    
    public Vendedor guardar(Vendedor vend){
        return repo.save(vend);
    }
    
    public List<Vendedor> listarTodos(){
        return repo.findAll();
    }
    
    public Optional<Vendedor> buscarPorId(int id){
        return repo.findById(id); 
    }
    
    public void eliminarVendedor(int id){
        repo.deleteById(id);
    }
    
    
    
}
