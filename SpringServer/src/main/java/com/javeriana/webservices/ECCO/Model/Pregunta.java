/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 *
 * @author randy
 */
@Entity
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String pregunta;
    private String fechaPregunta;
    private String respuesta;
    private String fechaRespuesta;
    @JoinColumn(name = "servicio_id")
    @OneToOne()
    private Servicio servicio;
    @JoinColumn(name = "cliente_id")
    @OneToOne()
    private Cliente cliente;

    
    public Long getId() {
        return id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public String getFechaPregunta() {
        return fechaPregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public String getFechaRespuesta() {
        return fechaRespuesta;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public void setFechaPregunta(String fechaPregunta) {
        this.fechaPregunta = fechaPregunta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public void setFechaRespuesta(String fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    
    
}
