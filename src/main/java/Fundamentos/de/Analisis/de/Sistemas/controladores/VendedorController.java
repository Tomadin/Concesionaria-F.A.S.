
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Vendedor;
import Fundamentos.de.Analisis.de.Sistemas.servicios.VendedorServicio;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController {
    
    @Autowired
    private VendedorServicio servicio;
    
    
    @PostMapping("/crear")
    public Vendedor crearVendedor(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam int telefono,
            @RequestParam String correoElectronico,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaNacimiento) {

        // Crear un nuevo objeto Vendedor
        Vendedor vendedor = new Vendedor(nombre, apellido, telefono, correoElectronico, fechaNacimiento);
        
        // Guardar el vendedor utilizando el servicio
        return servicio.guardar(vendedor);
    }
    
    
}
