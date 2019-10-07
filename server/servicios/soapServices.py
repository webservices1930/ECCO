import base64
import os
import datetime
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from spyne.application import Application
from spyne.decorator import rpc
from spyne.model import ByteArray, AnyDict
from spyne.model.binary import File
from spyne.model.primitive import Unicode, Boolean,Integer, Double,String,Float
from spyne.protocol.soap import Soap11
from spyne.server.django import DjangoApplication
from spyne.service import ServiceBase
from servicios import models
from EccoDjango.settings import CLIENT_IMAGES,SERVICE_IMAGES,PROVIDER_IMAGES

import json
from spyne import Iterable, Array
from spyne import ComplexModel
from django.forms.models import model_to_dict
from django.db import IntegrityError
from spyne.error import ResourceNotFoundError
from spyne.model.fault import Fault
from django.db.models.deletion import ProtectedError



class Client(ComplexModel):
    nombreUsuario=String
    nombre=String
    edad = Integer
    contrasena=String
    foto = ByteArray
    tipo = String
    descripcion = String
    telefono =String

class ClientRes(ComplexModel):
    nombreUsuario=String
    nombre=String
    edad = Integer
    contrasena=String
    foto = String
    tipo = String
    descripcion = String
    telefono =String

class Proveedor(Client):
    paginaWeb = String
    contactoRS= String

class ProveedorRes(ClientRes):
    paginaWeb = String
    contactoRS = String


class Servicio(ComplexModel):
    nombre=String
    pais = String
    ciudad = String
    idioma = String
    costo = Double
    descripcion = String
    foto = ByteArray
    tipo = String
    numeroPersonas = Integer
    nombreProveedor = String

class ServicioRes(ComplexModel):
    id=Integer
    nombre=String
    pais = String
    ciudad = String
    idioma = String
    costo = Double
    descripcion = String
    foto = String
    tipo = String
    numeroPersonas = Integer
    nombreProveedor = String
    tipoServicio = String

class CarritoCompras(ComplexModel):
    numServicios = Integer
    costoTotal = Float

class Alimentacion(Servicio):
    tipoComida = String
    cantidadPlatos = Integer

class AlimentacionRes(ServicioRes):
    tipoComida = String
    cantidadPlatos = Integer

class PaseoEcologico(Servicio):
    origen=String
    destino=String
    horaInicio=String
    horaFin=String

class PaseoEcologicoRes(ServicioRes):
    origen=String
    destino=String
    horaInicio=String
    horaFin=String

class Alojamiento (Servicio):
    tipoAlojamiento = String (values = ["HOTEL","CASA","CAMPING","MOTEL"])
    numeroHabitaciones = Integer
    numeroBanos = Integer
    servicioLimpieza = String (values = ["Si","No"] )
    servicioWifi = String (values = ["Si","No"] )

class AlojamientoRes (ServicioRes):
    tipoAlojamiento = String
    numeroHabitaciones = Integer
    numeroBanos = Integer
    servicioLimpieza = String
    servicioWifi = String

class Transporte(Servicio):
    empresa = String
    tipoTransporte = String(values = ["TERRESTRE","AEREO","MARITIMO"])
    origen = String
    destino = String
    horaSalida = String
    horaLlegada = String

class TransporteRes(ServicioRes):
    empresa = String
    tipoTransporte = String
    origen = String
    destino = String
    horaSalida = String
    horaLlegada = String

class ResponseText(ComplexModel):
    resultado=String

class LogInReq(ComplexModel):
    nombreUsuario=String
    contrasena=String

class Pregunta(ComplexModel):
    pregunta = String
    idServicio = Integer
    nombreUsuario = String

class PreguntaRes(ComplexModel):
    id = Integer
    pregunta = String
    fechaPregunta=String
    repuesta = String
    fechaRespuesta = String
    cliente =ClientRes

class LogInRes(ComplexModel):
    tipoUsuaro=String

class SoapService(ServiceBase):


    @rpc(Client,_returns=ResponseText)
    def createUsuario(ctx,cliente):
        res=ResponseText()
        sc=models.Cliente.objects.filter(nombreUsuario=cliente.nombreUsuario)
        if sc.count() == 0:
            try:

                usu= models.Cliente(nombreUsuario=cliente.nombreUsuario,nombre=cliente.nombre,edad=cliente.edad,contrasena=cliente.contrasena,descripcion=cliente.descripcion,telefono=cliente.telefono)
                if(len(cliente.tipo)>2 and len(cliente.foto[0])>10):
                    ty = cliente.tipo.split("/")[1]
                    with open(CLIENT_IMAGES+cliente.nombreUsuario+"_profile."+ty,"wb") as f:
                        for x in cliente.foto:
                            f.write(x)
                        f.close()
                    usu.foto=cliente.nombreUsuario+"_profile."+ty
                usu.save()
                res.resultado="usuario creado con exito"
                return res
            except:
                res.resultado="error al crear usuario"
                return res
        res.resultado="el nombre de usuario no esta disponible"
        return res

    @rpc(String(),_returns=[ResponseText,ClientRes])
    def readUsuario(ctx,userName):

        sc=models.Cliente.objects.filter(nombreUsuario=userName)
        if(sc.count()>0):
            usu=sc[0]
            res=ResponseText()
            cli=ClientRes()
            res.resultado="usuario leido con exito"
            cli.nombreUsuario=usu.nombreUsuario
            cli.nombre=usu.nombre
            cli.edad=usu.edad
            if(len(usu.foto)>3):
                in_file = open(CLIENT_IMAGES+usu.foto, "rb")
                d=in_file.read()
                fo = base64.b64encode(d)
                cli.foto = fo.decode('ascii')
                in_file.close()
                cli.tipo=usu.foto.split(".")
                cli.tipo = cli.tipo[len(cli.tipo) - 1]
            cli.descripcion=usu.descripcion
            cli.telefono=usu.telefono
            retval=[res,cli]
            return retval
        res=ResponseText()
        res.resultado="usuario no existe"
        retval=[res,Client()]
        return retval

    @rpc(String,Client,_returns=ResponseText)
    def updateUsuario(ctx,nomUsuCli,cliente):
        sc=models.Cliente.objects.filter(nombreUsuario=nomUsuCli)
        res=ResponseText()
        if sc.count() > 0:
            try:
                cli=sc[0]
                cli.nombreUsuario=cliente.nombreUsuario
                cli.nombre=cliente.nombre
                cli.edad=cliente.edad
                cli.contrasena=cliente.contrasena
                if(len(cliente.tipo)>2 and len(cliente.foto[0])>10):
                    print(len(cli.foto))
                    if(len(cli.foto)>1):
                        os.remove(CLIENT_IMAGES+cli.foto)
                    ty = cliente.tipo.split("/")[1]
                    #os.mkdir(os.path.dirname(CLIENT_IMAGES+cliente.nombreUsuario+"_profile."+ty))
                    with open(CLIENT_IMAGES+cliente.nombreUsuario+"_profile."+ty,"wb+") as f:
                        for x in cliente.foto:
                            f.write(x)
                        f.close()
                    cli.foto=cliente.nombreUsuario+"_profile."+ty
                else:
                    cli.foto=" "
                cli.descripcion=cliente.descripcion
                cli.telefono=cliente.telefono
                cli.save()
                res.resultado="actualizacion realizada exitosamente"
                return res
            except :
                res.resultado="error al actualizar cliente"
                return res
        res.resultado="no hay un usuario registrado con ese nombre de usuario"
        return res

    @rpc(String(),_returns=ResponseText)
    def deleteUsuario(ctx,nombreUsuario):
        sc=models.Cliente.objects.filter(nombreUsuario=nombreUsuario)
        res=ResponseText()
        if(sc.count() > 0):
            try:
                usu=sc[0]
                if(len(usu.foto) > 2):
                    os.remove(CLIENT_IMAGES+usu.foto)
                usu.delete()
                res.resultado="usuario eliminado con exito"
                return res
            except:
                res.resultado="error al borrar usuario"
                return res
        res.resultado="usuario no existe en el sistema"
        return res

    @rpc(_returns=Array(ClientRes))
    def getAllUsuarios(ctx):
        ret=[]
        list=models.Cliente.objects.all()
        for u in list:
            aux=ClientRes()
            aux.nombreUsuario=u.nombreUsuario
            aux.nombre=u.nombre
            aux.edad=u.edad
            if(len(u.foto) > 1):
                in_file = open(CLIENT_IMAGES+u.foto, "rb")
                d=in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo=u.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            aux.descripcion=u.descripcion
            aux.telefono=u.telefono
            ret.append(aux)
        return ret

    @rpc(Proveedor,_returns=ResponseText)
    def createProveedor(ctx,proveedor):
        res=ResponseText()
        sc=models.Proveedor.objects.filter(nombreUsuario=proveedor.nombreUsuario)
        if sc.count() == 0:
            try:

                prov= models.Proveedor(nombreUsuario=proveedor.nombreUsuario,nombre=proveedor.nombre,edad=proveedor.edad,contrasena=proveedor.contrasena,descripcion=proveedor.descripcion,telefono=proveedor.telefono,paginaWeb=proveedor.paginaWeb,contactoRS=proveedor.contactoRS)
                if(len(proveedor.tipo)>2 and len(proveedor.foto[0])>10):
                    ty = proveedor.tipo.split("/")[1]
                    with open(PROVIDER_IMAGES+proveedor.nombreUsuario+"_profile."+ty,"wb+") as f:
                        for x in proveedor.foto:
                            f.write(x)
                        f.close()
                    prov.foto=proveedor.nombreUsuario+"_profile."+ty
                prov.save()
                res.resultado="proveedor creado con exito"
                return res
            except:
                res.resultado="error al crear proveedor"
                return res
        res.resultado="el nombre del proveedor no esta disponible"
        return res

    @rpc(String(),_returns=[ResponseText,ProveedorRes])
    def readProveedor(ctx, provName):

        sc=models.Proveedor.objects.filter(nombreUsuario=provName)
        if(sc.count()>0):
            usu=sc[0]
            res=ResponseText()
            prov=ProveedorRes()
            res.resultado = "usuario leido con exito"
            prov.nombreUsuario=usu.nombreUsuario
            prov.nombre=usu.nombre
            prov.edad=usu.edad
            if(len(usu.foto)>3):
                in_file = open(PROVIDER_IMAGES+usu.foto, "rb")
                d=in_file.read()
                fo = base64.b64encode(d)
                prov.foto = fo.decode('ascii')
                in_file.close()
                prov.tipo=usu.foto.split(".")
                prov.tipo = prov.tipo[len(prov.tipo) - 1]
            prov.descripcion=usu.descripcion
            prov.telefono=usu.telefono
            prov.paginaWeb=usu.paginaWeb
            prov.contactoRS=usu.contactoRS
            retval=[res,prov]
            return retval
        res=ResponseText()
        res.resultado="usuario no existe"
        retval=[res,Proveedor()]
        return retval

    @rpc(String,Proveedor,_returns=ResponseText)
    def updateProveedor(ctx, nomUsuProv, proveedor):
        sc=models.Proveedor.objects.filter(nombreUsuario=nomUsuProv)
        res=ResponseText()
        if sc.count() > 0:
            try:
                cli=sc[0]
                cli.nombreUsuario=proveedor.nombreUsuario
                cli.nombre=proveedor.nombre
                cli.edad=proveedor.edad
                cli.contrasena=proveedor.contrasena
                if(len(proveedor.tipo)>2 and len(proveedor.foto[0])>10):
                    print(len(cli.foto))
                    if(len(cli.foto)>1):
                        os.remove(PROVIDER_IMAGES+cli.foto)

                    ty = proveedor.tipo.split("/")[1]

                    with open(PROVIDER_IMAGES+cli.nombreUsuario+"_profile."+ty,"wb+") as f:
                        for x in proveedor.foto:
                            f.write(x)
                        f.close()
                    cli.foto=proveedor.nombreUsuario+"_profile."+ty
                else:
                    cli.foto=" "
                cli.descripcion=proveedor.descripcion
                cli.telefono=proveedor.telefono
                cli.paginaWeb=proveedor.paginaWeb
                cli.contactoRS=proveedor.contactoRS
                cli.save()
                res.resultado="actualizacion realizada exitosamente"
                return res
            except :
                res.resultado="error al actualizar proveedor"
                return res
        res.resultado="no hay un proveedor registrado con ese nombre de usuario"
        return res

    @rpc(String(),_returns=ResponseText)
    def deleteProveedor(ctx,nombreUsuario):
        sc=models.Proveedor.objects.filter(nombreUsuario=nombreUsuario)
        res=ResponseText()
        if(sc.count() > 0):
            try:
                usu=sc[0]
                if(len(usu.foto) > 2):
                    os.remove(PROVIDER_IMAGES+usu.foto)
                usu.delete()
                res.resultado="proveedor eliminado con exito"
                return res
            except:
                res.resultado="error al borrar proveedor"
                return res
        res.resultado="proveedor no existe en el sistema"
        return res

    @rpc(_returns=Array(ProveedorRes))
    def getAllProveedores(ctx):
        ret=[]
        list=models.Proveedor.objects.all()
        for u in list:
            aux=ProveedorRes()
            aux.nombreUsuario=u.nombreUsuario
            aux.nombre=u.nombre
            aux.edad=u.edad
            if(len(u.foto) > 1):
                in_file = open(PROVIDER_IMAGES+u.foto, "rb")
                d=in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo=u.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            aux.descripcion=u.descripcion
            aux.telefono=u.telefono
            aux.paginaWeb=u.paginaWeb
            aux.contactoRS=u.contactoRS
            ret.append(aux)
        return ret

    @rpc(Alimentacion,_returns=ResponseText)
    def createServicioAlimentacion(ctx,servicio):
        res=ResponseText()
        sc=models.Proveedor.objects.filter(nombreUsuario=servicio.nombreProveedor)
        if sc.count() > 0 :
            serv=models.Alimentacion( nombre=servicio.nombre,pais=servicio.pais, ciudad= servicio.ciudad, idioma= servicio.idioma, costo= servicio.costo, descripcion= servicio.descripcion, numeroPersonas = servicio.numeroPersonas)
            serv.proveedor=sc[0]
            serv.tipoComida=servicio.tipoComida
            print(serv.id)
            serv.cantidadPlatos=servicio.cantidadPlatos
            if (len(servicio.tipo) > 2 and len(servicio.foto[0]) > 10):
                ty = servicio.tipo.split("/")[1]
                cons=models.Servicio.objects.filter(proveedor=sc[0]).count()
                n=SERVICE_IMAGES + servicio.nombre +str(cons)+"_" +servicio.nombreProveedor+"img."+ ty
                with open(n, "wb") as f:
                    for x in servicio.foto:
                        f.write(x)
                    f.close()
                serv.foto = servicio.nombre +str(cons)+"_" +servicio.nombreProveedor+"img."+ ty
            serv.save()
            res.resultado="Servicio creado con exito"
            return res
        res.resultado="No existe un Proveedor identificado con ese nombre"
        return res


    @rpc(Integer(),Alimentacion,_returns=ResponseText)
    def updateServicioAlimentacion(ctx,idServicio,servAlimentacion):
        res=ResponseText()
        sc=models.Alimentacion.objects.filter(id=idServicio)
        if sc.count() > 0:
            ser = sc[0]
            ser.nombre = servAlimentacion.nombre
            ser.pais = servAlimentacion.pais
            ser.ciudad = servAlimentacion.ciudad
            ser.idioma = servAlimentacion.idioma
            ser.costo = servAlimentacion.costo
            ser.descripcion = servAlimentacion.descripcion

            if (len(servAlimentacion.tipo) > 2 and len(servAlimentacion.foto[0]) > 10):

                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ty = servAlimentacion.tipo.split("/")[1]
                n=servAlimentacion.nombre + str(ser.id-1) + "_" + servAlimentacion.nombreProveedor + "img." + ty
                ser.foto = n
                with open(SERVICE_IMAGES + n , "wb") as f:
                    for x in servAlimentacion.foto:
                        f.write(x)
                    f.close()
            else:
                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ser.foto = " "


            ser.numeroPersonas = servAlimentacion.numeroPersonas
            ser.cantidadPlatos=servAlimentacion.cantidadPlatos
            ser.tipoComida=servAlimentacion.tipoComida
            res.resultado="encontrado"
            ser.save()
            return res

    @rpc(_returns=[Boolean,Array(AlimentacionRes)])
    def getServiciosAlimentaicon (ctx):
        list=models.Alimentacion.objects.all()
        res=[]
        for ser in list:
            aux=AlimentacionRes()
            aux.id = ser.id
            aux.nombre =ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto=" "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario
            aux.tipoComida = ser.tipoComida
            aux.cantidadPlatos = ser.cantidadPlatos
            res.append(aux)
        p = True
        if (len(res) == 0):
            p = False
        return [p, res]


    @rpc(Integer(),_returns=ResponseText)
    def deleteServicio(ctx,id_servicio):
        sc=models.Servicio.objects.filter(id=id_servicio)
        res=ResponseText()
        if(sc.count() > 0):
            try:
                usu=sc[0]
                if(len(usu.foto) > 2):
                    os.remove(SERVICE_IMAGES+usu.foto)
                usu.delete()
                res.resultado="servicio eliminado con exito"
                return res
            except:
                res.resultado="error al borrar servicio"
                return res
        res.resultado="servicio no existe en el sistema"
        return res

    @rpc(PaseoEcologico,_returns=ResponseText)
    def createServicioPaseoEcologico(ctx,servicio):
        res=ResponseText()
        sc=models.Proveedor.objects.filter(nombreUsuario=servicio.nombreProveedor)
        if sc.count() > 0 :
            serv=models.PaseoEcologico( nombre=servicio.nombre,pais=servicio.pais, ciudad= servicio.ciudad, idioma= servicio.idioma, costo= servicio.costo, descripcion= servicio.descripcion, numeroPersonas = servicio.numeroPersonas)
            serv.proveedor=sc[0]
            serv.origen=servicio.origen
            serv.destino=servicio.destino
            serv.horaInicio=servicio.horaInicio
            serv.horaFin=servicio.horaFin
            if (len(servicio.tipo) > 2 and len(servicio.foto[0]) > 10):
                ty = servicio.tipo.split("/")[1]
                cons=models.Servicio.objects.filter(proveedor=sc[0]).count()
                n = SERVICE_IMAGES + servicio.nombre +str(cons)+"_" +servicio.nombreProveedor+"img."+ ty
                with open(n, "wb") as f:
                    for x in servicio.foto:
                        f.write(x)
                    f.close()
                serv.foto = servicio.nombre +str(cons)+"_" +servicio.nombreProveedor+"img."+ ty
            serv.save()
            res.resultado="Servicio creado con exito"
            return res
        res.resultado="No existe un Proveedor identificado con ese nombre"
        return res


    @rpc(Integer(),PaseoEcologico,_returns=ResponseText)
    def updateServicioPaseoEcologico(ctx,idServicio,serv):
        res=ResponseText()
        sc=models.PaseoEcologico.objects.filter(id=idServicio)
        if sc.count() > 0:
            ser = sc[0]
            ser.nombre = serv.nombre
            ser.pais = serv.pais
            ser.ciudad = serv.ciudad
            ser.idioma = serv.idioma
            ser.costo = serv.costo
            ser.descripcion = serv.descripcion

            if (len(serv.tipo) > 2 and len(serv.foto[0]) > 10):

                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ty = serv.tipo.split("/")[1]
                n=serv.nombre + str(ser.id-1) + "_" + serv.nombreProveedor + "img." + ty
                ser.foto = n
                with open(SERVICE_IMAGES + n , "wb") as f:
                    for x in serv.foto:
                        f.write(x)
                    f.close()
            else:
                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ser.foto = " "

            ser.numeroPersonas = serv.numeroPersonas
            ser.origen=serv.origen
            ser.destino=serv.destino
            ser.horaInicio=serv.horaInicio
            ser.horaFin=serv.horaFin
            res.resultado="encontrado"
            ser.save()
            return res

    @rpc(_returns=[Boolean,Array(PaseoEcologicoRes)])
    def getServiciosPaseoEcologico(ctx):
        list=models.PaseoEcologico.objects.all()
        res=[]
        for ser in list:
            aux=PaseoEcologicoRes()
            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto=" "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario
            aux.origen = ser.origen
            aux.destino = ser.destino
            aux.horaInicio = ser.horaInicio
            aux.horaFin = ser.horaFin
            res.append(aux)
        p=True
        if(len(res) == 0):
            p=False
        return [p,res]

    @rpc(Alojamiento, _returns=ResponseText)
    def createServicioAlojamiento(ctx, servicio):
        res = ResponseText()
        sc = models.Proveedor.objects.filter(nombreUsuario=servicio.nombreProveedor)
        if sc.count() > 0:
            serv = models.Alojamiento(nombre=servicio.nombre, pais=servicio.pais, ciudad=servicio.ciudad,
                                         idioma=servicio.idioma, costo=servicio.costo, descripcion=servicio.descripcion,
                                         numeroPersonas=servicio.numeroPersonas)
            serv.proveedor = sc[0]
            serv.tipoAlojamiento = servicio.tipoAlojamiento
            serv.numeroHabitaciones = servicio.numeroHabitaciones
            serv.numeroBanos = servicio.numeroBanos
            serv.servicioLimpieza = servicio.servicioLimpieza
            serv.servicioWifi = servicio.servicioWifi
            if (len(servicio.tipo) > 2 and len(servicio.foto[0]) > 10):
                ty = servicio.tipo.split("/")[1]
                cons = models.Servicio.objects.filter(proveedor=sc[0]).count()
                n = SERVICE_IMAGES + servicio.nombre + str(cons) + "_" + servicio.nombreProveedor + "img." + ty
                with open(n, "wb") as f:
                    for x in servicio.foto:
                        f.write(x)
                    f.close()
                serv.foto = servicio.nombre + str(cons) + "_" + servicio.nombreProveedor + "img." + ty
            serv.save()
            res.resultado = "Servicio creado con exito"
            return res
        res.resultado = "No existe un Proveedor identificado con ese nombre"
        return res

    @rpc(Integer(), Alojamiento, _returns=ResponseText)
    def updateServicioAlojamiento(ctx, idServicio, serv):
        res = ResponseText()
        sc = models.Alojamiento.objects.filter(id=idServicio)
        if sc.count() > 0:
            ser = sc[0]
            ser.nombre = serv.nombre
            ser.pais = serv.pais
            ser.ciudad = serv.ciudad
            ser.idioma = serv.idioma
            ser.costo = serv.costo
            ser.descripcion = serv.descripcion

            if (len(serv.tipo) > 2 and len(serv.foto[0]) > 10):

                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ty = serv.tipo.split("/")[1]
                n = serv.nombre + str(ser.id - 1) + "_" + serv.nombreProveedor + "img." + ty
                ser.foto = n
                with open(SERVICE_IMAGES + n, "wb") as f:
                    for x in serv.foto:
                        f.write(x)
                    f.close()
            else:
                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ser.foto = " "

            ser.numeroPersonas = serv.numeroPersonas
            ser.tipoAlojamiento = serv.tipoAlojamiento
            ser.numeroHabitaciones = serv.numeroHabitaciones
            ser.numeroBanos = serv.numeroBanos
            ser.servicioLimpieza = serv.servicioLimpieza
            ser.servicioWifi = serv.servicioWifi
            res.resultado = "encontrado"
            ser.save()
            return res

    @rpc(_returns=[Boolean, Array(AlojamientoRes)])
    def getServiciosAlojamiento(ctx):
        list = models.Alojamiento.objects.all()
        res = []
        for ser in list:
            aux = AlojamientoRes()
            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto = " "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario
            aux.tipoAlojamiento = ser.tipoAlojamiento
            aux.numeroHabitaciones = ser.numeroHabitaciones
            aux.numeroBanos = ser.numeroBanos
            aux.servicioLimpieza = ser.servicioLimpieza
            aux.servicioWifi = ser.servicioWifi
            res.append(aux)
        p = True
        if (len(res) == 0):
            p = False
        return [p, res]

    @rpc(Transporte, _returns=ResponseText)
    def createServicioTransporte(ctx, servicio):
        res = ResponseText()
        sc = models.Proveedor.objects.filter(nombreUsuario=servicio.nombreProveedor)
        if sc.count() > 0:
            serv = models.Transporte(nombre=servicio.nombre, pais=servicio.pais, ciudad=servicio.ciudad,
                                       idioma=servicio.idioma, costo=servicio.costo, descripcion=servicio.descripcion,
                                       numeroPersonas=servicio.numeroPersonas)
            serv.proveedor = sc[0]
            serv.empresa = servicio.empresa
            serv.tipoTransporte = servicio.tipoTransporte
            serv.origen = servicio.origen
            serv.destino = servicio.destino
            serv.horaSalida = servicio.horaSalida
            serv.horaLlegada = servicio.horaLlegada

            if (len(servicio.tipo) > 2 and len(servicio.foto[0]) > 10):
                ty = servicio.tipo.split("/")[1]
                cons = models.Servicio.objects.filter(proveedor=sc[0]).count()
                n = SERVICE_IMAGES + servicio.nombre + str(cons) + "_" + servicio.nombreProveedor + "img." + ty
                with open(n, "wb") as f:
                    for x in servicio.foto:
                        f.write(x)
                    f.close()
                serv.foto = servicio.nombre + str(cons) + "_" + servicio.nombreProveedor + "img." + ty
            serv.save()
            res.resultado = "Servicio creado con exito"
            return res
        res.resultado = "No existe un Proveedor identificado con ese nombre"
        return res

    @rpc(Integer(), Transporte, _returns=ResponseText)
    def updateServicioTransporte(ctx, idServicio, servicio):
        res = ResponseText()
        sc = models.Transporte.objects.filter(id=idServicio)
        if sc.count() > 0:
            ser = sc[0]
            ser.nombre = servicio.nombre
            ser.pais = servicio.pais
            ser.ciudad = servicio.ciudad
            ser.idioma = servicio.idioma
            ser.costo = servicio.costo
            ser.descripcion = servicio.descripcion

            if (len(servicio.tipo) > 2 and len(servicio.foto[0]) > 10):

                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ty = servicio.tipo.split("/")[1]
                n = servicio.nombre + str(ser.id - 1) + "_" + servicio.nombreProveedor + "img." + ty
                ser.foto = n
                with open(SERVICE_IMAGES + n, "wb") as f:
                    for x in servicio.foto:
                        f.write(x)
                    f.close()
            else:
                if (len(ser.foto) > 1):
                    os.remove(SERVICE_IMAGES + ser.foto)
                ser.foto = " "

            ser.numeroPersonas = servicio.numeroPersonas
            ser.empresa = servicio.empresa
            ser.tipoTransporte = servicio.tipoTransporte
            ser.origen = servicio.origen
            ser.destino = servicio.destino
            ser.horaSalida = servicio.horaSalida
            ser.horaLlegada = servicio.horaLlegada
            res.resultado = "encontrado"
            ser.save()
        return res

    @rpc(_returns=[Boolean, Array(TransporteRes)])
    def getServiciosTransporte(ctx):
        list = models.Transporte.objects.all()
        res = []
        for ser in list:
            aux = TransporteRes()
            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto = " "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario
            aux.empresa = ser.empresa
            aux.tipoTransporte = ser.tipoTransporte
            aux.origen = ser.origen
            aux.destino = ser.destino
            aux.horaSalida = ser.horaSalida
            aux.horaLlegada = ser.horaLlegada
            res.append(aux)
        p = True
        if (len(res) == 0):
            p = False
        return [p, res]

    @rpc(_returns=[Boolean, Array(ServicioRes)])
    def getServicios(ctx):
        list = models.Servicio.objects.all()
        res = []
        for ser in list:
            aux = None
            if (isinstance(ser, models.Alimentacion)):
                aux=AlimentacionRes()
                aux.tipoServicio = "Alimentacion"
                aux.tipoComida = ser.tipoComida
                aux.cantidadPlatos = ser.cantidadPlatos

            elif (isinstance(ser, models.PaseoEcologico)):
                aux=PaseoEcologicoRes()
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaInicio = ser.horaInicio
                aux.horaFin = ser.horaFin
                aux.tipoServicio = "PaseoEcologico"

            elif (isinstance(ser, models.Alojamiento)):
                aux = AlojamientoRes()
                aux.tipoServicio = "Alojamiento"
                aux.tipoAlojamiento = ser.tipoAlojamiento
                aux.numeroHabitaciones = ser.numeroHabitaciones
                aux.numeroBanos = ser.numeroBanos
                aux.servicioLimpieza = ser.servicioLimpieza
                aux.servicioWifi = ser.servicioWifi

            elif(isinstance(ser, models.Transporte)):
                aux= TransporteRes()
                aux.tipoServicio = "Transporte"
                aux.empresa = ser.empresa
                aux.tipoTransporte = ser.tipoTransporte
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaSalida = ser.horaSalida
                aux.horaLlegada = ser.horaLlegada


            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto = "*"

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario

            res.append(aux)
        p = True
        if (len(res) == 0):
            p = False
        return [p, res]

    @rpc(String ,_returns=[Boolean, Array(ServicioRes)])
    def getServiciosProveedor(ctx, nombreUsuario):
        list = models.Servicio.objects.filter(proveedor__nombreUsuario = nombreUsuario)
        res = []
        for ser in list:
            aux = None
            if (isinstance(ser, models.Alimentacion)):
                aux=AlimentacionRes()
                aux.tipoServicio = "Alimentacion"
                aux.tipoComida = ser.tipoComida
                aux.cantidadPlatos = ser.cantidadPlatos

            elif (isinstance(ser, models.PaseoEcologico)):
                aux=PaseoEcologicoRes()
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaInicio = ser.horaInicio
                aux.horaFin = ser.horaFin
                aux.tipoServicio = "PaseoEcologico"

            elif (isinstance(ser, models.Alojamiento)):
                aux = AlojamientoRes()
                aux.tipoServicio = "Alojamiento"
                aux.tipoAlojamiento = ser.tipoAlojamiento
                aux.numeroHabitaciones = ser.numeroHabitaciones
                aux.numeroBanos = ser.numeroBanos
                aux.servicioLimpieza = ser.servicioLimpieza
                aux.servicioWifi = ser.servicioWifi

            elif(isinstance(ser, models.Transporte)):
                aux= TransporteRes()
                aux.tipoServicio = "Transporte"
                aux.empresa = ser.empresa
                aux.tipoTransporte = ser.tipoTransporte
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaSalida = ser.horaSalida
                aux.horaLlegada = ser.horaLlegada


            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo) - 1]
            else:
                aux.foto = " "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario

            res.append(aux)
        p = True
        if (len(res) == 0):
            p = False
        return [p, res]

    @rpc(Integer,_returns=[ResponseText,ServicioRes])
    def readServicio(ctx,serviceId):
        res=ResponseText()
        sc=models.Servicio.objects.filter(id=serviceId)
        if sc.count() >0:
            ser=sc[0]
            aux = None
            if (isinstance(ser, models.Alimentacion)):
                aux = AlimentacionRes()
                aux.tipoServicio = "Alimentacion"
                aux.tipoComida = ser.tipoComida
                aux.cantidadPlatos = ser.cantidadPlatos

            elif (isinstance(ser, models.PaseoEcologico)):
                aux = PaseoEcologicoRes()
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaInicio = ser.horaInicio
                aux.horaFin = ser.horaFin
                aux.tipoServicio = "PaseoEcologico"

            elif (isinstance(ser, models.Alojamiento)):

                aux = AlojamientoRes()
                aux.tipoServicio = "Alojamiento"
                aux.tipoAlojamiento = ser.tipoAlojamiento
                aux.numeroHabitaciones = ser.numeroHabitaciones
                aux.numeroBanos = ser.numeroBanos
                aux.servicioLimpieza = ser.servicioLimpieza
                aux.servicioWifi = ser.servicioWifi

            elif (isinstance(ser, models.Transporte)):
                aux= TransporteRes()
                aux.tipoServicio = "Transporte"
                aux.empresa = ser.empresa
                aux.tipoTransporte = ser.tipoTransporte
                aux.origen = ser.origen
                aux.destino = ser.destino
                aux.horaSalida = ser.horaSalida
                aux.horaLlegada = ser.horaLlegada


            aux.id = ser.id
            aux.nombre = ser.nombre
            aux.pais = ser.pais
            aux.ciudad = ser.ciudad
            aux.idioma = ser.idioma
            aux.costo = ser.costo
            aux.descripcion = ser.descripcion
            if (len(ser.foto) > 3):
                in_file = open(SERVICE_IMAGES + ser.foto, "rb")
                d = in_file.read()
                fo = base64.b64encode(d)
                aux.foto = fo.decode('ascii')
                in_file.close()
                aux.tipo = ser.foto.split(".")
                aux.tipo = aux.tipo[len(aux.tipo)-1]
            else:
                aux.foto = " "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombreUsuario
            res.resultado="encontrado"
            return [res,aux]

    @rpc(String, Integer, _returns=ResponseText)
    def agregarAlCarrito(ctx, nomUsuario, idServicio):
        sc = models.Cliente.objects.filter(nombreUsuario=nomUsuario)
        sc1 = models.Servicio.objects.filter(id=idServicio)
        res = ResponseText()
        if (sc.count() > 0 and sc1.count() > 0):
            sc2 = models.CarritoCompras.objects.filter(cliente__nombreUsuario=nomUsuario)

            if (sc2.count() == 0):
                res.resultado = "carrito creado con exito"
                carrito = models.CarritoCompras(numServicios=1, costoTotal=sc1[0].costo, cliente=sc[0])
                carrito.save()
                servi=models.Carrito_servicio(carrito= carrito, servicio = sc1[0])
                servi.save()
            else:
                sc2 = sc2[0]
                sc2.numServicios = sc2.servicios.count() + 1
                sc2.costoTotal += sc1[0].costo
                sc2.save()
                servi = models.Carrito_servicio(carrito=sc2, servicio=sc1[0])
                servi.save()
                res.resultado = "carrito actualizado con exito"


        return res

    @rpc(String, Integer, _returns=ResponseText)
    def removerDelCarrito(ctx, nomUsuario, idServicio):
        sc1 = models.Servicio.objects.filter(id=idServicio)
        res = ResponseText()
        if (sc1.count() > 0):
            sc2 = models.Carrito_servicio.objects.filter(carrito__cliente__nombreUsuario=nomUsuario, servicio=sc1[0])
            if(sc2.count()>0):
                sc2 = sc2[0]
                sc2.carrito.costoTotal -= sc1[0].costo
                sc2.carrito.numServicios -= 1
                sc2.carrito.save()
                sc2.delete()
                res.resultado = "servicio removido"
        else:
            res.resultado = "servicio no encontrado"
        return res

    @rpc(String,_returns=[Boolean,CarritoCompras])
    def getCarrito(ctx, nomUsuario):
        sc = models.CarritoCompras.objects.filter(cliente__nombreUsuario=nomUsuario)
        if(sc.count() > 0):
            car=CarritoCompras()
            car.costoTotal=sc[0].costoTotal
            car.numServicios=sc[0].numServicios
            return [True,car]
        return [False,None]

    @rpc(String,_returns=[Boolean,Array(ServicioRes)])
    def getCarritoServicios(ctx, nomUsuario):
        sc = models.CarritoCompras.objects.filter(cliente__nombreUsuario=nomUsuario)
        if(sc.count() > 0):
            car=[]
            for s in sc[0].servicios.all():
                aux=ServicioRes()
                aux.nombreProveedor=s.proveedor.nombreUsuario
                aux.nombre=s.nombre
                aux.numeroPersonas=s.numeroPersonas
                aux.descripcion=s.descripcion
                aux.costo=s.costo
                aux.idioma=s.idioma
                aux.id=s.id
                aux.ciudad=s.ciudad
                aux.pais=s.pais
                car.append(aux)
            p=True
            if(sc[0].servicios.all().count()==0):
                p=False
            return [p,car]
        return [False,[]]

    @rpc(String,_returns=ResponseText)
    def pagarCarrito ( ctx, nomUsuario ):
        sc = models.CarritoCompras.objects.filter(cliente__nombreUsuario=nomUsuario)
        res=ResponseText()
        if(sc.count() > 0):
            carrito = sc[0]
            carrito.delete()
            res.resultado = "carrito pagado con exito"
        else:
            res.resultado = "carrito no encontrado"

        return res

    @rpc(LogInReq,_returns=[ResponseText,LogInRes])
    def LogIn(ctx, request):
        res=ResponseText()
        reslog=LogInRes()
        sc=models.Usuario.objects.filter(nombreUsuario=request.nombreUsuario)
        if(sc.count() > 0):
            if(sc[0].contrasena==request.contrasena):
                res.resultado="inicio de sesion exitoso"
                if(isinstance(sc[0],models.Proveedor) ):
                    reslog.tipoUsuaro="proveedor"
                    return [res,reslog]
                reslog.tipoUsuaro="usuario"
                return [res,reslog]
            res.resultado="inicio de sesion fallido contrasena invalida"
            return [res,reslog]
        res.resultado="inicio de sesion fallido nombre de usuario no existe"
        return [res,reslog]

    @rpc(Pregunta, _returns=ResponseText)
    def createPregunta(ctx,pregun):
        clien=models.Cliente.objects.filter(nombreUsuario=pregun.nombreUsuario)
        serv=models.Servicio.objects.filter(id=pregun.idServicio)
        res=ResponseText()
        if(clien.count() > 0 and serv.count() > 0):
            pregunta=models.Pregunta(pregunta=pregun.pregunta, fechaPregunta=str(datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")),  servicio=serv[0] , cliente= clien[0])
            pregunta.save()
            res.resultado="pregunta creada con exito"
        else:
            res.resultado=" usuario o servicio no encontrado"
        return res

    @rpc(String, Integer,_returns=ResponseText)
    def agregarRespuesta(ctx,respuesta, idPregunta):
        preg = models.Pregunta.objects.filter(id = idPregunta)
        res = ResponseText()
        if preg.count() > 0 :
            preg = preg[0]
            preg.respuesta = respuesta
            preg.fechaRespuesta = str(datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
            preg.save()
            res.resultado="respuesta agregada con exito"
        else:
            res.resultado="pregunta no existe"

        return res

    @rpc(Integer,_returns =[Boolean, Array(PreguntaRes)])
    def getPreguntasServicio(self,idServicio):

        preguntas=models.Pregunta.objects.filter(servicio__id = idServicio)
        if(preguntas.count() > 0):
            res=[]
            for p in preguntas:
                aux= PreguntaRes()
                aux.id = p.id
                aux.pregunta=p.pregunta
                aux.fechaPregunta=p.fechaPregunta
                aux.repuesta= p.respuesta
                aux.fechaRespuesta = p.fechaRespuesta
                aux.cliente = p.cliente
                if len(p.cliente.foto) > 3:
                    aux.cliente.tipo = p.cliente.foto.split(".")
                    aux.cliente.tipo = aux.cliente.tipo[len(aux.cliente.tipo) - 1]
                    in_file = open(CLIENT_IMAGES + p.cliente.foto, "rb")
                    d = in_file.read()
                    fo = base64.b64encode(d)
                    aux.cliente.foto = fo.decode('ascii')
                    in_file.close()
                else:
                    aux.cliente.foto = " "
                res.append(aux)
            return [True, res]
        else:
            return [False, []]


soap_app = Application(
    [SoapService],
    tns='django.soap.service',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11(polymorphic=True),
)

def consulta():
    django_soap_app = DjangoApplication(soap_app)
    my_soap =csrf_exempt(django_soap_app)
    return my_soap