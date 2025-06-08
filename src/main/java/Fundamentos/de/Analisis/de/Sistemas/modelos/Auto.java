/*
 * Los modelos (o entidades) representan las tablas de la base de datos en forma de clases Java.
 * Son parte fundamental de JPA (Java Persistence API) y permiten mapear objetos de Java a registros en la base de datos.
 *
 * Cada instancia de esta clase equivale a una fila en la tabla correspondiente, y cada atributo es una columna.
 *
 * Características principales de una entidad:
 * - Se anota con @Entity para indicar que es una tabla.
 * - Usa @Id para definir la clave primaria.
 * - Se pueden definir relaciones entre entidades (@OneToMany, @ManyToOne, @OneToOne, etc.).
 * - Permiten incluir lógica auxiliar como métodos `toString()`, `getImagenBase64()` o constructores personalizados.
 *
 * En este proyecto, la entidad Auto representa los vehículos en venta y contiene:
 * - Datos básicos como color, modelo, matrícula, precio, año, etc.
 * - Una imagen almacenada como arreglo de bytes (LONGBLOB).
 * - Relaciones con otras entidades como Modelo (modelo del vehículo) y Venta (en caso de estar vendido).
 *
 * Estas clases son gestionadas por Hibernate, que se encarga de la persistencia (guardar, actualizar, eliminar, buscar en BD).
 */

package Fundamentos.de.Analisis.de.Sistemas.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Base64;

@Entity // Indica que esta clase es una entidad JPA que se mapeará a una tabla en la base de datos
public class Auto {

    @Id // Marca el atributo 'id' como la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // La generación del id es automática y depende de la base de datos (auto-incremental)
    private long id;
    private String estado;
    private String color;
    private int AnioFabricacion;
    @ManyToOne // Relación muchos a uno con la entidad Modelo (varios autos pueden tener un mismo modelo)
    @JoinColumn(name = "modelo_id") // Especifica la columna en la tabla Auto que se usará como clave foránea para Modelo
    private Modelo modelo;
    private int Kilometraje;
    private float precio;
    private String version;
    private String proveedor;
    private String matricula;
    private String serie;
    @Lob // Indica que el campo es un objeto grande (Large Object), en este caso un arreglo de bytes para la imagen
    @Column(name = "imagen", columnDefinition = "LONGBLOB") // Define que la columna se almacena como LONGBLOB en la base de datos para grandes imágenes
    private byte[] imagen; // Imagen del auto almacenada en bytes

    @ManyToOne(fetch = FetchType.LAZY) // Relación muchos a uno con la entidad Venta se carga de manera perezosa (Lazy)
    @JoinColumn(name = "venta_id") // Columna que contiene la referencia a la venta asociada
    @JsonIgnore
    private Venta venta;
    
    // Constructor vacío requerido por JPA
    public Auto() {
    }
    // Constructor con parámetros para inicializar un Auto con sus atributos
    public Auto(long id, String color, int AnioFabricacion, Modelo modelo, int Kilometraje, float precio, String version, String proveedor, String matricula, String serie, byte[] imagen) {
        this.id = id;
        this.color = color;
        this.AnioFabricacion = AnioFabricacion;
        this.modelo = modelo;
        this.estado = "DISPONIBLE";
        this.Kilometraje = Kilometraje;
        this.precio = precio;
        this.version = version;
        this.proveedor = proveedor;
        this.matricula = matricula;
        this.serie = serie;
        this.imagen = imagen;
    }
    
    // Getters y setters para acceder y modificar cada propiedad de la clase
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    /*
     * Convierte la imagen almacenada en bytes a una cadena en Base64,
     * lo que facilita la visualización en páginas web o APIs REST.
     * @return String con la imagen codificada en Base64 o null si no hay imagen
     */
    public String getImagenBase64() {
        if (imagen != null && imagen.length > 0) {
            return Base64.getEncoder().encodeToString(imagen);
        }
        return null;
    }
    /*
     * Método toString sobrescrito para facilitar la impresión del objeto Auto,
     * mostrando los principales atributos y evitando imprimir la imagen para no saturar la salida.
     */
    @Override
    public String toString() {
        return "Auto{" + "id=" + id + ", estado=" + estado + ", color=" + color + ", AnioFabricacion=" + AnioFabricacion + ", modelo=" + modelo + ", Kilometraje=" + Kilometraje + ", precio=" + precio + ", version=" + version + ", proveedor=" + proveedor + ", matricula=" + matricula + ", serie=" + serie + ", imagen=" + imagen + ", venta=" + (venta != null ? venta.getId() : "null") +
            '}';
    }

}
