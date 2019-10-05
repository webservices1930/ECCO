import django
from django.db import models
from polymorphic.models import PolymorphicModel
import datetime

# Create your models here.

class Usuario(PolymorphicModel):
    nombreUsuario=models.TextField(blank=False,unique=True,default="")
    nombre = models.TextField(blank=False)
    edad = models.IntegerField()
    foto =models.TextField()
    descripcion =models.TextField()
    telefono =models.TextField()
    contrasena = models.TextField(default="1234")

class Cliente(Usuario):
    pass

class Proveedor(Usuario):
    paginaWeb=models.TextField()
    contactoRS=models.TextField(blank=True)

class Servicio(PolymorphicModel):
    id=models.AutoField(primary_key=True)
    nombre=models.TextField()
    pais = models.TextField()
    ciudad = models.TextField()
    idioma =models.TextField()
    costo = models.FloatField()
    descripcion = models.TextField()
    foto = models.TextField()
    numeroPersonas =models.IntegerField()
    proveedor = models.ForeignKey(Proveedor,on_delete=models.CASCADE)


class Resena(models.Model):
    id = models.AutoField(primary_key=True)
    cliente=models.ForeignKey(Cliente,on_delete=models.CASCADE)
    servicio=models.ForeignKey(Servicio,on_delete=models.CASCADE)
    texto=models.TextField(default="")

class Alojamiento(Servicio):
    tipoAlojamiento=models.TextField(choices=(("HOTEL","HOTEL"),("CASA","CASA"),("CAMPING","CAMPING"),("MOTEL","MOTEL")))
    numeroHabitaciones=models.IntegerField()
    numeroBanos=models.IntegerField()
    servicioLimpieza=models.TextField(choices=(("Si","Si"),("No","No")))
    servicioWifi = models.TextField(choices=(("Si","Si"),("No","No")))

class PaseoEcologico(Servicio):
    origen=models.TextField()
    destino=models.TextField(default="")
    horaInicio=models.TextField()
    horaFin=models.TextField()

class Alimentacion(Servicio):
    tipoComida=models.TextField()
    cantidadPlatos=models.IntegerField()

class Transporte(Servicio):
    empresa=models.TextField()
    tipoTransporte=models.TextField(choices=(("TERRESTRE","Terrestre"),("AEREO","Aereo"),("MARITIMO","Maritimo")))
    origen=models.TextField()
    destino=models.TextField()
    horaSalida=models.TextField()
    horaLlegada=models.TextField()


class CarritoCompras(models.Model):
    numServicios = models.IntegerField()
    costoTotal = models.FloatField()
    cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE)
    servicios= models.ManyToManyField('Servicio' ,through='Carrito_servicio',related_name="servicios")

class Carrito_servicio(models.Model):
    carrito = models.ForeignKey(CarritoCompras, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio , on_delete=models.CASCADE)

class Pregunta(models.Model):
    id = models.AutoField(primary_key=True)
    pregunta=models.TextField()
    fechaPregunta=models.TextField()
    respuesta=models.TextField()
    fechaRespuesta=models.TextField()
    servicio=models.ForeignKey(Servicio, on_delete=models.CASCADE)
    cliente=models.ForeignKey(Cliente,on_delete=models.CASCADE)