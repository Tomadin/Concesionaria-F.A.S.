
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import Fundamentos.de.Analisis.de.Sistemas.modelos.Modelo;
import Fundamentos.de.Analisis.de.Sistemas.servicios.ModeloServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/modelos")
public class ModeloController {
    
    @Autowired
    private ModeloServicio servicio;
    
    @PostMapping("/crear")
    public Modelo crearModelo(@RequestParam String nombre,
            @RequestParam String version,
            @RequestParam String carroceria,
            @RequestParam String motor,
            @RequestParam String transmision,
            @RequestParam int cantPuertas
            ){
        return servicio.modeloGuardar(crearModelo(nombre, version, carroceria, motor, transmision, cantPuertas));
    }
    
    /*
    
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
    */
}
