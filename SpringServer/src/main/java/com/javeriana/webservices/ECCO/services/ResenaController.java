/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.Resena;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author randy
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/servicio/resena")
public class ResenaController {
    
    
    @PostMapping("/{idServicio}/cliente/{idCliente}")
    public ResponseEntity crearResena(@PathVariable(value = "idServicio") Long idServicio,@PathVariable(value = "idCliente") Long idCliente
            ,@Valid @RequestBody Resena resena){
        return null;
    }
}
