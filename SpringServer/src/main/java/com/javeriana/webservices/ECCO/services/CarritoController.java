/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.CarritoCompras;
import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.Servicio;
import com.javeriana.webservices.ECCO.pojo.CarritoPojo;
import com.javeriana.webservices.ECCO.repositories.CarritoRepository;
import com.javeriana.webservices.ECCO.repositories.ClienteRepository;
import com.javeriana.webservices.ECCO.repositories.ServicioRepository;
import java.util.ArrayList;
import java.util.Optional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author randy
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuario/carrito")
public class CarritoController {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ServicioRepository servicioRepository;
    
    @Autowired
    private CarritoRepository carritoRepository;
    
    @PutMapping("/{idCliente}/{idServicio}")
    public ResponseEntity actualizarCarrito(@PathVariable(value = "idCliente") Long clienteId , @PathVariable(value = "idServicio") Long servicioId){
        Optional<Cliente> cliente =clienteRepository.findById(clienteId);
        Optional<Servicio> servicio = servicioRepository.findById(servicioId);
        JSONObject response = new JSONObject();
     
        if(cliente.isPresent() && servicio.isPresent()){
            CarritoCompras c = carritoRepository.searchByClientId(clienteId);
            response.put("message", "servicio agregado con exito");
            if(c == null){

                c = new CarritoCompras();
                c.setCliente(cliente.get());
                c.setCostoTotal(1);
                c.setNumServicios(1);
                c.setServicios(new ArrayList<>());
                c.getServicios().add(servicio.get());
            }else{
                c.getServicios().add(servicio.get());
                carritoRepository.save(c);
                c.setNumServicios(c.getServicios().size());
                float tot = 0;
                for(Servicio s:c.getServicios()){
                    tot+=s.getCosto();
                }
                c.setCostoTotal(tot);
            } 
            carritoRepository.save(c);
            return ResponseEntity.ok(response.toMap());
        }else{
            response.put("message", "usuario o servicio no existe");
            return ResponseEntity.ok(response.toMap());
        }
        
    }
    
    @DeleteMapping("/{idCliente}/{idServicio}")
    public ResponseEntity eliminarServicio(@PathVariable(value = "idCliente") Long clienteId , @PathVariable(value = "idServicio") Long servicioId){
        Optional<Cliente> cliente =clienteRepository.findById(clienteId);
        Optional<Servicio> servicio = servicioRepository.findById(servicioId);
        JSONObject response = new JSONObject();
     
        if(cliente.isPresent() && servicio.isPresent()){
            CarritoCompras c = carritoRepository.searchByClientId(clienteId);
            if(c == null){
                response.put("message", "carrito no existe");
               
            }else{
                c.getServicios().remove(servicio.get());
                carritoRepository.save(c);
                c.setNumServicios(c.getServicios().size());
                float tot = 0;
                for(Servicio s:c.getServicios()){
                    tot+=s.getCosto();
                }
                c.setCostoTotal(tot);
                response.put("message", "servicio eliminado con exito");
                carritoRepository.save(c);
            } 
            
            return ResponseEntity.ok(response.toMap());
        }else{
            response.put("message", "usuario o servicio no existe");
            return ResponseEntity.ok(response.toMap());
        }
    }
    
    @GetMapping("/{idCliente}")
    public ResponseEntity getCarrito(@PathVariable(value = "idCliente") Long clienteId){
        CarritoCompras c = carritoRepository.searchByClientId(clienteId);
        JSONObject response = new JSONObject();
        if(c!=null){
            
            return ResponseEntity.ok(CarritoPojo.toPojo(c));
        }else{
            response.put("message", "el cliente no tiene carrito");
            return ResponseEntity.ok(response.toMap());
        }
    }
    
    @DeleteMapping("/{idCliente}")
    public ResponseEntity pagarCarrito(@PathVariable(value = "idCliente") Long clienteId){
        CarritoCompras c = carritoRepository.searchByClientId(clienteId);
        JSONObject response = new JSONObject();
        if(c!=null){
            response.put("message", "carrito pagado con exito");
            c.setCliente(null);
            c.setServicios(null);
            carritoRepository.delete(c);
            return ResponseEntity.ok(response.toMap());
        }else{
            response.put("message", "el cliente no tiene carrito");
            return ResponseEntity.ok(response.toMap());
        }
    }
}
