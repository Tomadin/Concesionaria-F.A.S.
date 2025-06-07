
package Fundamentos.de.Analisis.de.Sistemas.controladores;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
 
@Controller // Controlador tradicional de Spring MVC (devuelve vistas, no JSON)
@RequestMapping("/") // Ruta base del sistema, todas las rutas se añaden sobre esta
public class ConcesionariaController {
    
    /*
     * Página principal del sistema
     * Ruta: GET /
     * Vista retornada: vista-principal.html
     */
    @GetMapping("/")
    public String concesionaria(){
        return "vista-principal.html";
    }
    
     /*
     * Página para cargar un nuevo vehículo
     * Ruta: GET /vehiculos
     * Vista: formulario-cargar-vehiculo.html
     */
    @GetMapping("/vehiculos")
    public String cargarNuevoVehiculo(){
        return "formulario-cargar-vehiculo.html";
    }
    
   /*
     * Página para cargar un nuevo modelo de vehículo
     * Ruta: GET /modelos
     * Vista: formulario-cargar-modelo.html
     */
    @GetMapping("/modelos")
    public String cargarNuevoModelo2(){
        return "formulario-cargar-modelo.html";
    }
    
     /*
     * Página para registrar un nuevo proveedor
     * Ruta: GET /proveedores
     * Vista: formulario-cargar-proveedor.html
     */
    @GetMapping("/proveedores")
    public String cargarNuevoProveedor(){
        return "formulario-cargar-proveedor.html";
    }
    
    /*
     * Página para registrar un nuevo cliente
     * Ruta: GET /clientes
     * Vista: formulario-cargar-cliente.html
     */
    @GetMapping("/clientes")
    public String cargarNuevoCliente(){
        return "formulario-cargar-cliente.html";
    }
    
     /*
     * Página para registrar una nueva venta
     * Ruta: GET /venta
     * Vista: formulario-cargar-venta.html
     */
    
    @GetMapping("/venta")
    public String cargarNuevaVenta(){
        return "formulario-cargar-venta.html";
    }
    
    /*
     * Página para ver el historial o registro de ventas
     * Ruta: GET /registro
     * Vista: registro-ventas.html
     */
    @GetMapping("/registro")
    public String registroVentas(){
        return "registro-ventas.html";
    }

}
