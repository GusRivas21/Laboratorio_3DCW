<script setup>
import comidaImage from './img/comida.jpg';
</script>

<template>

  <main class="text-white">
    <section class="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
    :style="{backgroundImage: `url(${comidaImage})` }">
      <h1 class="text-5xl md:text-6xl font-extrabold text-yellow-400">GUS GU'S</h1>
      <h2 class="text-4xl md:text-5xl font-bold mt-2">RESTAURANT</h2>
      <p class="mt-4 text-lg">¡Que la pasta se haga y el sabor hable por sí mismo!</p>
    </section>

    <section class="bg-gray-700 py-16 px-4">
      <h2 class="text-center text-4xl font-bold mb-12">Nuestro Menú</h2>
      <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div class="bg-gray-100 text-gray-800 rounded-xl shadow-md p-4">
          <img src="./img/Primi piatti.jpg" alt="Primi piatti" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="font-bold text-xl mb-1">Primi piatti</h3>
          <p class="mb-1">Espaguetis en una cremosa salsa de huevo, queso pecorino y panceta crujiente.</p>
          <p class="italic">"El secreto de Roma en un plato."</p>
        </div>
        <div class="bg-gray-100 text-gray-800 rounded-xl shadow-md p-4">
          <img src="./img/panajo.jpg" alt="Antipasti" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="font-bold text-xl mb-1">Antipasti</h3>
          <p class="mb-1">Pan crujiente con tomate fresco, albahaca y un toque de ajo.</p>
          <p class="italic">"Un bocado y estarás en la Toscana."</p>
        </div>
        <div class="bg-gray-100 text-gray-800 rounded-xl shadow-md p-4">
          <img src="./img/Carpaccio.jpg" alt="Carpaccio di Manzo" class="rounded-md mb-4 w-full h-48 object-cover" />
          <h3 class="font-bold text-xl mb-1">Carpaccio di Manzo</h3>
          <p class="mb-1">Finísimas láminas de res con rúcula, parmesano y aderezo de limón.</p>
          <p class="italic">"Tan suave que se derrite en tu boca."</p>
        </div>
      </div>
    </section>
  </main>

</template>