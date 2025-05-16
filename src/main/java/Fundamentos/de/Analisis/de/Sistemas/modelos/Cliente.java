
package Fundamentos.de.Analisis.de.Sistemas.modelos;



import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int DNI;
    @Basic
    private String nombre;
    private String apellido;
    private String  telefono;
    private String calle;
    private String  numeroCalle;
    private String correoElectronico;
    
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;
    
    public Cliente() {
    }

    public Cliente(int DNI, String nombre, String Apellido, String  Telefono, String calle, String  NumeroCalle, String CorreoElectronico, Date FechaNacimiento) {
        this.DNI = DNI;
        this.nombre = nombre;
        this.apellido = Apellido;
        this.telefono = Telefono;
        this.calle = calle;
        this.numeroCalle = NumeroCalle;
        this.correoElectronico = CorreoElectronico;
        this.fechaNacimiento = FechaNacimiento;
    }

    public int getDNI() {
        return DNI;
    }

    public void setDNI(int DNI) {
        this.DNI = DNI;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String Apellido) {
        this.apellido = Apellido;
    }

    public String  getTelefono() {
        return telefono;
    }

    public void setTelefono(String  Telefono) {
        this.telefono = Telefono;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String  getNumeroCalle() {
        return numeroCalle;
    }

    public void setNumeroCalle(String  NumeroCalle) {
        this.numeroCalle = NumeroCalle;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String CorreoElectronico) {
        this.correoElectronico = CorreoElectronico;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date FechaNacimiento) {
        this.fechaNacimiento = FechaNacimiento;
    }
    
    
}


