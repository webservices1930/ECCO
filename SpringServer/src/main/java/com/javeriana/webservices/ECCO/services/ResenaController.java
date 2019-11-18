/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.Resena;
import com.javeriana.webservices.ECCO.Model.Servicio;
import com.javeriana.webservices.ECCO.pojo.ResenaPojo;
import com.javeriana.webservices.ECCO.repositories.ClienteRepository;
import com.javeriana.webservices.ECCO.repositories.ResenaRepository;
import com.javeriana.webservices.ECCO.repositories.ServicioRepository;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author randy
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/servicio")
public class ResenaController {
    
    @Autowired
    private ServicioRepository servicioRepository; 
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired ResenaRepository resenaRepository;
     
    @PostMapping("/{idServicio}/resena/cliente/{idCliente}")
    public ResponseEntity crearResena(@PathVariable(value = "idServicio") Long idServicio,@PathVariable(value = "idCliente") Long idCliente
            ,@Valid @RequestBody ResenaPojo resena){
        JSONObject res= new JSONObject();
        Optional<Servicio> servicio = servicioRepository.findById(idServicio);
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);
        if(servicio.isPresent() && cliente.isPresent()){
            res.put("message", "resena creada con exito");
            Resena x = new Resena();
            x.setCliente(cliente.get());
            x.setServicio(servicio.get());
            x.setComentario(resena.getComentario());
            x.setCalificacion(resena.getCalificacion());
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            x.setFecha(formatter.format(new Date(System.currentTimeMillis())));
            resenaRepository.save(x);
            servicio.get().getResenas().add(x);
            servicioRepository.save(servicio.get());
            return ResponseEntity.ok(res.toMap());
        }
        res.put("message", "cliente o servicio o existen");
        return ResponseEntity.ok(res.toMap());
    }
    
    @GetMapping("/{idServicio}/resena")
    public ResponseEntity getResenasServicio(@PathVariable(value = "idServicio") Long idServicio){
        Optional<Servicio> servicio = servicioRepository.findById(idServicio);
        List<ResenaPojo> res = new ArrayList<>();
        if(servicio.isPresent()){
            for(Resena aux : servicio.get().getResenas()){
                res.add(ResenaPojo.toPojo(aux));
            }
        }
        return ResponseEntity.ok(res);
         
    }
    
    @GetMapping("/{idServicio}/resena/cliente/{idCliente}")
    public ResponseEntity getResenaUsuario(@PathVariable(value = "idServicio") Long idServicio,@PathVariable(value = "idCliente") Long idCliente){
        Optional<Servicio> servicio = servicioRepository.findById(idServicio);
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);
        if(servicio.isPresent() && cliente.isPresent()){
            Resena r = resenaRepository.searchByClient(idCliente, idServicio);
            return ResponseEntity.ok(r);
        }
        return ResponseEntity.ok(null);
    }
}
