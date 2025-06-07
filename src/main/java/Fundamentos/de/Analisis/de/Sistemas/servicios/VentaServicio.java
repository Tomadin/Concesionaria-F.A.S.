package Fundamentos.de.Analisis.de.Sistemas.servicios;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.modelos.Venta;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.AutoRepository;
import Fundamentos.de.Analisis.de.Sistemas.repositorios.VentaRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VentaServicio {

    @Autowired // Inyección automática del repositorio de ventas para acceder a la base de datos.
    VentaRepository repo;
    @Autowired // Inyección del repositorio de autos, necesario para vincular autos a una venta.
    AutoRepository autoRepo;
    
    @Transactional  // Marca el método como transaccional: todas las operaciones dentro deben completarse correctamente o se revierte todo
    public Venta guardar(Venta venta) { // Se crea una nueva instancia de Venta para evitar problemas con objetos no gestionados por JPA.
        Venta ve = new Venta();
        ve.setDni_cliente(venta.getDni_cliente());
        ve.setDni_empleado(venta.getDni_empleado());
        ve.setMetodo_pago(venta.getMetodo_pago());
        ve.setObservaciones(venta.getObservaciones());

        // Primero guarda la venta sin los autos
        ve = repo.save(ve);

        List<Auto> autosGestionados = new ArrayList<>(); // Lista que contendrá los autos gestionados correctamente (relacionados con la venta).
        if (venta.getVehiculos() != null) { 
            for (Auto auto : venta.getVehiculos()) {
                Auto managedAuto = autoRepo.findById(auto.getId()).orElseThrow();
                managedAuto.setVenta(ve); // Establece la relación
                autosGestionados.add(autoRepo.save(managedAuto)); // Guarda el auto actualizado
            }
        }

        ve.setVehiculos(autosGestionados); // Asocia la lista de autos a la venta.
        
        return repo.save(ve); // Guarda la venta con la lista actualizada
    }
    // Devuelve una lista con todas las ventas registradas.
    public List<Venta> listarTodos() {
        return repo.findAll();
    }
    // Busca una venta por ID. Devuelve un Optional (puede estar vacía si no existe).
    public Optional<Venta> buscarPorId(int id) {
        return repo.findById(id);
    }
    // Elimina una venta de la base de datos por su ID.
    public void eliminarVenta(int id) {
        repo.deleteById(id);
    }

}
