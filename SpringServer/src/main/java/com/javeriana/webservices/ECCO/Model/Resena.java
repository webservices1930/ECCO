/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author randy
 */
@Entity
public class Resena {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id",nullable = false)
    private Cliente cliente;
    
    @ManyToOne
    @JoinColumn(name = "servicio_id",nullable =false)
    private Servicio servicio;
    
    private String texto;

    public Long getId() {
        return Id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public String getTexto() {
        return texto;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
    
    
}
