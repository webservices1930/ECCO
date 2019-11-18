/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.pojo;

import com.javeriana.webservices.ECCO.Model.Alimentacion;
import com.javeriana.webservices.ECCO.Model.Alojamiento;
import com.javeriana.webservices.ECCO.Model.CarritoCompras;
import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import com.javeriana.webservices.ECCO.Model.Servicio;
import com.javeriana.webservices.ECCO.Model.Transporte;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author randy
 */
public class CarritoPojo {
    
    private Long Id;
    
    private int numServicios;
    private float costoTotal;
    
    private ClientePojo cliente; 
    private List<Object> servicios;

    public static CarritoPojo toPojo(CarritoCompras c){
        CarritoPojo cp = new CarritoPojo();
        cp.setCliente(ClientePojo.toPojo(c.getCliente()));
        cp.setId(c.getId());
        cp.setNumServicios(c.getNumServicios());
        cp.setCostoTotal(c.getCostoTotal());
        List<Object> res = new ArrayList<>();
        for(Servicio aux : c.getServicios()){
            if(aux instanceof Alojamiento){
                    Alojamiento a = (Alojamiento) aux;
                    res.add(AlojamientoPojo.toPojo(a));
                }else if(aux instanceof Transporte ){
                    Transporte t = (Transporte) aux;
                    res.add(TransportePojo.toPojo(t));
                }else if(aux instanceof PaseoEcologico){
                    PaseoEcologico p =(PaseoEcologico) aux;
                    res.add(PaseoEcologicoPojo.toPojo(p));
                }else if(aux instanceof Alimentacion){
                    Alimentacion a = (Alimentacion) aux;
                    res.add(AlimentacionPojo.toPojo(a));
                }
            
        }
        cp.setServicios(res);
        return cp;
    }
    
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public int getNumServicios() {
        return numServicios;
    }

    public void setNumServicios(int numServicios) {
        this.numServicios = numServicios;
    }

    public float getCostoTotal() {
        return costoTotal;
    }

    public void setCostoTotal(float costoTotal) {
        this.costoTotal = costoTotal;
    }

    public ClientePojo getCliente() {
        return cliente;
    }

    public void setCliente(ClientePojo cliente) {
        this.cliente = cliente;
    }

    public List<Object> getServicios() {
        return servicios;
    }

    public void setServicios(List<Object> servicios) {
        this.servicios = servicios;
    }
    
    
}
