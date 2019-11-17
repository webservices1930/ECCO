/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import java.util.Base64;
import javax.persistence.Entity;

/**
 *
 * @author randy
 */
@Entity
public class PaseoEcologico  extends Servicio{
    
    private String origen;
    private String destino;
    private String horaInicio;
    private String horaFin;

    @Override
    public String toJsonString() {
        String f = ((this.getFoto() == null) ? "null" :Base64.getEncoder().encodeToString(this.getFoto()));
        String s = "{ Id : "+this.getId()+", nombre : "+this.getNombre()+" , pais : "+this.getPais()+", ciudad  :"+this.getCiudad()+", idioma :"+this.getIdioma()+","
           +"costo:"+this.getCosto()+",descripcion: "+this.getDescripcion()+", foto :"+f+", numeroPersonas :"+this.getNumeroPersonas()+", proveedor: "+this.getProveedor().toJsonString() 
           +",origen :"+this.origen+",destino:"+this.destino+",horaInicio :"+(this.horaInicio.replace(":", "*"))+",horaFin:"+(this.horaFin.replace(":", "*"))+",tipo: paseoEcologico}";
        return s;
    }
    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }
    
    
}
