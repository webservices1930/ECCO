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
import com.javeriana.webservices.ECCO.pojo.AlimentacionPojo;
import com.javeriana.webservices.ECCO.pojo.AlojamientoPojo;
import com.javeriana.webservices.ECCO.pojo.PaseoEcologicoPojo;
import com.javeriana.webservices.ECCO.pojo.ProveedorPojo;
import com.javeriana.webservices.ECCO.pojo.TransportePojo;
import com.javeriana.webservices.ECCO.repositories.AlimentacionRepository;
import com.javeriana.webservices.ECCO.repositories.AlojamientoRepository;
import com.javeriana.webservices.ECCO.repositories.PaseoEcologicoRepository;
import com.javeriana.webservices.ECCO.repositories.ProveedorRepository;
import com.javeriana.webservices.ECCO.repositories.ServicioRepository;
import com.javeriana.webservices.ECCO.repositories.TransporteRepository;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
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
@CrossOrigin(origins = "*")
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
        List<Servicio> x =this.servicioRepository.findAll();
        List<Object> res = new ArrayList<>();
        System.out.println(x.size());
        for (Servicio aux : x){
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
        return ResponseEntity.ok(res);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity getServicio(@PathVariable(value = "id") Long servicioId){
        
        Optional<Servicio> x = this.servicioRepository.findById(servicioId);
        if(x.isPresent()){
            if(x.get() instanceof Alojamiento){
                Alojamiento a = (Alojamiento) x.get();
                return ResponseEntity.ok(AlojamientoPojo.toPojo(a));
                
            }else if(x.get() instanceof Transporte ){
                Transporte t = (Transporte) x.get();
                return ResponseEntity.ok(TransportePojo.toPojo(t));
                
            }else if(x.get() instanceof PaseoEcologico){
                PaseoEcologico p =(PaseoEcologico) x.get();
                return ResponseEntity.ok(PaseoEcologicoPojo.toPojo(p));
                
            }else if(x.get() instanceof Alimentacion){
                Alimentacion a = (Alimentacion) x.get();
                return ResponseEntity.ok(AlimentacionPojo.toPojo(a));
                
            }
            
        }
        return ResponseEntity.ok(new JSONObject("{ message : no hay servicio con ese id}").toMap());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteServicio(@PathVariable(value = "id") Long servicioId) {
        Optional<Servicio> servicio = servicioRepository.findById(servicioId);
        JSONObject response = new JSONObject();
        if(servicio.isPresent()){
            Optional<Proveedor> prov = proveedorRepository.findById(servicio.get().getProveedor().getId());
            prov.get().getServicios().remove(servicio.get());
            proveedorRepository.save(prov.get());
            servicioRepository.delete(servicio.get());
            response.put("message","mensaje eliminado con exito");
            
            return ResponseEntity.ok(response.toMap());
        }
        response.put("message", "serivicio no encontrado");
        return ResponseEntity.ok(response.toMap());
    }
    
    @GetMapping("/alojamiento")
    public List<AlojamientoPojo> getAllAlojamiento() {
        List<AlojamientoPojo> res = new ArrayList<>();
        for(Alojamiento o: alojamientoRepository.findAll() ){
            res.add(AlojamientoPojo.toPojo(o));
        }
        return res;
    }

    @GetMapping("/alojamiento/{id}")
    public ResponseEntity getAlojamientoById(@PathVariable(value = "id") Long alojamientoId){
        
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
        if(alojamiento.isPresent()){
            return ResponseEntity.ok().body(AlojamientoPojo.toPojo(alojamiento.get()));
        }
        return ResponseEntity.ok(false);
        
    }
    
    @PostMapping("/alojamiento/{idProveedor}")
    public ResponseEntity createAlojamiento(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody AlojamientoPojo alojamiento) {
        JSONObject pay = new JSONObject();
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                pay.put("message", "servicio creado");
                Alojamiento x = new Alojamiento();
                x.setProveedor(proveedor.get());
                
                x.setNombre(alojamiento.getNombre());
                x.setPais(alojamiento.getPais());
                x.setCiudad(alojamiento.getCiudad());
                x.setIdioma(alojamiento.getIdioma());
                x.setCosto(alojamiento.getCosto());
                x.setDescripcion(alojamiento.getDescripcion());
                if(alojamiento.getFoto()!=null){
                    x.setFoto(Base64.getDecoder().decode(alojamiento.getFoto()));
                }else{
                    x.setFoto(null);
                }
                x.setNumeroPersonas(alojamiento.getNumeroPersonas());

                x.setTipoAlojamiento(alojamiento.getTipoAlojamiento());
                x.setNumeroHabitaciones(alojamiento.getNumeroHabitaciones());
                x.setNumeroBanos(alojamiento.getNumeroBanos());
                x.setServicioWifi(alojamiento.getServicioWifi());
                x.setServicioLimpieza(alojamiento.getServicioLimpieza());
                x.setLatitud(alojamiento.getLatitud());
                x.setLongitud(alojamiento.getLongitud());
                x.setPlaceId(alojamiento.getPlaceId());
                Alojamiento aux =alojamientoRepository.save(x);
                proveedor.get().getServicios().add(x);
                proveedorRepository.save(proveedor.get());
                        
                return ResponseEntity.ok().body(pay.toMap());
            }
            pay.put("message", "proveedor no encontrado");
            return ResponseEntity.ok().body(pay.toMap());
        } catch (Exception e) {
            pay.put("message", "error");
            return ResponseEntity.ok().body(pay.toMap());
        }
        
        
    }

    @PutMapping("/alojamiento/{idServicio}")
    public ResponseEntity updateAlojamiento(@PathVariable(value = "idServicio") Long alojamientoId, @Valid @RequestBody AlojamientoPojo alojamientoDetails) {
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
        JSONObject pay = new JSONObject();
        if(alojamiento.isPresent()){
            
                alojamiento.get().setNombre(alojamientoDetails.getNombre());
                alojamiento.get().setPais(alojamientoDetails.getPais());
                alojamiento.get().setCiudad(alojamientoDetails.getCiudad());
                alojamiento.get().setIdioma(alojamientoDetails.getIdioma());
                alojamiento.get().setCosto(alojamientoDetails.getCosto());
                alojamiento.get().setDescripcion(alojamientoDetails.getDescripcion());
                if(alojamientoDetails.getFoto()!=null){
                    alojamiento.get().setFoto(Base64.getDecoder().decode(alojamientoDetails.getFoto()));
                }else{
                    alojamiento.get().setFoto(null);
                }
                alojamiento.get().setNumeroPersonas(alojamientoDetails.getNumeroPersonas());

                alojamiento.get().setTipoAlojamiento(alojamientoDetails.getTipoAlojamiento());
                alojamiento.get().setNumeroHabitaciones(alojamientoDetails.getNumeroHabitaciones());
                alojamiento.get().setNumeroBanos(alojamientoDetails.getNumeroBanos());
                alojamiento.get().setServicioWifi(alojamientoDetails.getServicioWifi());
                alojamiento.get().setServicioLimpieza(alojamientoDetails.getServicioLimpieza());
                alojamiento.get().setLatitud(alojamientoDetails.getLatitud());
                alojamiento.get().setLongitud(alojamientoDetails.getLongitud());
                alojamiento.get().setPlaceId(alojamientoDetails.getPlaceId());
            final Alojamiento x = alojamientoRepository.save(alojamiento.get());
            pay.put("message", "servicio actualizado");
            return ResponseEntity.ok().body(pay.toMap());
        }else{
            pay.put("message", "servicio no encontrado");
            return ResponseEntity.ok().body(pay.toMap());
        }
        
    }
    
    @GetMapping("/transporte")
    public List<TransportePojo> getAllTransporte() {
        List<TransportePojo> res = new ArrayList<>();
        for(Transporte o: transporteRepository.findAll() ){
            res.add(TransportePojo.toPojo(o));
        }
        return res;
    }

    @GetMapping("/transporte/{id}")
    public ResponseEntity getTransporteById(@PathVariable(value = "id") Long transporteId){
        
        Optional<Transporte> transporte = transporteRepository.findById(transporteId);
        if(transporte.isPresent()){
            return ResponseEntity.ok().body(TransportePojo.toPojo(transporte.get()));
        }
        return ResponseEntity.ok(false);
        
    }
    
    @PostMapping("/transporte/{idProveedor}")
    public ResponseEntity createTransporte(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody TransportePojo transporte) {
        JSONObject pay = new JSONObject();
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                pay.put("message", "servicio creado");
                Transporte x = new Transporte();
                x.setProveedor(proveedor.get());
                
                x.setNombre(transporte.getNombre());
                x.setPais(transporte.getPais());
                x.setCiudad(transporte.getCiudad());
                x.setIdioma(transporte.getIdioma());
                x.setCosto(transporte.getCosto());
                x.setDescripcion(transporte.getDescripcion());
                if(transporte.getFoto()!=null){
                    x.setFoto(Base64.getDecoder().decode(transporte.getFoto()));
                }else{
                    x.setFoto(null);
                }
                x.setNumeroPersonas(transporte.getNumeroPersonas());

                x.setEmpresa(transporte.getEmpresa());
                x.setDestino(transporte.getDestino());
                x.setHoraLlegada(transporte.getHoraLlegada());
                x.setOrigen(transporte.getOrigen());
                x.setHoraSalida(transporte.getHoraSalida());
                x.setTipoTransporte(transporte.getTipoTransporte());
                x.setLatitudOrigen(transporte.getLatitudOrigen());
                x.setLatitudDestino(transporte.getLatitudDestino());
                x.setLongitudOrigen(transporte.getLongitudOrigen());
                x.setLongitudDestino(transporte.getLongitudDestino());
                Transporte aux =transporteRepository.save(x);
                proveedor.get().getServicios().add(x);
                proveedorRepository.save(proveedor.get());
                
                return ResponseEntity.ok().body(pay.toMap());
            }
            pay.put("message", "proveedor no encontrado");
            return ResponseEntity.ok(pay.toMap());
        } catch (Exception e) {
            pay.put("message", "error");
            return ResponseEntity.ok(pay.toMap());
        }
        
        
    }

    @PutMapping("/transporte/{idServicio}")
    public ResponseEntity updateTransporte(@PathVariable(value = "idServicio") Long transporteId, @Valid @RequestBody TransportePojo transporteDetails) {
        JSONObject pay = new JSONObject();
        Optional<Transporte> transporte = transporteRepository.findById(transporteId);
        if(transporte.isPresent()){
                pay.put("message", "servicio  actualizado");
            
                transporte.get().setNombre(transporteDetails.getNombre());
                transporte.get().setPais(transporteDetails.getPais());
                transporte.get().setCiudad(transporteDetails.getCiudad());
                transporte.get().setIdioma(transporteDetails.getIdioma());
                transporte.get().setCosto(transporteDetails.getCosto());
                transporte.get().setDescripcion(transporteDetails.getDescripcion());
                if(transporteDetails.getFoto()!=null){
                    transporte.get().setFoto(Base64.getDecoder().decode(transporteDetails.getFoto()));
                }else{
                    transporte.get().setFoto(null);
                }
                transporte.get().setNumeroPersonas(transporteDetails.getNumeroPersonas());

                transporte.get().setEmpresa(transporteDetails.getEmpresa());
                transporte.get().setDestino(transporteDetails.getDestino());
                transporte.get().setHoraLlegada(transporteDetails.getHoraLlegada());
                transporte.get().setOrigen(transporteDetails.getOrigen());
                transporte.get().setHoraSalida(transporteDetails.getHoraSalida());
                transporte.get().setTipoTransporte(transporteDetails.getTipoTransporte());
                transporte.get().setLatitudOrigen(transporteDetails.getLatitudOrigen());
                transporte.get().setLatitudDestino(transporteDetails.getLatitudDestino());
                transporte.get().setLongitudOrigen(transporteDetails.getLongitudOrigen());
                transporte.get().setLongitudDestino(transporteDetails.getLongitudDestino());
            final Transporte x = transporteRepository.save(transporte.get());
            return ResponseEntity.ok(pay.toMap());
        }else{
            pay.put("message", "servicio no encontrado");
            return ResponseEntity.ok(pay.toMap());
        }
        
    }

    
    
    @GetMapping("/paseoEcologico")
    public List<PaseoEcologicoPojo> getAllPaseoEcologico() {
        List<PaseoEcologicoPojo> res = new ArrayList<>();
        for(PaseoEcologico o: paseoEcologicoRepository.findAll() ){
            res.add(PaseoEcologicoPojo.toPojo(o));
        }
        return res;
    }

    @GetMapping("/paseoEcologico/{id}")
    public ResponseEntity getPaseoEcologicoById(@PathVariable(value = "id") Long paseoEcologicoId){
        
        Optional<PaseoEcologico> paseoEcologico = paseoEcologicoRepository.findById(paseoEcologicoId);
        if(paseoEcologico.isPresent()){
            return ResponseEntity.ok().body(PaseoEcologicoPojo.toPojo(paseoEcologico.get()));
        }
        return ResponseEntity.ok(false);
        
    }
    
    @PostMapping("/paseoEcologico/{idProveedor}")
    public ResponseEntity createPaseoEcologico(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody PaseoEcologicoPojo paseoEcologico) {
        JSONObject pay = new JSONObject();
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                pay.put("message", "servicio creado");
                PaseoEcologico x = new PaseoEcologico();
                x.setProveedor(proveedor.get());
                
                x.setNombre(paseoEcologico.getNombre());
                x.setPais(paseoEcologico.getPais());
                x.setCiudad(paseoEcologico.getCiudad());
                x.setIdioma(paseoEcologico.getIdioma());
                x.setCosto(paseoEcologico.getCosto());
                x.setDescripcion(paseoEcologico.getDescripcion());
                if(paseoEcologico.getFoto()!=null){
                    x.setFoto(Base64.getDecoder().decode(paseoEcologico.getFoto()));
                }else{
                    x.setFoto(null);
                }
                x.setNumeroPersonas(paseoEcologico.getNumeroPersonas());

                
                x.setDestino(paseoEcologico.getDestino());
                x.setOrigen(paseoEcologico.getOrigen());
                x.setHoraInicio(paseoEcologico.getHoraInicio());
                x.setHoraFin(paseoEcologico.getHoraFin());
                x.setLatitudOrigen(paseoEcologico.getLatitudOrigen());
                x.setLatitudDestino(paseoEcologico.getLatitudDestino());
                x.setLongitudOrigen(paseoEcologico.getLongitudOrigen());
                x.setLongitudDestino(paseoEcologico.getLongitudDestino());
        
                PaseoEcologico aux =paseoEcologicoRepository.save(x);
                proveedor.get().getServicios().add(x);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(pay.toMap());
            }
            pay.put("message", "proveedor no encontrado");
            return ResponseEntity.ok(pay.toMap());
        } catch (Exception e) {
            pay.put("message", "error");
            return ResponseEntity.ok(pay.toMap());
        }
        
        
    }

    @PutMapping("/paseoEcologico/{idServicio}")
    public ResponseEntity updatePaseoEcologico(@PathVariable(value = "idServicio") Long paseoEcologicoId, @Valid @RequestBody PaseoEcologicoPojo paseoEcologicoDetails) {
            
        JSONObject pay = new JSONObject();
        Optional<PaseoEcologico> paseoEcologico = paseoEcologicoRepository.findById(paseoEcologicoId);
        if(paseoEcologico.isPresent()){
                pay.put("message", "servicio actualizado");
                paseoEcologico.get().setNombre(paseoEcologicoDetails.getNombre());
                paseoEcologico.get().setPais(paseoEcologicoDetails.getPais());
                paseoEcologico.get().setCiudad(paseoEcologicoDetails.getCiudad());
                paseoEcologico.get().setIdioma(paseoEcologicoDetails.getIdioma());
                paseoEcologico.get().setCosto(paseoEcologicoDetails.getCosto());
                paseoEcologico.get().setDescripcion(paseoEcologicoDetails.getDescripcion());
                if(paseoEcologicoDetails.getFoto()!=null){
                    paseoEcologico.get().setFoto(Base64.getDecoder().decode(paseoEcologicoDetails.getFoto()));
                }else{
                    paseoEcologico.get().setFoto(null);
                }
                paseoEcologico.get().setNumeroPersonas(paseoEcologicoDetails.getNumeroPersonas());

                
                paseoEcologico.get().setDestino(paseoEcologicoDetails.getDestino());
                paseoEcologico.get().setOrigen(paseoEcologicoDetails.getOrigen());
                paseoEcologico.get().setHoraInicio(paseoEcologicoDetails.getHoraInicio());
                paseoEcologico.get().setHoraFin(paseoEcologicoDetails.getHoraFin());
                paseoEcologico.get().setLatitudOrigen(paseoEcologicoDetails.getLatitudOrigen());
                paseoEcologico.get().setLatitudDestino(paseoEcologicoDetails.getLatitudDestino());
                paseoEcologico.get().setLongitudOrigen(paseoEcologicoDetails.getLongitudOrigen());
                paseoEcologico.get().setLongitudDestino(paseoEcologicoDetails.getLongitudDestino());
            
            final PaseoEcologico x = paseoEcologicoRepository.save(paseoEcologico.get());
            return ResponseEntity.ok(pay.toMap());
        }else{
            pay.put("message", "servicio no encontrado");
            return ResponseEntity.ok(pay.toMap());
        }
        
         
    }

    
    
    @GetMapping("/alimentacion")
    public List<AlimentacionPojo> getAllAlimentacion() {
        List<AlimentacionPojo> res = new ArrayList<>();
        for(Alimentacion o: alimentacionRepository.findAll() ){
            res.add(AlimentacionPojo.toPojo(o));
        }
        return res;
    }

    @GetMapping("/alimentacion/{id}")
    public ResponseEntity getAlimentacionById(@PathVariable(value = "id") Long alimentacionId){
        
        Optional<Alimentacion> alimentacion = alimentacionRepository.findById(alimentacionId);
        if(alimentacion.isPresent()){
            return ResponseEntity.ok().body(AlimentacionPojo.toPojo(alimentacion.get()));
        }
        return (ResponseEntity) ResponseEntity.notFound();
        
    }
    
    @PostMapping("/alimentacion/{idProveedor}")
    public ResponseEntity createAlimentacion(@PathVariable(value = "idProveedor") Long proveedorId, @Valid @RequestBody AlimentacionPojo alimentacion) {
        JSONObject pay = new JSONObject();
        try {
            Optional<Proveedor> proveedor = proveedorRepository.findById(proveedorId);
            if(proveedor.isPresent()){
                pay.put("message", "servicio creado");
                Alimentacion x = new Alimentacion();
                x.setProveedor(proveedor.get());
                
                x.setNombre(alimentacion.getNombre());
                x.setPais(alimentacion.getPais());
                x.setCiudad(alimentacion.getCiudad());
                x.setIdioma(alimentacion.getIdioma());
                x.setCosto(alimentacion.getCosto());
                x.setDescripcion(alimentacion.getDescripcion());
                if(alimentacion.getFoto()!=null){
                    x.setFoto(Base64.getDecoder().decode(alimentacion.getFoto()));
                }else{
                    x.setFoto(null);
                }
                x.setNumeroPersonas(alimentacion.getNumeroPersonas());

                x.setCantidadPlatos(alimentacion.getCantidadPlatos());
                x.setTipoComida(alimentacion.getTipoComida());
                x.setLatitud(alimentacion.getLatitud());
                x.setLongitud(alimentacion.getLongitud());
                x.setPlaceId(alimentacion.getPlaceId());
                Alimentacion aux =alimentacionRepository.save(x);
                proveedor.get().getServicios().add(x);
                proveedorRepository.save(proveedor.get());
                return ResponseEntity.ok().body(pay.toMap());
            }
            pay.put("message", "proveedor no encontrado");
            return ResponseEntity.ok(pay.toMap());
        } catch (Exception e) {
            pay.put("message", "error");
            return ResponseEntity.ok(pay.toMap());
        }
        
        
    }

    @PutMapping("/alimentacion/{idServicio}")
    public ResponseEntity updateAlimentacion(@PathVariable(value = "idServicio") Long alimentacionId, @Valid @RequestBody AlimentacionPojo alimentacionDetails) {
        JSONObject pay = new JSONObject();
        Optional<Alimentacion> alimentacion = alimentacionRepository.findById(alimentacionId);
        if(alimentacion.isPresent()){
            pay.put("message", "servicio actualizado");
            alimentacion.get().setNombre(alimentacionDetails.getNombre());
            alimentacion.get().setNumeroPersonas(alimentacionDetails.getNumeroPersonas());
            alimentacion.get().setCiudad(alimentacionDetails.getCiudad());
            alimentacion.get().setCosto(alimentacionDetails.getCosto());
            if(alimentacionDetails.getFoto()!=null){
                    alimentacion.get().setFoto(Base64.getDecoder().decode(alimentacionDetails.getFoto()));
            }else{
                alimentacion.get().setFoto(null);
            }
            alimentacion.get().setDescripcion(alimentacionDetails.getDescripcion());
            alimentacion.get().setIdioma(alimentacionDetails.getIdioma());
            alimentacion.get().setPais(alimentacionDetails.getPais());
            //---------------------------------------------------------------------------------------------
            alimentacion.get().setCantidadPlatos(alimentacionDetails.getCantidadPlatos());
            alimentacion.get().setTipoComida(alimentacionDetails.getTipoComida());
            alimentacion.get().setLatitud(alimentacionDetails.getLatitud());
            alimentacion.get().setLongitud(alimentacionDetails.getLongitud());
            alimentacion.get().setPlaceId(alimentacionDetails.getPlaceId());
            final Alimentacion x = alimentacionRepository.save(alimentacion.get());
            return ResponseEntity.ok(pay.toMap());
        }else{
            pay.put("message", "servicio no encontrado");
            return ResponseEntity.ok(pay.toMap());
        }
        
    }

    
    
    
}
