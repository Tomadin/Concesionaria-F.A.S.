/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Fundamentos.de.Analisis.de.Sistemas.repositorios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Cliente;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    public Optional<Cliente> findByDni(int dni);
    //Optional<Cliente> findByDni(int dni);
};