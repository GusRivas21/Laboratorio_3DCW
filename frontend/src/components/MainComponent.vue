<script setup>
// --- IMPORTS Y REACTIVIDAD ---
// Importaciones de Vue y componentes necesarios
import comidaImage from './img/comida.jpg';
import AboutUsComponent from './AboutUsComponent.vue';
</script>

<template>
  <main class="text-white bg-black" >
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
      <!-- Contenido principal del hero -->
      <div class="backdrop-blur-sm bg-black/30 rounded-xl p-8">
        <h1 class="text-5xl md:text-7xl font-extrabold text-red-400 drop-shadow-lg">GUS GU'S</h1>
        <h2 class="text-3xl md:text-5xl font-bold mt-2 tracking-widest">RESTAURANT</h2>
        <p class="mt-6 text-lg md:text-2xl text-gray-100 font-medium">¡Que la pasta se haga y el sabor hable por sí mismo!</p>
      </div>
    </section>

    <!-- Menú destacado -->
    <section id="menu" class="bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-black py-20 px-4 pt-30">
      <h2 class="text-center text-4xl md:text-5xl font-bold mb-14 text-white tracking-widest">Nuestro Menu</h2>
      <div class="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        <!-- Card de menú destacado -->
        <div class="bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <img src="./img/Primi piatti.jpg" alt="Primi piatti" class="rounded-lg mb-5 w-full h-48 object-cover shadow" />
          <h3 class="font-bold text-2xl mb-2 text-red-700">Primi piatti</h3>
          <p class="mb-2 text-center">Espaguetis en una cremosa salsa de huevo, queso pecorino y panceta crujiente.</p>
          <p class="italic text-gray-600 text-center">"El secreto de Roma en un plato."</p>
        </div>
        <div class="bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <img src="./img/panajo.jpg" alt="Antipasti" class="rounded-lg mb-5 w-full h-48 object-cover shadow" />
          <h3 class="font-bold text-2xl mb-2 text-red-700">Antipasti</h3>
          <p class="mb-2 text-center">Pan crujiente con tomate fresco, albahaca y un toque de ajo.</p>
          <p class="italic text-gray-600 text-center">"Un bocado y estarás en la Toscana."</p>
        </div>
        <div class="bg-gray-400 text-gray-900 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <img src="./img/Carpaccio.jpg" alt="Carpaccio di Manzo" class="rounded-lg mb-5 w-full h-48 object-cover shadow" />
          <h3 class="font-bold text-2xl mb-2 text-red-700">Carpaccio di Manzo</h3>
          <p class="mb-2 text-center">Finísimas láminas de res con rúcula, parmesano y aderezo de limón.</p>
          <p class="italic text-gray-600 text-center">"Tan suave que se derrite en tu boca."</p>
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