/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.repositories;

import com.javeriana.webservices.ECCO.Model.CarritoCompras;
import com.javeriana.webservices.ECCO.Model.Pregunta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author randy
 */
public interface PreguntaRepository extends JpaRepository<Pregunta, Long> {
    
    @Query("SELECT u from Pregunta u where u.servicio.Id = ?1")
    List<Pregunta> searchByServicioId(Long idservicio);
}
