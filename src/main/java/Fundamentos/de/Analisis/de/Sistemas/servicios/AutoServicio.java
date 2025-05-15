
package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.AutoRepository;
import java.util.List;
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
}
