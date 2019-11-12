/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.services;

import com.javeriana.webservices.ECCO.Model.Alimentacion;
import com.javeriana.webservices.ECCO.Model.Alojamiento;
import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.PaseoEcologico;
import com.javeriana.webservices.ECCO.Model.Proveedor;
import com.javeriana.webservices.ECCO.Model.Servicio;
import com.javeriana.webservices.ECCO.Model.Transporte;
import com.javeriana.webservices.ECCO.repositories.AlimentacionRepository;
import com.javeriana.webservices.ECCO.repositories.AlojamientoRepository;
import com.javeriana.webservices.ECCO.repositories.PaseoEcologicoRepository;
import com.javeriana.webservices.ECCO.repositories.ProveedorRepository;
import com.javeriana.webservices.ECCO.repositories.ServicioRepository;
import com.javeriana.webservices.ECCO.repositories.TransporteRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/servicio")
public class ServicioController {
    
    @Autowired
    private ServicioRepository servicioRepository; 
    
    @Autowired
    private AlojamientoRepository alojamientoRepository;
    
    @Autowired
    private AlimentacionRepository alimentacionRepository;
    
    @Autowired
    private PaseoEcologicoRepository paseoEcologicoRepository;
    
    @Autowired
    private TransporteRepository transporteRepository;
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    
    @GetMapping
    public ResponseEntity getServicios(){
        JSONArray res = new JSONArray();
        List<Servicio> x =this.servicioRepository.findAll();
        for (Servicio aux : x){
            res.put(new JSONObject(aux.toJsonString()));
        }
        return ResponseEntity.ok(res.toList());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity getServicio(@PathVariable(value = "id") Long servicioId){
        
        Optional<Servicio> x = this.servicioRepository.findById(servicioId);
        if(x.isPresent()){
            return ResponseEntity.ok(x.get().toJsonString());
        }
        return (ResponseEntity) ResponseEntity.notFound();
    }
    
    @GetMapping("/alojamiento")
    public List<Alojamiento> getAllAlojamiento() {
        return alojamientoRepository.findAll();
    }

    @GetMapping("/alojamiento/{id}")
    public ResponseEntity getAlojamientoById(@PathVariable(value = "id") Long alojamientoId){
        
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
        if(alojamiento.isPresent()){
            return ResponseEntity.ok().body(alojamiento.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/alojamiento/{idProveedor}")
    public ResponseEntity createAlojamiento(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody Alojamiento alojamiento) {
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                alojamiento.setProveedor(proveedor.get());
                Alojamiento x =alojamientoRepository.save(alojamiento);
                proveedor.get().getServicios().add(alojamiento);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(true);
            }
            return (ResponseEntity) ResponseEntity.notFound();
        } catch (Exception e) {
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
        
    }

    @PutMapping("/alojamiento/{idServicio}")
    public ResponseEntity updateAlojamiento(@PathVariable(value = "idServicio") Long alojamientoId, @Valid @RequestBody Alojamiento alojamientoDetails) {
            Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
        if(alojamiento.isPresent()){
            alojamiento.get().setNombre(alojamientoDetails.getNombre());
            alojamiento.get().setNumeroPersonas(alojamientoDetails.getNumeroPersonas());
            alojamiento.get().setCiudad(alojamientoDetails.getCiudad());
            alojamiento.get().setCosto(alojamientoDetails.getCosto());
            alojamiento.get().setFoto(alojamientoDetails.getFoto());
            alojamiento.get().setDescripcion(alojamientoDetails.getDescripcion());
            alojamiento.get().setIdioma(alojamientoDetails.getIdioma());
            alojamiento.get().setPais(alojamientoDetails.getPais());
            //---------------------------------------------------------------------------------------------
            alojamiento.get().setNumeroBanos(alojamientoDetails.getNumeroBanos());
            alojamiento.get().setNumeroHabitaciones(alojamientoDetails.getNumeroHabitaciones());
            alojamiento.get().setServicioLimpieza(alojamientoDetails.getServicioLimpieza());
            alojamiento.get().setServicioWifi(alojamientoDetails.getServicioWifi());
            alojamiento.get().setTipoAlojamiento(alojamientoDetails.getTipoAlojamiento());
            
            final Alojamiento x = alojamientoRepository.save(alojamiento.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.notFound();
        }
        
    }

    @DeleteMapping("/alojamiento/{id}")
    public ResponseEntity deleteAlojamiento(@PathVariable(value = "id") Long alojamientoId) {
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
       
        if(alojamiento.isPresent()){
            alojamientoRepository.delete(alojamiento.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
        @GetMapping("/transporte")
    public List<Transporte> getAllTransporte() {
        return transporteRepository.findAll();
    }

    @GetMapping("/transporte/{id}")
    public ResponseEntity getTransporteById(@PathVariable(value = "id") Long transporteId){
        
        Optional<Transporte> transporte = transporteRepository.findById(transporteId);
        if(transporte.isPresent()){
            return ResponseEntity.ok().body(transporte.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/transporte/{idProveedor}")
    public ResponseEntity createTransporte(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody Transporte transporte) {
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                transporte.setProveedor(proveedor.get());
                proveedor.get().getServicios().add(transporte);
                Transporte x =transporteRepository.save(transporte);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(true);
            }
            return (ResponseEntity) ResponseEntity.notFound();
        } catch (Exception e) {
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
        
    }

    @PutMapping("/transporte/{idServicio}")
    public ResponseEntity updateTransporte(@PathVariable(value = "idServicio") Long transporteId, @Valid @RequestBody Transporte transporteDetails) {
            Optional<Transporte> transporte = transporteRepository.findById(transporteId);
        if(transporte.isPresent()){
            transporte.get().setNombre(transporteDetails.getNombre());
            transporte.get().setNumeroPersonas(transporteDetails.getNumeroPersonas());
            transporte.get().setCiudad(transporteDetails.getCiudad());
            transporte.get().setCosto(transporteDetails.getCosto());
            transporte.get().setFoto(transporteDetails.getFoto());
            transporte.get().setDescripcion(transporteDetails.getDescripcion());
            transporte.get().setIdioma(transporteDetails.getIdioma());
            transporte.get().setPais(transporteDetails.getPais());
            //---------------------------------------------------------------------------------------------
            transporte.get().setDestino(transporteDetails.getDestino());
            transporte.get().setEmpresa(transporteDetails.getEmpresa());
            transporte.get().setHoraLlegada(transporteDetails.getHoraLlegada());
            transporte.get().setHoraSalida(transporteDetails.getHoraSalida());
            transporte.get().setOrigen(transporteDetails.getOrigen());
            transporte.get().setTipoTransporte(transporteDetails.getTipoTransporte());
            
            final Transporte x = transporteRepository.save(transporte.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.notFound();
        }
        
    }

    @DeleteMapping("/transporte/{id}")
    public ResponseEntity deleteTransporte(@PathVariable(value = "id") Long transporteId) {
        Optional<Transporte> transporte = transporteRepository.findById(transporteId);
       
        if(transporte.isPresent()){
            transporteRepository.delete(transporte.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
    @GetMapping("/paseoEcologico")
    public List<PaseoEcologico> getAllPaseoEcologico() {
        return paseoEcologicoRepository.findAll();
    }

    @GetMapping("/paseoEcologico/{id}")
    public ResponseEntity getPaseoEcologicoById(@PathVariable(value = "id") Long paseoEcologicoId){
        
        Optional<PaseoEcologico> paseoEcologico = paseoEcologicoRepository.findById(paseoEcologicoId);
        if(paseoEcologico.isPresent()){
            return ResponseEntity.ok().body(paseoEcologico.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/paseoEcologico/{idProveedor}")
    public ResponseEntity createPaseoEcologico(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody PaseoEcologico paseoEcologico) {
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                paseoEcologico.setProveedor(proveedor.get());
                PaseoEcologico x =paseoEcologicoRepository.save(paseoEcologico);
                proveedor.get().getServicios().add(paseoEcologico);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(true);
            }
            return (ResponseEntity) ResponseEntity.notFound();
        } catch (Exception e) {
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
        
    }

    @PutMapping("/paseoEcologico/{idServicio}")
    public ResponseEntity updatePaseoEcologico(@PathVariable(value = "idServicio") Long paseoEcologicoId, @Valid @RequestBody PaseoEcologico paseoEcologicoDetails) {
            Optional<PaseoEcologico> paseoEcologico = paseoEcologicoRepository.findById(paseoEcologicoId);
        if(paseoEcologico.isPresent()){
            paseoEcologico.get().setNombre(paseoEcologicoDetails.getNombre());
            paseoEcologico.get().setNumeroPersonas(paseoEcologicoDetails.getNumeroPersonas());
            paseoEcologico.get().setCiudad(paseoEcologicoDetails.getCiudad());
            paseoEcologico.get().setCosto(paseoEcologicoDetails.getCosto());
            paseoEcologico.get().setFoto(paseoEcologicoDetails.getFoto());
            paseoEcologico.get().setDescripcion(paseoEcologicoDetails.getDescripcion());
            paseoEcologico.get().setIdioma(paseoEcologicoDetails.getIdioma());
            paseoEcologico.get().setPais(paseoEcologicoDetails.getPais());
            //---------------------------------------------------------------------------------------------
            paseoEcologico.get().setDestino(paseoEcologicoDetails.getDestino());
            paseoEcologico.get().setHoraFin(paseoEcologicoDetails.getHoraFin());
            paseoEcologico.get().setHoraInicio(paseoEcologicoDetails.getHoraInicio());
            paseoEcologico.get().setOrigen(paseoEcologicoDetails.getOrigen());
            
            
            final PaseoEcologico x = paseoEcologicoRepository.save(paseoEcologico.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.notFound();
        }
        
    }

    @DeleteMapping("/paseoEcologico/{id}")
    public ResponseEntity deletePaseoEcologico(@PathVariable(value = "id") Long paseoEcologicoId) {
        Optional<PaseoEcologico> paseoEcologico = paseoEcologicoRepository.findById(paseoEcologicoId);
       
        if(paseoEcologico.isPresent()){
            paseoEcologicoRepository.delete(paseoEcologico.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
    @GetMapping("/alimentacion")
    public List<Alimentacion> getAllAlimentacion() {
        return alimentacionRepository.findAll();
    }

    @GetMapping("/alimentacion/{id}")
    public ResponseEntity getAlimentacionById(@PathVariable(value = "id") Long alimentacionId){
        
        Optional<Alimentacion> alimentacion = alimentacionRepository.findById(alimentacionId);
        if(alimentacion.isPresent()){
            return ResponseEntity.ok().body(alimentacion.get());
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/alimentacion/{idProveedor}")
    public ResponseEntity createAlimentacion(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody Alimentacion alimentacion) {
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                alimentacion.setProveedor(proveedor.get());
                Alimentacion x =alimentacionRepository.save(alimentacion);
                proveedor.get().getServicios().add(alimentacion);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(true);
            }
            return (ResponseEntity) ResponseEntity.notFound();
        } catch (Exception e) {
            return (ResponseEntity) ResponseEntity.badRequest();
        }
        
        
    }

    @PutMapping("/alimentacion/{idServicio}")
    public ResponseEntity updateAlimentacion(@PathVariable(value = "idServicio") Long alimentacionId, @Valid @RequestBody Alimentacion alimentacionDetails) {
            Optional<Alimentacion> alimentacion = alimentacionRepository.findById(alimentacionId);
        if(alimentacion.isPresent()){
            alimentacion.get().setNombre(alimentacionDetails.getNombre());
            alimentacion.get().setNumeroPersonas(alimentacionDetails.getNumeroPersonas());
            alimentacion.get().setCiudad(alimentacionDetails.getCiudad());
            alimentacion.get().setCosto(alimentacionDetails.getCosto());
            alimentacion.get().setFoto(alimentacionDetails.getFoto());
            alimentacion.get().setDescripcion(alimentacionDetails.getDescripcion());
            alimentacion.get().setIdioma(alimentacionDetails.getIdioma());
            alimentacion.get().setPais(alimentacionDetails.getPais());
            //---------------------------------------------------------------------------------------------
            alimentacion.get().setCantidadPlatos(alimentacionDetails.getCantidadPlatos());
            alimentacion.get().setTipoComida(alimentacionDetails.getTipoComida());
            
            
            final Alimentacion x = alimentacionRepository.save(alimentacion.get());
            return ResponseEntity.ok(true);
        }else{
            return (ResponseEntity) ResponseEntity.notFound();
        }
        
    }

    @DeleteMapping("/alimentacion/{id}")
    public ResponseEntity deletealimentacion(@PathVariable(value = "id") Long alimentacionId) {
        Optional<Alimentacion> alimentacion = alimentacionRepository.findById(alimentacionId);
       
        if(alimentacion.isPresent()){
            alimentacionRepository.delete(alimentacion.get());
            return ResponseEntity.ok(true);
        }
        
        return (ResponseEntity) ResponseEntity.badRequest();
    }
    
    
}
