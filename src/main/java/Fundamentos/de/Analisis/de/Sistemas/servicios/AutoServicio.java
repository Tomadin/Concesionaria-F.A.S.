
package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.AutoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AutoServicio {
    
    @Autowired
    private AutoRepository autoRepository;
    
    public void guardarAuto(Auto auto){
        autoRepository.save(auto);
    }
    public List<Auto> obtenerTodos(){
        return autoRepository.findAll();
    }
    public Auto obtenerPorId(long id){
        return autoRepository.findById(id).orElse(null);
    }
    public void eliminarAuto(long id){
        autoRepository.deleteById(id);
    }

    public void restarStock(long id, int cantidad) {
        System.out.println("ENTRO A AUTOSERVICE");
        
        long cant = (long) cantidad;
        Optional<Auto> optional = autoRepository.findById(id);
        Auto auto = (Auto) optional.get();
      
        int cantActual = auto.getStock();
        if (cantidad > cantActual) {
            throw new IllegalArgumentException("Stock insuficiente para el auto ID " + id + ". Disponible: " + cantActual);
        }
        auto.setStock(cantActual - cantidad);
 
        autoRepository.save(auto);
    }
}
