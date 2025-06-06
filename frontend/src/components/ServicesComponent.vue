<script setup>
// --- IMPORTS Y REACTIVIDAD ---
// Importaciones de Vue y componentes necesarios para la sección de servicios
// Aquí puedes agregar lógica reactiva si en el futuro se requiere
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
]

//Una ropiedad computada que devuelve la cantidad total de servicios disponibles
const totalServices = computed(() => services.length)
</script>


<template>
  <section class="relative bg-cover bg-center py-16 px-4" :style="{ backgroundImage: 'url(https://i.pinimg.com/736x/59/19/34/591934ea0438900629d4f72f3eb1ae7d.jpg)' }">
    <h2 class="text-center text-white text-3xl font-bold mb-12">Nuestros Servicios</h2>
    <div class="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
      <div v-for="(service, index) in services" :key="index" class="bg-white/90 text-gray-900 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
        <img :src="service.icon" :alt="service.title" class="rounded-lg mb-5 w-full h-40 object-cover shadow" />
        <h3 class="font-bold text-2xl mb-2 text-red-700">{{ service.title }}</h3>
        <p class="mb-2 text-center">{{ service.description }}</p>
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