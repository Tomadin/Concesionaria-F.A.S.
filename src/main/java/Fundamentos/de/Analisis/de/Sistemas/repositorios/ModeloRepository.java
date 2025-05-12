
package Fundamentos.de.Analisis.de.Sistemas.repositorios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ModeloRepository extends JpaRepository<Modelo, Integer>{};
