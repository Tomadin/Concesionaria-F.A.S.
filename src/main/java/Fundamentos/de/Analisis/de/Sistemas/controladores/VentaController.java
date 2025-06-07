package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Auto;
import Fundamentos.de.Analisis.de.Sistemas.modelos.Venta;
import Fundamentos.de.Analisis.de.Sistemas.servicios.AutoServicio;
import Fundamentos.de.Analisis.de.Sistemas.servicios.VentaServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venta") // Ruta base para todas las operaciones relacionadas con ventas
public class VentaController {

    @Autowired // Inyección del servicio de ventas
    private VentaServicio ventaServicio;
    @Autowired // Inyección del servicio de autos (para actualizar estado de los vehículos vendidos)
    private AutoServicio autoServicio;

    @PostMapping("/crear")
    @ResponseBody
    @Transactional
    public ResponseEntity<?> crearVenta(@RequestBody Venta venta) {
        try {
            System.out.println("DEBUG: JSON recibido -> " + venta);
            List<Auto> vehiculos = venta.getVehiculos(); // Obtener la lista de vehículos asociados a la venta

            if (vehiculos == null || vehiculos.isEmpty()) { // Validación: no se puede registrar una venta sin autos
                return ResponseEntity.badRequest().body("No se enviaron vehículos");
            }
            // Procesar cada vehículo incluido en la venta
            for (Auto auto : vehiculos) {
                System.out.println("Auto recibido: " + auto);
                Auto managedAuto = autoServicio.obtenerPorId(auto.getId()); // Traer el auto desde la base de datos para asegurarse que esté gestionado por el contexto de persistencia
                if(!managedAuto.getEstado().equals("VENDIDO")){ // Validar que el auto no esté vendid
                    managedAuto.setVenta(venta);  // Asociar el auto a la venta actual
                    autoServicio.cambiarEstado(managedAuto); // Cambiar su estado a "VENDIDO"
                }else{ // Si ya está vendido, lanzar erro
                    throw new IllegalStateException("El vehículo con ID " + managedAuto.getId() + " ya está vendido");
                }
            }
             // Guardar la venta con todos los autos asociado
            Venta guardada = ventaServicio.guardar(venta);
            return ResponseEntity.ok(guardada); // Retornar la venta guardada

        } catch (IllegalStateException e) { // Si ocurre algún error, retornar un mensaje genérico
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar la venta");
        }
    }
    
    /*
     * Obtener todas las ventas registradas
     * Ruta: GET /api/venta/listar
     * Retorna: lista de ventas en JSON
     */
    
    @GetMapping("/listar")
    @ResponseBody //Lo convierte en un JSON
    @CrossOrigin(origins = "http://localhost:8080")
    public List<Venta> listarVentas() {
        return ventaServicio.listarTodos();
    }

}
