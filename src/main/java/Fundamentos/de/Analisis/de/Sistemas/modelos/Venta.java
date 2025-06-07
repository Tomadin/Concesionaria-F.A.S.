/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Fundamentos.de.Analisis.de.Sistemas.modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;

@Entity // La clase representa una entidad Venta que se mapea a una tabla en la base de datos.
public class Venta {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String dni_cliente; // DNI del cliente que realizó la compra. Se recomienda en el futuro usar una relación con la entidad Cliente.
    private String dni_empleado; // DNI del empleado (vendedor) que realizó la venta. También podría relacionarse con la entidad Vendedor.
    private String metodo_pago; // Método de pago utilizado (por ejemplo: efectivo, tarjeta, transferencia)
     @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true) // Relación uno-a-muchos entre Venta y Auto: una venta puede incluir múltiples vehículos.
    @JsonIgnoreProperties({"venta"})  // Ignora la propiedad 'venta' dentro de Auto al serializar a JSON para evitar bucles infinitos.
    private List<Auto> vehiculos;
    // Marca automáticamente la fecha y hora de creación de la venta.
    @CreationTimestamp
    @Column(name = "fecha_venta", updatable = false) // Este campo no se puede modificar luego de crearse
    private LocalDateTime fecha;
    private String observaciones; // Observaciones adicionales o comentarios sobre la vent

    
    public Venta() {
    }
    // Constructor con parámetros para inicializar un nuevo objeto Venta
    public Venta(String dni_cliente, String dni_empleado, String metodo_pago, List<Auto> vehiculos, String observaciones) {
        this.dni_cliente = dni_cliente;
        this.dni_empleado = dni_empleado;
        this.metodo_pago = metodo_pago;
        this.vehiculos = vehiculos;
        this.observaciones = observaciones;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    // Métodos getter y setter para acceder y modificar los atributos privados
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    
    public String getDni_cliente() {
        return dni_cliente;
    }

    public void setDni_cliente(String dni_cliente) {
        this.dni_cliente = dni_cliente;
    }

    public String getDni_empleado() {
        return dni_empleado;
    }

    public void setDni_empleado(String dni_empleado) {
        this.dni_empleado = dni_empleado;
    }

    public String getMetodo_pago() {
        return metodo_pago;
    }

    public void setMetodo_pago(String metodo_pago) {
        this.metodo_pago = metodo_pago;
    }

    public List<Auto> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(List<Auto> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    // Representación en texto del objeto Venta
    @Override
    public String toString() {
        return "Venta{" + "id=" + id + ", dni_cliente=" + dni_cliente + ", dni_empleado=" + dni_empleado + ", metodo_pago=" + metodo_pago + ", vehiculos=" + vehiculos + ", observaciones=" + observaciones + '}';
    }

    

}

