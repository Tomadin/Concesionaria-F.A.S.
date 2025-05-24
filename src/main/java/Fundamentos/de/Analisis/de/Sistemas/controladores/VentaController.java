
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<?> crearVenta(
        @RequestBody Venta venta
    ) {
        try {
            venta.setDni_cliente(venta.getDni_cliente());
            venta.setDni_empleado(venta.getDni_empleado());
            venta.setMetodo_pago(venta.getMetodo_pago());
            venta.setVehiculos(venta.getVehiculos());
            venta.setObservaciones(venta.getObservaciones());
            List<Auto> vehiculos= venta.getVehiculos();
            for (Auto auto : vehiculos) {
                autoServicio.restarStock((long) auto.getId(), 1);
            }

            ventaServicio.guardar(venta);
            return ResponseEntity.ok(venta); 
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar la venta");
        }
    }
    
    
    @GetMapping("/listar")
    @ResponseBody //Lo convierte en un JSON
    @CrossOrigin(origins = "http://localhost:8080")
    public List<Venta> listarVentas(){
        return ventaServicio.listarTodos();
    }
    
    
    @PostMapping("/restarStock/{id}")
    public void restarStock(@PathVariable int id, @RequestParam int cantidad) {
    autoServicio.restarStock(id, cantidad);
    }
}
