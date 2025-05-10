/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Fundamentos.de.Analisis.de.Sistemas.modelos;

import jakarta.persistence.*;


@Entity
public class Auto {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    private String color;
    private int AnioFrabricacion;
    private String modelo;
    private int stock;
    private int Kilometraje;
    private int Puertas;
    private float Precio;

    public Auto() {
    }

    public Auto(long id, String color, int AnioFrabricacion, String modelo, int stock, int Kilometraje, int Puertas, float Precio) {
        this.id = id;
        this.color = color;
        this.AnioFrabricacion = AnioFrabricacion;
        this.modelo = modelo;
        this.stock = stock;
        this.Kilometraje = Kilometraje;
        this.Puertas = Puertas;
        this.Precio = Precio;
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

    public int getAnioFrabricacion() {
        return AnioFrabricacion;
    }

    public void setAnioFrabricacion(int AnioFrabricacion) {
        this.AnioFrabricacion = AnioFrabricacion;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
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

    public int getPuertas() {
        return Puertas;
    }

    public void setPuertas(int Puertas) {
        this.Puertas = Puertas;
    }

    public float getPrecio() {
        return Precio;
    }

    public void setPrecio(float Precio) {
        this.Precio = Precio;
    }
    
    
}
