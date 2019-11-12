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

/**
 *
 * @author randy
 */
@Entity
public class Transporte extends Servicio{
    
    private String empresa;
    public static enum TipoTransporte{
        TERRESTRE,AEREO,MARITIMO
    }
    @Enumerated(EnumType.STRING)
    private TipoTransporte tipoTransporte;
    private String origen;
    private String destino;
    private String horaSalida;
    private String horaLlegada;

    @Override
    public String toJsonString() {
        String f = ((this.getFoto()== null) ? "null" :Base64.getMimeEncoder().encodeToString(this.getFoto()));
        String s = "{ Id : "+this.getId()+", nombre : "+this.getNombre()+" , pais : "+this.getPais()+", ciudad  :"+this.getCiudad()+", idioma :"+this.getIdioma()+","
           +"costo:"+this.getCosto()+",descripcion: "+this.getDescripcion()+", foto :"+f+", numeroPersonas :"+this.getNumeroPersonas()+", proveedor: "+this.getProveedor().toJsonString() 
           +",empresa :"+this.empresa+",tipoTransporte:"+this.tipoTransporte+",origen:"+this.origen+",destino :"+this.destino+",horaSalida :"+this.horaSalida
           +",horaLlegada :"+this.horaLlegada +"}";
        return s;
    }
    
    public String getEmpresa() {
        return empresa;
    }

    public TipoTransporte getTipoTransporte() {
        return tipoTransporte;
    }

    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public String getHoraSalida() {
        return horaSalida;
    }

    public String getHoraLlegada() {
        return horaLlegada;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public void setTipoTransporte(TipoTransporte tipoTransporte) {
        this.tipoTransporte = tipoTransporte;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public void setHoraLlegada(String horaLlegada) {
        this.horaLlegada = horaLlegada;
    }
    
    
}
