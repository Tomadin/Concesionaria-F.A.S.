/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Fundamentos.de.Analisis.de.Sistemas.modelos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String dni_cliente;
    private String dni_empleado;
    private String metodo_pago;
     @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"venta"})
    private List<Auto> vehiculos;
    private String observaciones;

    
    public Venta() {
    }

    public Venta(String dni_cliente, String dni_empleado, String metodo_pago, List<Auto> vehiculos, String observaciones) {
        this.dni_cliente = dni_cliente;
        this.dni_empleado = dni_empleado;
        this.metodo_pago = metodo_pago;
        this.vehiculos = vehiculos;
        this.observaciones = observaciones;
    }

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

    @Override
    public String toString() {
        return "Venta{" + "id=" + id + ", dni_cliente=" + dni_cliente + ", dni_empleado=" + dni_empleado + ", metodo_pago=" + metodo_pago + ", vehiculos=" + vehiculos + ", observaciones=" + observaciones + '}';
    }

    

}

