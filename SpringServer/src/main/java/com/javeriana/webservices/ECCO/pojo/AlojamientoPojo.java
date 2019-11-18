/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Alojamiento;
import com.javeriana.webservices.ECCO.Model.Alojamiento.BooleanChoices;
import com.javeriana.webservices.ECCO.Model.Alojamiento.TipoAlojamiento;
import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class AlojamientoPojo {
    private Long Id;
    private String nombre;
    private String pais ;
    private String ciudad;
    private String idioma;
    private float costo;
    private String descripcion;
    private String foto;
    private int numeroPersonas;
    private String tipo;
    private ProveedorPojo proveedor;
    private String placeId;

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    
    
    private TipoAlojamiento tipoAlojamiento;
    
    private int numeroHabitaciones;
    private int numeroBanos;
    
    private BooleanChoices servicioLimpieza;
    private BooleanChoices servicioWifi;
    private double latitud;
    private double longitud;

    public static AlojamientoPojo toPojo(Alojamiento p){
        AlojamientoPojo x = new AlojamientoPojo();
        x.setId(p.getId());
        x.setNombre(p.getNombre());
        x.setPais(p.getPais());
        x.setCiudad(p.getCiudad());
        x.setIdioma(p.getIdioma());
        x.setCosto(p.getCosto());
        x.setDescripcion(p.getDescripcion());
        if(p.getFoto()!= null){
            x.setFoto(Base64.getEncoder().encodeToString(p.getFoto()));
        }
        x.setNumeroPersonas(p.getNumeroPersonas());
        x.setProveedor(ProveedorPojo.toPojo(p.getProveedor()));
        
        x.setTipoAlojamiento(p.getTipoAlojamiento());
        x.setNumeroHabitaciones(p.getNumeroHabitaciones());
        x.setNumeroBanos(p.getNumeroBanos());
        x.setServicioWifi(p.getServicioWifi());
        x.setServicioLimpieza(p.getServicioLimpieza());
        x.setTipo("alojamiento");
        x.setLatitud(p.getLatitud());
        x.setLongitud(p.getLongitud());
        x.setPlaceId(p.getPlaceId());
        return x;
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

    
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }

    public float getCosto() {
        return costo;
    }

    public void setCosto(float costo) {
        this.costo = costo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public int getNumeroPersonas() {
        return numeroPersonas;
    }

    public void setNumeroPersonas(int numeroPersonas) {
        this.numeroPersonas = numeroPersonas;
    }

    public ProveedorPojo getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorPojo proveedor) {
        this.proveedor = proveedor;
    }

    public TipoAlojamiento getTipoAlojamiento() {
        return tipoAlojamiento;
    }

    public void setTipoAlojamiento(TipoAlojamiento tipoAlojamiento) {
        this.tipoAlojamiento = tipoAlojamiento;
    }

    public int getNumeroHabitaciones() {
        return numeroHabitaciones;
    }

    public void setNumeroHabitaciones(int numeroHabitaciones) {
        this.numeroHabitaciones = numeroHabitaciones;
    }

    public int getNumeroBanos() {
        return numeroBanos;
    }

    public void setNumeroBanos(int numeroBanos) {
        this.numeroBanos = numeroBanos;
    }

    public BooleanChoices getServicioLimpieza() {
        return servicioLimpieza;
    }

    public void setServicioLimpieza(BooleanChoices servicioLimpieza) {
        this.servicioLimpieza = servicioLimpieza;
    }

    public BooleanChoices getServicioWifi() {
        return servicioWifi;
    }

    public void setServicioWifi(BooleanChoices servicioWifi) {
        this.servicioWifi = servicioWifi;
    }
    
    
}
