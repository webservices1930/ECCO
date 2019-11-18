/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import com.javeriana.webservices.ECCO.Model.Transporte;
import com.javeriana.webservices.ECCO.Model.Transporte.TipoTransporte;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class TransportePojo {
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
    
    private String empresa;
    private TipoTransporte tipoTransporte;
    private String origen;
    private String destino;
    private String horaSalida;
    private String horaLlegada;
    private String tipo;
    private double latitudOrigen;
    private double longitudOrigen;
    private double latitudDestino;
    private double longitudDestino;
    
    public static TransportePojo toPojo(Transporte p){
        TransportePojo x = new TransportePojo();
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
        x.setTipo("transporte");
        x.setEmpresa(p.getEmpresa());
        x.setTipoTransporte(p.getTipoTransporte());
        x.setOrigen(p.getOrigen());
        x.setDestino(p.getDestino());
        x.setHoraSalida(p.getHoraSalida());
        x.setHoraLlegada(p.getHoraLlegada());
        x.setLatitudOrigen(p.getLatitudOrigen());
        x.setLatitudDestino(p.getLatitudDestino());
        x.setLongitudDestino(p.getLongitudDestino());
        x.setLongitudOrigen(p.getLongitudOrigen());
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

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public TipoTransporte getTipoTransporte() {
        return tipoTransporte;
    }

    public void setTipoTransporte(TipoTransporte tipoTransporte) {
        this.tipoTransporte = tipoTransporte;
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

    public String getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public String getHoraLlegada() {
        return horaLlegada;
    }

    public void setHoraLlegada(String horaLlegada) {
        this.horaLlegada = horaLlegada;
    }
    
    
}
