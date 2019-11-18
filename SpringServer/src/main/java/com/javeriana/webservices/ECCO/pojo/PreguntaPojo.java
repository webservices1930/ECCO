/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Alimentacion;
import com.javeriana.webservices.ECCO.Model.Alojamiento;
import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import com.javeriana.webservices.ECCO.Model.Pregunta;
import com.javeriana.webservices.ECCO.Model.Transporte;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author randy
 */
public class PreguntaPojo {
    
    private Long id;
    private String pregunta;
    private String fechaPregunta;
    private String respuesta;
    private String fechaRespuesta;
    private Object servicio;
    private ClientePojo cliente;

    public static PreguntaPojo toPojo(Pregunta p){
        PreguntaPojo x = new PreguntaPojo();
        x.setCliente(ClientePojo.toPojo(p.getCliente()));
        if(p.getServicio() instanceof Alojamiento){
            Alojamiento a = (Alojamiento) p.getServicio();
            x.setServicio(AlojamientoPojo.toPojo(a));

        }else if(p.getServicio() instanceof Transporte ){
            Transporte t = (Transporte) p.getServicio();
            x.setServicio(TransportePojo.toPojo(t));

        }else if(p.getServicio() instanceof PaseoEcologico){
            PaseoEcologico a =(PaseoEcologico) p.getServicio();
            x.setServicio(PaseoEcologicoPojo.toPojo(a));

        }else if(p.getServicio() instanceof Alimentacion){
            Alimentacion a = (Alimentacion) p.getServicio();
            x.setServicio(AlimentacionPojo.toPojo(a));

        }
        x.setId(p.getId());
        x.setFechaPregunta(p.getFechaPregunta());
        x.setFechaRespuesta(p.getFechaRespuesta());
        x.setPregunta(p.getPregunta());
        x.setRespuesta(p.getRespuesta());
        return x;
        
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getFechaPregunta() {
        return fechaPregunta;
    }

    public void setFechaPregunta(String fechaPregunta) {
        this.fechaPregunta = fechaPregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public String getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(String fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public Object getServicio() {
        return servicio;
    }

    public void setServicio(Object servicio) {
        this.servicio = servicio;
    }

    public ClientePojo getCliente() {
        return cliente;
    }

    public void setCliente(ClientePojo cliente) {
        this.cliente = cliente;
    }
    
    
}
