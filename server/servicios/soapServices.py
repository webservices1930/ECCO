import base64
import os

from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from spyne.application import Application
from spyne.decorator import rpc
from spyne.model import ByteArray, AnyDict
from spyne.model.binary import File
from spyne.model.primitive import Unicode, Boolean,Integer, Double,String, DateTime
from spyne.protocol.soap import Soap11
from spyne.server.django import DjangoApplication
from spyne.service import ServiceBase

from EccoDjango.settings import CLIENT_IMAGES,SERVICE_IMAGES,PROVIDER_IMAGES
from servicios import models
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
    foto = String
    tipo = String
    descripcion = String
    telefono =String

class Proveedor(Client):
    paginaWeb = String
    contactoRS= String

class ProveedorRes(ClientRes):
    paginaWeb = String
    contactoRS= String

class Servicio(ComplexModel):
    id=Integer
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

class Alimentacion(Servicio):
    tipoComida = String
    cantidadPlatos = Integer

class AlimentacionRes(ServicioRes):
    tipoComida = String
    cantidadPlatos = Integer

class ResponseText(ComplexModel):
    resultado=String

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
                aux=str(base64.encodestring(d)).replace('\\n','')
                cli.foto=aux
                in_file.close()
                cli.tipo=usu.foto.split(".")[1]
            cli.descripcion=usu.descripcion
            cli.telefono=usu.telefono
            retval=[res,cli]
            return retval
        res=ResponseText()
        res.resultado="usuario no existe"
        retval=[res,ClientRes()]
        return retval

    @rpc(Client,_returns=ResponseText)
    def updateUsuario(ctx,cliente):
        sc=models.Cliente.objects.filter(nombreUsuario=cliente.nombreUsuario)
        res=ResponseText()
        if sc.count() > 0:
            try:
                cli=sc[0]
                cli.nombre=cliente.nombre
                cli.edad=cliente.edad
                cli.contrasena=cliente.contrasena
                if(len(cliente.tipo)>2 and len(cliente.foto[0])>10):
                    print(len(cli.foto))
                    if(len(cli.foto)>1):
                        os.remove(CLIENT_IMAGES+cli.foto)
                    ty = cliente.tipo.split("/")[1]
                    cli.foto=cliente.nombreUsuario+"_profile."+ty
                    with open(CLIENT_IMAGES+cli.nombreUsuario+"_profile."+ty,"wb") as f:
                        for x in cliente.foto:
                            f.write(x)
                        f.close()
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
                aux.foto=str(base64.encodestring(d)).replace('\\n','')
                in_file.close()
                aux.tipo=u.foto.split(".")[1]
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
                    with open(PROVIDER_IMAGES+proveedor.nombreUsuario+"_profile."+ty,"wb") as f:
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
    def readProveedor(ctx,provName):

        sc=models.Proveedor.objects.filter(nombreUsuario=provName)
        if(sc.count()>0):
            usu=sc[0]
            res=ResponseText()
            prov=ProveedorRes()
            res.resultado="usuario leido con exito"
            prov.nombreUsuario=usu.nombreUsuario
            prov.nombre=usu.nombre
            prov.edad=usu.edad
            if(len(usu.foto)>3):
                in_file = open(PROVIDER_IMAGES+usu.foto, "rb")
                d=in_file.read()
                aux=str(base64.encodestring(d)).replace('\\n','')
                prov.foto=aux
                in_file.close()
                prov.tipo=usu.foto.split(".")[1]
            prov.descripcion=usu.descripcion
            prov.telefono=usu.telefono
            prov.paginaWeb=usu.paginaWeb
            prov.contactoRS=usu.contactoRS
            retval=[res,prov]
            return retval
        res=ResponseText()
        res.resultado="usuario no existe"
        retval=[res,ProveedorRes()]
        return retval

    @rpc(Proveedor,_returns=ResponseText)
    def updateProveedor(ctx,proveedor):
        sc=models.Proveedor.objects.filter(nombreUsuario=proveedor.nombreUsuario)
        res=ResponseText()
        if sc.count() > 0:
            try:
                cli=sc[0]
                cli.nombre=proveedor.nombre
                cli.edad=proveedor.edad
                cli.contrasena=proveedor.contrasena
                if(len(proveedor.tipo)>2 and len(proveedor.foto[0])>10):
                    print(len(cli.foto))
                    if(len(cli.foto)>1):
                        os.remove(PROVIDER_IMAGES+cli.foto)
                    ty = proveedor.tipo.split("/")[1]
                    cli.foto=proveedor.nombreUsuario+"_profile."+ty
                    with open(PROVIDER_IMAGES+cli.nombreUsuario+"_profile."+ty,"wb") as f:
                        for x in proveedor.foto:
                            f.write(x)
                        f.close()
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
                aux.foto=str(base64.encodestring(d)).replace('\\n','')
                in_file.close()
                aux.tipo=u.foto.split(".")[1]
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

    @rpc(Integer,_returns=[ResponseText,AlimentacionRes])
    def readServicioAlimentacion(ctx,serviceId):
        res=ResponseText()
        ser=AlimentacionRes()
        sc=models.Alimentacion.objects.filter(id=serviceId)
        if sc.count() >0:
            serv=sc[0]
            ser.id=serv.id
            ser.nombre=serv.nombre
            ser.pais = serv.pais
            ser.ciudad = serv.ciudad
            ser.idioma = serv.idioma
            ser.costo = serv.costo
            ser.descripcion = serv.descripcion
            if (len(serv.foto) > 3):
                in_file = open(SERVICE_IMAGES + serv.foto, "rb")
                d = in_file.read()
                aux = str(base64.encodestring(d)).replace('\\n', '')
                ser.foto = aux
                in_file.close()
                ser.tipo = serv.foto.split(".")[1]
            else:
                ser.foto=" "

            ser.numeroPersonas = serv.numeroPersonas
            ser.nombreProveedor =serv.proveedor.nombreUsuario
            res.resultado="encontrado"
            return [res,ser]

    @rpc(Alimentacion,_returns=ResponseText)
    def updateServicioAlimentacion(ctx,servAlimentacion):
        res=ResponseText()
        sc=models.Alimentacion.objects.filter(id=servAlimentacion.id)
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
                ser.foto = " "

            ser.numeroPersonas = servAlimentacion.numeroPersonas
            res.resultado="encontrado"
            ser.save()
            return res

    @rpc(_returns=Array(AlimentacionRes))
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
                fo = str(base64.encodestring(d)).replace('\\n', '')
                aux.foto = fo
                in_file.close()
                aux.tipo = ser.foto.split(".")[1]
            else:
                aux.foto=" "

            aux.numeroPersonas = ser.numeroPersonas
            aux.nombreProveedor = ser.proveedor.nombre
            aux.tipoComida = ser.tipoComida
            aux.cantidadPlatos = ser.cantidadPlatos
            res.append(aux)
        return res

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