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
public class Cliente extends Usuario{
    
    
    
    public String toJsonString(){
        String f = ((this.getFoto() == null) ? "null" :Base64.getMimeEncoder().encodeToString(this.getFoto()));
        return "{id:"+this.getId()+",nombreUsuario:"+this.getNombreUsuario()+",nombre :"+this.getNombre()+",edad:"+this.getEdad()+",foto:"+f+",descripcion:"+
                this.getDescripcion() +",telefono :"+this.getTelefono()+"}";
    }
}
