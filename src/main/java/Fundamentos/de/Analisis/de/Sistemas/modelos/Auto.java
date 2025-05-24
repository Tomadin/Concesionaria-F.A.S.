package Fundamentos.de.Analisis.de.Sistemas.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Base64;

@Entity
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String color;
    private int AnioFabricacion;
    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
    private int stock;
    private int Kilometraje;
    private float precio;
    private String version;
    private String proveedor;
    private String matricula;
    private String serie;
    @Lob
    @Column(name = "imagen", columnDefinition = "LONGBLOB")
    private byte[] imagen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id")
    @JsonIgnore
    private Venta venta;

    public Auto() {
    }

    public Auto(long id, String color, int AnioFabricacion, Modelo modelo, int stock, int Kilometraje, float precio, String version, String proveedor, String matricula, String serie, byte[] imagen) {
        this.id = id;
        this.color = color;
        this.AnioFabricacion = AnioFabricacion;
        this.modelo = modelo;
        this.stock = stock;
        this.Kilometraje = Kilometraje;
        this.precio = precio;
        this.version = version;
        this.proveedor = proveedor;
        this.matricula = matricula;
        this.serie = serie;
        this.imagen = imagen;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getAnioFabricacion() {
        return AnioFabricacion;
    }

    public void setAnioFabricacion(int AnioFabricacion) {
        this.AnioFabricacion = AnioFabricacion;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getKilometraje() {
        return Kilometraje;
    }

    public void setKilometraje(int Kilometraje) {
        this.Kilometraje = Kilometraje;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float Precio) {
        this.precio = Precio;
    }

    public String getImagenBase64() {
        if (imagen != null && imagen.length > 0) {
            return Base64.getEncoder().encodeToString(imagen);
        }
        return null;
    }

    @Override
    public String toString() {
        return "Auto{" + "id=" + id + ", color=" + color + ", AnioFabricacion=" + AnioFabricacion + ", modelo=" + modelo + ", stock=" + stock + ", Kilometraje=" + Kilometraje + ", precio=" + precio + ", version=" + version + ", proveedor=" + proveedor + ", matricula=" + matricula + ", serie=" + serie + ", imagen=" + imagen + '}';
    }

}
