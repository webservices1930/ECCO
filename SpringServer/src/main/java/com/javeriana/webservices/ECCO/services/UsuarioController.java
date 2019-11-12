/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.Proveedor;
import com.javeriana.webservices.ECCO.repositories.ClienteRepository;
import com.javeriana.webservices.ECCO.repositories.ProveedorRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author randy
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping("/cliente")
    public List<Cliente> getAllCliente() {
        return clienteRepository.findAll();
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity getClienteById(@PathVariable(value = "id") Long clienteId){
        
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
        if(cliente.isPresent()){
            return ResponseEntity.ok().body(cliente.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/cliente")
    public ResponseEntity createCliente(@Valid @RequestBody Cliente cliente) {
        try {
            Cliente x =clienteRepository.save(cliente);
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            return ResponseEntity.ok().body(false);
        }
        
        
    }

    @PutMapping("/cliente/{id}")
    public ResponseEntity updateCliente(@PathVariable(value = "id") Long clienteId, @Valid @RequestBody Cliente clienteDetails) {
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
        if(cliente.isPresent()){
            cliente.get().setNombre(clienteDetails.getNombre());
            cliente.get().setDescripcion(clienteDetails.getDescripcion());
            cliente.get().setEdad(clienteDetails.getEdad());
            cliente.get().setNombreUsuario(clienteDetails.getNombreUsuario());
            cliente.get().setTelefono(clienteDetails.getTelefono());
            cliente.get().setFoto(clienteDetails.getFoto());
            final Cliente updatedCliente = clienteRepository.save(cliente.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity deleteCliente(@PathVariable(value = "id") Long clienteId) {
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
       
        if(cliente.isPresent()){
            clienteRepository.delete(cliente.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
    @GetMapping("/proveedor")
    public ResponseEntity getAllProveedor() {
        List<Proveedor> x = proveedorRepository.findAll();
        System.out.println(x.size());
        JSONArray res = new JSONArray();
        for(Proveedor p : x){
            res.put(new JSONObject(p.getJsonString()));
        }
        return ResponseEntity.ok().body(res.toList());
        
    }

    @GetMapping("/proveedor/{id}")
    public ResponseEntity getProveedorById(@PathVariable(value = "id") Long proveedorId){
        
        Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
        if(proveedor.isPresent()){
            return ResponseEntity.ok().body(proveedor.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/proveedor")
    public ResponseEntity createProveedor(@Valid @RequestBody Proveedor proveedor) {
        try {
            Proveedor x =proveedorRepository.save(proveedor);
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            return ResponseEntity.ok().body(false);
        }
        
        
    }

    @PutMapping("/proveedor/{id}")
    public ResponseEntity updateProveedor(@PathVariable(value = "id") Long proveedorId, @Valid @RequestBody Proveedor proveedorDetails) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
        if(proveedor.isPresent()){
            proveedor.get().setNombre(proveedorDetails.getNombre());
            proveedor.get().setDescripcion(proveedorDetails.getDescripcion());
            proveedor.get().setEdad(proveedorDetails.getEdad());
            proveedor.get().setNombreUsuario(proveedorDetails.getNombreUsuario());
            proveedor.get().setTelefono(proveedorDetails.getTelefono());
            proveedor.get().setPaginaWeb(proveedorDetails.getPaginaWeb());
            proveedor.get().setContactoRS(proveedorDetails.getContactoRS());
            proveedor.get().setFoto(proveedorDetails.getFoto());
            final Proveedor updatedproveedor = proveedorRepository.save(proveedor.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
    }

    @DeleteMapping("/proveedor/{id}")
    public ResponseEntity deleteProveedor(@PathVariable(value = "id") Long proveedorId) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
       
        if(proveedor.isPresent()){
            proveedorRepository.delete(proveedor.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error message")
    public void handleError() {
    }
    
}
