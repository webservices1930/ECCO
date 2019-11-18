/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.repositories;

import com.javeriana.webservices.ECCO.Model.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author randy
 */
public interface ResenaRepository extends JpaRepository<Resena, Long> {
    @Query("select u from Resena u where u.cliente.Id = ?1 and u.servicio.Id = ?2 ")
    Resena searchByClient(Long idCliente, Long idServicio);
}
