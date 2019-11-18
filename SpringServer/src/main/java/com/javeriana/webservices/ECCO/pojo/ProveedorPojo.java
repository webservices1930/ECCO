/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Proveedor;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class ProveedorPojo {
    private Long Id;
    private String nombreUsuario;
    private String nombre ;
    private String edad ;
    private String foto ;
    private String descripcion ;
    private String telefono ;
    private String contrasena ;
    private String paginaWeb;
    private String contactoRS;

    public static ProveedorPojo toPojo(Proveedor p){
        ProveedorPojo x = new ProveedorPojo();
        x.setId(p.getId());
        x.setNombreUsuario(p.getNombre());
        x.setNombre(p.getNombre());
        x.setEdad(p.getEdad());
        if(p.getFoto()!=null){
           x.setFoto(Base64.getEncoder().encodeToString(p.getFoto())); 
        }
        
        x.setDescripcion(p.getDescripcion());
        x.setTelefono(p.getTelefono());
        x.setPaginaWeb(p.getPaginaWeb());
        x.setContactoRS(p.getContactoRS());
        return x;
    }
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEdad() {
        return edad;
    }

    public void setEdad(String edad) {
        this.edad = edad;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getPaginaWeb() {
        return paginaWeb;
    }

    public void setPaginaWeb(String paginaWeb) {
        this.paginaWeb = paginaWeb;
    }

    public String getContactoRS() {
        return contactoRS;
    }

    public void setContactoRS(String contactoRS) {
        this.contactoRS = contactoRS;
    }
    
    
}
