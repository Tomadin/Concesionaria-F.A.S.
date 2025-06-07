
package Fundamentos.de.Analisis.de.Sistemas.repositorios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente; // Importación de la clase Cliente, que representa la entidad a gestionar en la base de datos.
import java.util.Optional; // Importación de Optional, para manejar posibles valores nulos de forma segura.
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    public Optional<Cliente> findByDni(int dni);
    //Optional<Cliente> findByDni(int dni);
};