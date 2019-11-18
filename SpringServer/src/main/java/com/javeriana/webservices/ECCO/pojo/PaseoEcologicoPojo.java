/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class PaseoEcologicoPojo {
    private Long Id;
    private String nombre;
    private String pais ;
    private String ciudad;
    private String idioma;
    private float costo;
    private String descripcion;
    private String foto;
    private int numeroPersonas;
    private ProveedorPojo proveedor;
    private String origen;
    private String destino;
    private String horaInicio;
    private String horaFin;
    private String tipo;
    private double latitudOrigen;
    private double longitudOrigen;
    private double latitudDestino;
    private double longitudDestino;

    public static PaseoEcologicoPojo toPojo(PaseoEcologico p){
        PaseoEcologicoPojo x = new PaseoEcologicoPojo();
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
        
        x.setOrigen(p.getOrigen());
        x.setDestino(p.getDestino());
        x.setHoraFin(p.getHoraFin());
        x.setHoraInicio(p.getHoraInicio());
        x.setTipo("paseoEcologico");
        x.setLatitudOrigen(p.getLatitudOrigen());
        x.setLatitudDestino(p.getLatitudDestino());
        x.setLongitudOrigen(p.getLongitudOrigen());
        x.setLongitudDestino(p.getLongitudDestino());
        return x;
    }

    public double getLatitudOrigen() {
        return latitudOrigen;
    }

    public void setLatitudOrigen(double latitudOrigen) {
        this.latitudOrigen = latitudOrigen;
    }

    public double getLongitudOrigen() {
        return longitudOrigen;
    }

    public void setLongitudOrigen(double longitudOrigen) {
        this.longitudOrigen = longitudOrigen;
    }

    public double getLatitudDestino() {
        return latitudDestino;
    }

    public void setLatitudDestino(double latitudDestino) {
        this.latitudDestino = latitudDestino;
    }

    public double getLongitudDestino() {
        return longitudDestino;
    }

    public void setLongitudDestino(double longitudDestino) {
        this.longitudDestino = longitudDestino;
    }
    
    
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }
    
    
}
