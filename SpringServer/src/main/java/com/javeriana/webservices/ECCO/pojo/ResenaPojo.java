/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Alimentacion;
import com.javeriana.webservices.ECCO.Model.Alojamiento;
import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import com.javeriana.webservices.ECCO.Model.Resena;
import com.javeriana.webservices.ECCO.Model.Transporte;
import java.util.List;

/**
 *
 * @author randy
 */
public class ResenaPojo {
    
    private Long Id;
    private ClientePojo cliente;
    private Object servicio;
    private String comentario;
    private float calificacion;
    private String fecha;
    private List<ResenaPojo> resenas;

    public static ResenaPojo toPojo(Resena r){
        ResenaPojo x = new ResenaPojo();
        x.setId(r.getId());
        x.setCalificacion(r.getCalificacion());
        x.setComentario(r.getComentario());
        x.setFecha(r.getFecha());
        if(r.getServicio() instanceof Alojamiento){
            Alojamiento a = (Alojamiento) r.getServicio();
            x.setServicio(AlojamientoPojo.toPojo(a));

        }else if(r.getServicio() instanceof Transporte ){
            Transporte t = (Transporte) r.getServicio();
            x.setServicio(TransportePojo.toPojo(t));

        }else if(r.getServicio() instanceof PaseoEcologico){
            PaseoEcologico a =(PaseoEcologico) r.getServicio();
            x.setServicio(PaseoEcologicoPojo.toPojo(a));

        }else if(r.getServicio() instanceof Alimentacion){
            Alimentacion a = (Alimentacion) r.getServicio();
            x.setServicio(AlimentacionPojo.toPojo(a));

        }
        x.setCliente(ClientePojo.toPojo(r.getCliente()));
        
        return x;
    }

    public List<ResenaPojo> getResenas() {
        return resenas;
    }

    public void setResenas(List<ResenaPojo> resenas) {
        this.resenas = resenas;
    }
    
    
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public ClientePojo getCliente() {
        return cliente;
    }

    public void setCliente(ClientePojo cliente) {
        this.cliente = cliente;
    }

    public Object getServicio() {
        return servicio;
    }

    public void setServicio(Object servicio) {
        this.servicio = servicio;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public float getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.calificacion = calificacion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    
}
