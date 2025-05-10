/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
    
    public Cliente guardar(Cliente clie){
        return repo.save(clie);
    }
    
    public List<Cliente> listarTodos(){
        return repo.findAll();
    }
    
    public Optional<Cliente> buscarPorId(int id){
        return repo.findById(id); 
    }
    
    public void eliminarCliente(int id){
        repo.deleteById(id);
    }
}