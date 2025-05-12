<script setup>
import { computed } from 'vue'
//Esto es para importar las imágenes para los íconos de los servicios
import pizza from '@/components/img/pizza.png'
import delivery from '@/components/img/delivery.png'
import reservar from '@/components/img/reservar.png'
import coctel from '@/components/img/coctel.png'
import catering from '@/components/img/catering.png'
import wifi from '@/components/img/wifi.png'

//Se crea un array con la lista de objetos que representan los servicios ofrecidos
const services = [
  {
    icon: pizza,
    title: 'Atención a la Mesa',
    description: 'Disfruta de nuestra comida sin necesidad de levantarte de tu mesa.'
  },
  {
    icon: delivery,
    title: 'Delivery',
    description: '¿No tienes tiempo para visitarnos? Te lo llevamos.'
  },
  {
    icon: reservar,
    title: 'Reservaciones',
    description: 'Reserva una mesa para tu familia o pareja y disfruta.'
  },
  {
    icon: coctel,
    title: 'Bar y Coctelería',
    description: 'Disfruta de todo tipo de bebidas en nuestro bar.'
  },
  {
    icon: catering,
    title: 'Catering',
    description: 'Menús personalizados para eventos o reuniones.'
  },
  {
    icon: wifi,
    title: 'Wi-Fi Gratis',
    description: 'Wi-Fi gratuito para nuestros queridos clientes.'
  }
]

//Una ropiedad computada que devuelve la cantidad total de servicios disponibles
const totalServices = computed(() => services.length)
</script>


<template>
  <section class="relative bg-cover bg-center py-16 px-4" :style="{ backgroundImage: 'url(https://i.pinimg.com/736x/59/19/34/591934ea0438900629d4f72f3eb1ae7d.jpg)' }">
    <!--Aqui se muestra el total de servicios usando la propiedad computada-->
    <h2 class="text-center text-white text-xl font-semibold mb-8">
      Total de servicios ofrecidos: {{ totalServices }}
    </h2>

    <!--Contenedor en forma de grilla con 3 columnas en pantallas medianas -->
    <div class="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center text-gray-900">
      <!--Iteración de cada servicio con v-for-->
      <div v-for="(service, index) in services" :key="index" class="bg-white rounded-full shadow-lg p-6 w-64 h-64 flex flex-col justify-center items-center mx-auto transition-transform hover:scale-105">
        <!--Y se renderiza los valores de las propiedades en el array en el script services-->
        <!--Imagen del ícono del servicio-->
        <img :src="service.icon" :alt="service.title" class="w-16 h-16 mb-4" />
        <!--Título del servicio-->
        <h3 class="font-bold text-lg mb-1">{{ service.title }}</h3>
        <!--Descripción del servicio-->
        <p class="text-sm text-gray-700">{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 15px 20px;
  color: white;
  width: 100%;
  box-sizing: border-box;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 80px;
  height: auto;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>