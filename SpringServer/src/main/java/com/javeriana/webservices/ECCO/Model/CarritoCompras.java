/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.Model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 *
 * @author randy
 */
@Entity
public class CarritoCompras {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
    private int numServicios;
    private float costoTotal;
    
    @JoinColumn(name = "cliente_id")
    @OneToOne(cascade = CascadeType.ALL)
    private Cliente cliente;
    @ManyToMany(cascade=CascadeType.ALL)  
    @JoinTable(name="carrito_servicio", joinColumns=@JoinColumn(name="carrito_id"), inverseJoinColumns=@JoinColumn(name="servicio_id"))  
    private List<Servicio> servicios;
    
}
