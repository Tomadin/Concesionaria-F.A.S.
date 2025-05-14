
package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Modelo;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.ModeloRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModeloServicio {
    @Autowired
    ModeloRepository repo;
    
    public Modelo modeloGuardar(Modelo modelo){
        return repo.save(modelo);
    }
    
    public Modelo crearModelo(String nombre, String version, String carroceria, String motor, String transmision, int cantPuertas){
        Modelo modelo = new Modelo(nombre, version, carroceria, motor, transmision, cantPuertas);
        return modelo;
    }
    
    public List<Modelo> listarTodos(){
        return repo.findAll();
    }
    
    public Optional<Modelo> buscarPorId(int id){
        return repo.findById(id);
    }
    
    public void eliminarModelo(int id){
        repo.deleteById(id);
    }
            
}
