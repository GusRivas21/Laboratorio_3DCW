<script setup>
// --- IMPORTS Y REACTIVIDAD ---
// Importaciones de Vue y componentes necesarios para la sección de servicios
// Aquí puedes agregar lógica reactiva si en el futuro se requiere
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// Importación de imágenes para los íconos de los servicios
import pizza from '@/components/img/pizza.png'
import delivery from '@/components/img/delivery.png'
import reservar from '@/components/img/reservar.png'
import coctel from '@/components/img/coctel.png'
import catering from '@/components/img/catering.png'
import wifi from '@/components/img/wifi.png'

// Array con la lista de servicios ofrecidos
const services = [
  {
    icon: pizza,
    title: 'Comida',
    description: 'Disfruta de nuestros platillos más deliciosos.',
    categoria: 'comida'
  },
  {
    icon: coctel,
    title: 'Bar y Coctelería',
    description: 'Disfruta de todo tipo de bebidas y cocteles en nuestro bar.',
    categoria: 'cocteleria'
  },
  {
    icon: reservar,
    title: 'Reservaciones',
    description: 'Reserva una mesa para tu familia o pareja y disfruta.',
    categoria: 'reservaciones'
  },
]

//Una ropiedad computada que devuelve la cantidad total de servicios disponibles
const totalServices = computed(() => services.length)

const router = useRouter()

function goToService(service) {
  // Redirige a la ruta del catálogo con la categoría correspondiente
  router.push({
    name: 'service-catalog',
    query: { categoria: service.categoria }
  })
}
</script>


<template>
  <section class="relative bg-cover bg-center py-16 px-4" :style="{ backgroundImage: 'url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/a2/95/e0/disponible-para-reservas.jpg?w=900&h=500&s=1)' }">
    <h2 class="text-center text-white text-3xl font-bold mb-12">Nuestros Servicios</h2>
    <div class="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="bg-white/90 text-gray-900 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center cursor-pointer"
        @click="goToService(service)"
      >
        <!-- Imagen ajustada con tamaño más grande pero proporcional -->
        <img :src="service.icon" :alt="service.title" class="rounded-lg mb-4 w-36 h-36 object-contain shadow" />
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
