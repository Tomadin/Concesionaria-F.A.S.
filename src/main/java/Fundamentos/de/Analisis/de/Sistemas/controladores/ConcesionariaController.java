
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ConcesionariaController {
    
    @GetMapping("/")
    public String concesionaria(){
        return "vista-principal.html";
    }
    
    @GetMapping("/vehiculos")
    public String cargarNuevoVehiculo(){
        return "formulario-cargar-vehiculo.html";
    }
    
   
    @GetMapping("/modelos")
    public String cargarNuevoModelo2(){
        return "formulario-cargar-modelo.html";
    }
    
    @GetMapping("/proveedores")
    public String cargarNuevoProveedor(){
        return "formulario-cargar-proveedor.html";
    }
    
    @GetMapping("/clientes")
    public String cargarNuevoCliente(){
        return "formulario-cargar-cliente.html";
    }
    
    @GetMapping("/venta")
    public String cargarNuevaVenta(){
        return "formulario-cargar-venta.html";
    }
}
