/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.javeriana.webservices.ECCO.repositories;

import com.javeriana.webservices.ECCO.Model.Cliente;
import com.javeriana.webservices.ECCO.Model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author randy
 */
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    @Query("SELECT u from Proveedor u where u.nombreUsuario = ?1")
    Proveedor searchByUsername(String userName);
}
