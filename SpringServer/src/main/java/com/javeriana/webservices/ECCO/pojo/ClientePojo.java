/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Cliente;
import java.util.Base64;

/**
 *
 * @author randy
 */
public class ClientePojo {
    
    private Long Id;
    private String nombreUsuario;
    private String nombre ;
    private String edad ;
    private String foto ;
    private String descripcion ;
    private String telefono ;
    private String contrasena ;

    public static ClientePojo toPojo(Cliente o){
        ClientePojo x = new ClientePojo();
        x.setId(o.getId());
        x.setNombre(o.getNombre());
        x.setNombreUsuario(o.getNombreUsuario());
        x.setEdad(o.getEdad());
        x.setDescripcion(o.getDescripcion());
        x.setTelefono(o.getTelefono());
        if(o.getFoto()!= null){
            x.setFoto(Base64.getEncoder().encodeToString(o.getFoto()));
        }
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
    
    
}
