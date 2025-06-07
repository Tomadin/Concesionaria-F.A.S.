/*
 * Los repositorios en Spring Boot actúan como la capa de acceso a datos (DAO).
 * 
 * Esta interfaz extiende JpaRepository, lo que permite realizar operaciones CRUD 
 * (crear, leer, actualizar y eliminar) sobre la entidad correspondiente (por ejemplo, Cliente, Auto, etc.)
 * sin necesidad de escribir consultas SQL manuales.
 * 
 * Además, Spring Data JPA permite definir métodos personalizados siguiendo una convención de nombres, 
 * como `findByDni`, y genera automáticamente la consulta correspondiente.
 * 
 * Al usar repositorios, se simplifica el acceso a la base de datos y se mantiene un código más limpio y mantenible.
 */
package Fundamentos.de.Analisis.de.Sistemas.repositorios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto; // Importación de la entidad Auto que se utilizará en el repositorio
import org.springframework.data.jpa.repository.JpaRepository; // Importación de JpaRepository, que proporciona métodos CRUD y de consulta


public interface AutoRepository extends JpaRepository<Auto, Long> { // Esta interfaz extiende JpaRepository para la entidad Auto y su clave primaria de tipo Long
    // Método para buscar un Auto por su id.
    public Auto findById(int id);
}
