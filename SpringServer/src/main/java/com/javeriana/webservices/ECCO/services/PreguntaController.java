/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.Pregunta;
import com.javeriana.webservices.ECCO.Model.Servicio;
import com.javeriana.webservices.ECCO.pojo.PreguntaPojo;
import com.javeriana.webservices.ECCO.repositories.ClienteRepository;
import com.javeriana.webservices.ECCO.repositories.PreguntaRepository;
import com.javeriana.webservices.ECCO.repositories.ServicioRepository;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author randy
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/servicio/pregunta")
public class PreguntaController {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ServicioRepository servicioRepository;
    
    @Autowired
    private PreguntaRepository preguntaRepository;
    
    @PostMapping("/{idCliente}/{idServicio}")
    public ResponseEntity crearPregunta(@PathVariable(value = "idCliente") Long clienteId , @PathVariable(value = "idServicio") Long servicioId,
    @Valid @RequestBody Pregunta pregunta){
        Optional<Cliente> cliente =clienteRepository.findById(clienteId);
        Optional<Servicio> servicio = servicioRepository.findById(servicioId);
        JSONObject response = new JSONObject();
        if(cliente.isPresent() && servicio.isPresent()){
            pregunta.setCliente(cliente.get());
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            pregunta.setFechaPregunta(formatter.format(new Date(System.currentTimeMillis())));
            pregunta.setServicio(servicio.get());
            pregunta.setRespuesta(" ");
            preguntaRepository.save(pregunta);
            response.put("message", "pregunta creada con exito");
            return ResponseEntity.ok(response.toMap());
        }else{
            response.put("message", "usuario o servicio no existen en sistema");
            return ResponseEntity.ok(response.toMap());
        }
    }
    
    @PutMapping("/{idPregunta}")
    public ResponseEntity agregarRespuesta(@PathVariable(value = "idPregunta") Long preguntaId,
    @Valid @RequestBody Pregunta preguntaDetails){
        Optional<Pregunta> pregunta = preguntaRepository.findById(preguntaId);
        JSONObject response = new JSONObject();
        if(pregunta.isPresent() ){
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            pregunta.get().setFechaRespuesta(formatter.format(new Date(System.currentTimeMillis())));
            pregunta.get().setRespuesta(preguntaDetails.getRespuesta());
            preguntaRepository.save(pregunta.get());
            response.put("message", "pregunta actualizada con exito");
            return ResponseEntity.ok(response.toMap());
        }else{
            response.put("message", "usuario o servicio no existen en sistema");
            return ResponseEntity.ok(response.toMap());
        }
    }
    
    @GetMapping("/{idServicio}")
    public ResponseEntity getPreguntas(@PathVariable(value = "idServicio") Long servicioId){
        List<Pregunta> preguntas = preguntaRepository.searchByServicioId(servicioId);
        List<PreguntaPojo> res = new ArrayList<>();
        for (Pregunta aux : preguntas){
            res.add(PreguntaPojo.toPojo(aux));
        }
        return ResponseEntity.ok(res);
    }
}
