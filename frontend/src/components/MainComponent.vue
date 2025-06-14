<script setup> 
// --- IMPORTS Y REACTIVIDAD ---
import comidaImage from './img/comida.jpg'
import AboutUsComponent from './AboutUsComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Función para redirigir a servicios
const irAServicios = () => {
  router.push('/servicios')
}
</script>

<template>
  <main class="text-white bg-black">
    <!-- Hero principal sin parallax -->
    <section
      class="h-[80vh] md:h-screen flex flex-col justify-center items-center text-center px-4 relative"
      :style="{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.7)), url(${comidaImage})`,
        backgroundAttachment: 'scroll',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-position 1.9s',
      }"
    >
      <!-- Ajuste responsivo: p-8 → px-4 py-6 sm:p-8 y max-w para contener en móviles -->
      <div class="backdrop-blur-sm bg-black/30 rounded-xl px-4 py-6 sm:p-8 w-full max-w-2xl">
        <!-- Ajuste responsivo en tamaños de texto -->
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-red-400 drop-shadow-lg">GUS GU'S</h1>
        <h2 class="text-2xl sm:text-3xl md:text-5xl font-bold mt-2 tracking-widest">RESTAURANT</h2>
        <p class="mt-4 text-base sm:text-lg md:text-2xl text-gray-100 font-medium">
          ¡Que la pasta se haga y el sabor hable por sí mismo!
        </p>
      </div>
    </section>

    <!-- Menú destacado -->
    <section id="menu" class="bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-black py-20 px-4 pt-30">
      <!-- Ajuste responsivo en títulos -->
      <h2 class="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-widest">Nuestro Menú</h2>

      <!-- Ajuste responsivo en párrafo -->
      <p class="text-center text-base sm:text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
        Explora algunos de nuestros platillos más representativos.
        Haz clic para conocer más opciones.
      </p>

      <!-- Ajuste responsivo: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -->
      <div class="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <!-- Cada tarjeta redirige al componente de servicios -->
        <div
          @click="irAServicios"
          class="cursor-pointer bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center max-w-xs mx-auto"
        >
          <!-- Ajuste responsivo en altura de imagen -->
          <img src="./img/Spaghetti alla Carbonara.jpg" alt="Spaghetti alla Carbonara" class="rounded-lg mb-4 w-full h-44 sm:h-48 object-cover shadow" />
          <h3 class="font-bold text-xl sm:text-2xl mb-2 text-red-700">Spaghetti alla Carbonara</h3>
          <p class="text-sm sm:text-base mb-1 text-center">Pasta con huevo, queso, panceta y pimienta.</p>
          <p class="italic text-gray-600 text-sm text-center">"El secreto de Roma en un plato."</p>
        </div>

        <div
          @click="irAServicios"
          class="cursor-pointer bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center max-w-xs mx-auto"
        >
          <img src="./img/Pizza Margherita.jpg" alt="Pizza Margherita" class="rounded-lg mb-4 w-full h-44 sm:h-48 object-cover shadow" />
          <h3 class="font-bold text-xl sm:text-2xl mb-2 text-red-700">Pizza Margherita</h3>
          <p class="text-sm sm:text-base mb-1 text-center">Pizza clásica con tomate, mozzarella y albahaca.</p>
          <p class="italic text-gray-600 text-sm text-center">"Un bocado y estarás en la Toscana."</p>
        </div>

        <div
          @click="irAServicios"
          class="cursor-pointer bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center max-w-xs mx-auto"
        >
          <img src="./img/lasagna.png" alt="Lasagna" class="rounded-lg mb-4 w-full h-44 sm:h-48 object-cover shadow" />
          <h3 class="font-bold text-xl sm:text-2xl mb-2 text-red-700">Lasagna</h3>
          <p class="text-sm sm:text-base mb-1 text-center">Capas de pasta con carne, salsa bechamel y queso.</p>
          <p class="italic text-gray-600 text-sm text-center">"Tan suave que se derrite en tu boca."</p>
        </div>
      </div>
    </section>
  </main>

  <!-- Sección Sobre Nosotros -->
  <AboutUsComponent />
</template>

<style scoped>
/* Elimina la clase parallax-bg, ya no es necesaria con el nuevo método */
</style>
