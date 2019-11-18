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

    private double latitud;
    private double longitud;
    private String placeId;

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    
    

    public double getLatitud() {
        return latitud;
    }

    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

    public double getLongitud() {
        return longitud;
    }

    public void setLongitud(double longitud) {
        this.longitud = longitud;
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
