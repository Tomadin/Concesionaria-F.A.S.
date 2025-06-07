
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
    
    public Modelo modeloGuardar(Modelo modelo){ // Guarda un objeto Modelo en la base de datos y lo retorna
        return repo.save(modelo);
    }
    // Crea un nuevo objeto Modelo con los datos proporcionados (sin guardarlo aún en la base).
    public Modelo crearModelo(String nombre, String version, String carroceria, String motor, String transmision, int cantPuertas){
        Modelo modelo = new Modelo(nombre, version, carroceria, motor, transmision, cantPuertas);
        return modelo;
    }
    // Devuelve una lista con todos los modelos almacenados en la base de datos.
    public List<Modelo> listarTodos(){
        return repo.findAll();
    }
    
    public Optional<Modelo> buscarPorId(int id){  // Busca un modelo por su ID. 
        return repo.findById(id);
    }
    
    public void eliminarModelo(int id){ // Elimina un modelo de la base de datos según su ID.
        repo.deleteById(id);
    }
            
}
