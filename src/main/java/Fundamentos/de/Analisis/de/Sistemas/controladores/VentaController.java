package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.modelos.Venta;
import Fundamentos.de.Analisis.de.Sistemas.servicios.AutoServicio;
import Fundamentos.de.Analisis.de.Sistemas.servicios.VentaServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venta")
public class VentaController {

    @Autowired
    private VentaServicio ventaServicio;
    @Autowired
    private AutoServicio autoServicio;

    @PostMapping("/crear")
    @ResponseBody
    public ResponseEntity<?> crearVenta(@RequestBody Venta venta) {
        try {
            System.out.println("DEBUG: JSON recibido -> " + venta);
            List<Auto> vehiculos = venta.getVehiculos();

            if (vehiculos == null || vehiculos.isEmpty()) {
                return ResponseEntity.badRequest().body("No se enviaron vehículos");
            }

            for (Auto auto : vehiculos) {
                System.out.println("Auto recibido: " + auto);
                Auto managedAuto = autoServicio.obtenerPorId(auto.getId());
                managedAuto.setVenta(venta);
                autoServicio.cambiarEstado(managedAuto);
            }

            Venta guardada = ventaServicio.guardar(venta);
            return ResponseEntity.ok(guardada);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar la venta");
        }
    }

    @GetMapping("/listar")
    @ResponseBody //Lo convierte en un JSON
    @CrossOrigin(origins = "http://localhost:8080")
    public List<Venta> listarVentas() {
        return ventaServicio.listarTodos();
    }

}
