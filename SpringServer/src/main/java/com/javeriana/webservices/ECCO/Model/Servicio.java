/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import java.util.Base64;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 *
 * @author randy
 */
@Entity
@Inheritance(
    strategy = InheritanceType.JOINED
)
@OnDelete(action = OnDeleteAction.CASCADE)
public  class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
    private String nombre;
    private String pais ;
    private String ciudad;
    private String idioma;
    private float costo;
    private String descripcion;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] foto;
    private int numeroPersonas;
    @ManyToOne
    @JoinColumn(name = "proveedor_id",nullable = false)
    private Proveedor proveedor;

    @OneToMany(targetEntity = Resena.class,cascade = CascadeType.ALL)
    private List<Resena> resenas;

    public List<Resena> getResenas() {
        return resenas;
    }

    public void setResenas(List<Resena> resenas) {
        this.resenas = resenas;
    }
    
    
    public Long getId() {
        return Id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPais() {
        return pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getIdioma() {
        return idioma;
    }

    public float getCosto() {
        return costo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public byte[] getFoto() {
        return foto;
    }

    public int getNumeroPersonas() {
        return numeroPersonas;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }

    public void setCosto(float costo) {
        this.costo = costo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public void setNumeroPersonas(int numeroPersonas) {
        this.numeroPersonas = numeroPersonas;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
    
    
    
}
