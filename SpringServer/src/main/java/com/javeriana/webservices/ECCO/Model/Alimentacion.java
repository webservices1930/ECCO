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
public class Alimentacion extends Servicio{
    private String tipoComida;
    private int  cantidadPlatos;

    @Override
    public String toJsonString() {
        String f = ((this.getFoto() == null) ? "null" :Base64.getMimeEncoder().encodeToString(this.getFoto()));
        String s = "{ Id : "+this.getId()+", nombre : "+this.getNombre()+" , pais : "+this.getPais()+", ciudad  :"+this.getCiudad()+", idioma :"+this.getIdioma()+","
           +"costo:"+this.getCosto()+",descripcion: "+this.getDescripcion()+", foto :"+f+", numeroPersonas :"+this.getNumeroPersonas()+", proveedor: "+this.getProveedor().toJsonString() 
           +",tipoComida:"+this.tipoComida+",cantidadPlatos :"+this.cantidadPlatos+",tipo: alimentacion}";
        return s;
    }
    public String getTipoComida() {
        return tipoComida;
    }

    public int getCantidadPlatos() {
        return cantidadPlatos;
    }

    public void setTipoComida(String tipoComida) {
        this.tipoComida = tipoComida;
    }

    public void setCantidadPlatos(int cantidadPlatos) {
        this.cantidadPlatos = cantidadPlatos;
    }
    
    
}
