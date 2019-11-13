/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import java.util.Base64;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;

/**
 *
 * @author randy
 */
@Entity
public class Alojamiento extends Servicio {
    
    public static enum TipoAlojamiento{
        HOTEL,CASA,CAMPING,MOTEL
    }
    @Enumerated(EnumType.STRING)
    private TipoAlojamiento tipoAlojamiento;
    
    private int numeroHabitaciones;
    private int numeroBanos;
    
    public static enum BooleanChoices{
        Si,No
    }
    @Enumerated(EnumType.STRING)
    private BooleanChoices servicioLimpieza;
    @Enumerated(EnumType.STRING)
    private BooleanChoices servicioWifi;

    @Override
    public String toJsonString() {
        String f = ((this.getFoto() == null) ? "null" :Base64.getMimeEncoder().encodeToString(this.getFoto()));
        String s = "{ Id : "+this.getId()+", nombre : "+this.getNombre()+" , pais : "+this.getPais()+", ciudad  :"+this.getCiudad()+", idioma :"+this.getIdioma()+","
           +"costo:"+this.getCosto()+",descripcion: "+this.getDescripcion()+", foto :"+f+", numeroPersonas :"+this.getNumeroPersonas()+", proveedor: "+this.getProveedor().toJsonString() 
           +",tipoAlojamiento : "+this.tipoAlojamiento.name()+",numeroHabitaciones : "+this.numeroHabitaciones + ",numeroBanos : "+this.numeroBanos
           +",servicioLimpieza : "+this.servicioLimpieza.name()+",servicioWifi:"+this.servicioWifi.name()+"tipo: alojamiento}";
        return s;
    }
    
    public TipoAlojamiento getTipoAlojamiento() {
        return tipoAlojamiento;
    }

    public int getNumeroHabitaciones() {
        return numeroHabitaciones;
    }

    public int getNumeroBanos() {
        return numeroBanos;
    }

    public BooleanChoices getServicioLimpieza() {
        return servicioLimpieza;
    }

    public BooleanChoices getServicioWifi() {
        return servicioWifi;
    }

    public void setTipoAlojamiento(TipoAlojamiento tipoAlojamiento) {
        this.tipoAlojamiento = tipoAlojamiento;
    }

    public void setNumeroHabitaciones(int numeroHabitaciones) {
        this.numeroHabitaciones = numeroHabitaciones;
    }

    public void setNumeroBanos(int numeroBanos) {
        this.numeroBanos = numeroBanos;
    }

    public void setServicioLimpieza(BooleanChoices servicioLimpieza) {
        this.servicioLimpieza = servicioLimpieza;
    }

    public void setServicioWifi(BooleanChoices servicioWifi) {
        this.servicioWifi = servicioWifi;
    }
    
    
}
