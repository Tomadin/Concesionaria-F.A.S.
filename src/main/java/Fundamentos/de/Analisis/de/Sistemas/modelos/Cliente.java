
package Fundamentos.de.Analisis.de.Sistemas.modelos;



import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Basic
    private String nombre;
    private String Apellido;
    private int dni;
    private int Telefono;
    private String calle;
    private int NumeroCalle;
    private String CorreoElectronico;
    
    @Temporal(TemporalType.DATE)
    private Date FechaNacimiento;
    
    public Cliente() {
    }

    public Cliente(long id, String nombre, String Apellido,int dni, int Telefono, String calle, int NumeroCalle, String CorreoElectronico, Date FechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.Apellido = Apellido;
        this.dni = dni;
        this.Telefono = Telefono;
        this.calle = calle;
        this.NumeroCalle = NumeroCalle;
        this.CorreoElectronico = CorreoElectronico;
        this.FechaNacimiento = FechaNacimiento;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getDni() {
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return Apellido;
    }

    public void setApellido(String Apellido) {
        this.Apellido = Apellido;
    }

 
    public int getTelefono() {
        return Telefono;
    }

    public void setTelefono(int Telefono) {
        this.Telefono = Telefono;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumeroCalle() {
        return NumeroCalle;
    }

    public void setNumeroCalle(int NumeroCalle) {
        this.NumeroCalle = NumeroCalle;
    }

    public String getCorreoElectronico() {
        return CorreoElectronico;
    }

    public void setCorreoElectronico(String CorreoElectronico) {
        this.CorreoElectronico = CorreoElectronico;
    }

    public Date getFechaNacimiento() {
        return FechaNacimiento;
    }

    public void setFechaNacimiento(Date FechaNacimiento) {
        this.FechaNacimiento = FechaNacimiento;
    }
    
    
}


