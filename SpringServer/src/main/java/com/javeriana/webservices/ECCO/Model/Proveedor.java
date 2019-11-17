/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Base64;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 *
 * @author randy
 */

@Entity
public class Proveedor extends Usuario implements Serializable {
    private String paginaWeb;
    private String contactoRS;
    
    @OneToMany(targetEntity = Servicio.class,cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Servicio> servicios;
    
    public String toJsonString(){
        String f = ((this.getFoto()== null) ? "null" :Base64.getEncoder().encodeToString(this.getFoto()));
        String s = "{Id :"+this.getId()+",nombreUsuario : "+this.getNombreUsuario()+", nombre:"+this.getNombre()+",edad:"+this.getEdad()+",foto:"+f+
                ",telefono:"+this.getTelefono()+",paginaWeb : "+this.paginaWeb+",contactoRS:"+this.contactoRS+"}";
        return s;
    }
    public String getPaginaWeb() {
        return paginaWeb;
    }

    public String getContactoRS() {
        return contactoRS;
    }

    public void setPaginaWeb(String paginaWeb) {
        this.paginaWeb = paginaWeb;
    }

    public void setContactoRS(String contactoRS) {
        this.contactoRS = contactoRS;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }
    
    
    
}
