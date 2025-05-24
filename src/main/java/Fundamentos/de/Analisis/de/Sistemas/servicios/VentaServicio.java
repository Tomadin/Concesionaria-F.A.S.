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

    @Autowired
    VentaRepository repo;
    @Autowired
    AutoRepository autoRepo;
    
    @Transactional
    public Venta guardar(Venta venta) {
        Venta ve = new Venta();
        ve.setDni_cliente(venta.getDni_cliente());
        ve.setDni_empleado(venta.getDni_empleado());
        ve.setMetodo_pago(venta.getMetodo_pago());
        ve.setObservaciones(venta.getObservaciones());

        // Primero guarda la venta sin los autos
        ve = repo.save(ve);

        List<Auto> autosGestionados = new ArrayList<>();
        if (venta.getVehiculos() != null) {
            for (Auto auto : venta.getVehiculos()) {
                Auto managedAuto = autoRepo.findById(auto.getId()).orElseThrow();
                managedAuto.setVenta(ve); // Establece la relación
                autosGestionados.add(autoRepo.save(managedAuto)); // Guarda el auto actualizado
            }
        }

        ve.setVehiculos(autosGestionados);
        
        return repo.save(ve); // Guarda la venta con la lista actualizada
    }

    public List<Venta> listarTodos() {
        return repo.findAll();
    }

    public Optional<Venta> buscarPorId(int id) {
        return repo.findById(id);
    }

    public void eliminarVenta(int id) {
        repo.deleteById(id);
    }

}
