/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Alimentacion;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class AlimentacionPojo {
    
    private Long Id;
    private String nombre;
    private String pais ;
    private String ciudad;
    private String idioma;
    private float costo;
    private String descripcion;
    private String foto;
    private String tipo;
    private int numeroPersonas;
    private ProveedorPojo proveedor;
    private String tipoComida;
    private int  cantidadPlatos;
    private double latitud;
    private double longitud;

    private String placeId;

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
    public static AlimentacionPojo toPojo(Alimentacion p){
        AlimentacionPojo x = new AlimentacionPojo();
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
        x.setTipo("alimentacion");
        x.setTipoComida(p.getTipoComida());
        x.setCantidadPlatos(p.getCantidadPlatos());
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

    public String getTipoComida() {
        return tipoComida;
    }

    public void setTipoComida(String tipoComida) {
        this.tipoComida = tipoComida;
    }

    public int getCantidadPlatos() {
        return cantidadPlatos;
    }

    public void setCantidadPlatos(int cantidadPlatos) {
        this.cantidadPlatos = cantidadPlatos;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    
}
