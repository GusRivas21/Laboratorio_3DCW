<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref, onMounted } from 'vue'

// Datos del usuario para mostrar en el perfil
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

function updateUser() {
    user.value = JSON.parse(localStorage.getItem('user') || '{}')
}

onMounted(() => {
    window.addEventListener('storage', updateUser)
})

// --- FUNCIÓN DE LOGOUT ---
// Elimina el usuario del localStorage y recarga la página
const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 py-12 px-4 pt-32"
  >
    <div
      class="max-w-md mx-auto bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl w-full"
    >
      <div class="flex flex-col items-center mb-6">
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-400 flex items-center justify-center shadow-lg mb-3"
        >
          <span class="text-3xl sm:text-4xl font-bold text-white">
            {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}
          </span>
        </div>
        <h2
          class="text-xl sm:text-2xl font-bold text-gray-800 mb-1 text-center"
        >
          Perfil del Usuario
        </h2>
        <p class="text-gray-500 text-sm sm:text-base text-center">
          {{ user.email || 'no-asignado@mail.com' }}
        </p>
      </div>

      <div class="divide-y divide-gray-200">
        <div class="py-4 flex flex-col sm:flex-row sm:items-center">
          <span
            class="font-semibold w-full sm:w-24 text-gray-700 mb-1 sm:mb-0"
            >Nombre:</span
          >
          <span class="ml-0 sm:ml-2 text-gray-800">{{ user.name || 'Sin nombre' }}</span>
        </div>
        <div class="py-4 flex flex-col sm:flex-row sm:items-center">
          <span
            class="font-semibold w-full sm:w-24 text-gray-700 mb-1 sm:mb-0"
            >Correo:</span
          >
          <span class="ml-0 sm:ml-2 text-gray-800">{{ user.email || 'no-asignado@mail.com' }}</span>
        </div>
        <div class="py-4 flex flex-col sm:flex-row sm:items-center">
          <span
            class="font-semibold w-full sm:w-24 text-gray-700 mb-1 sm:mb-0"
            >Rol:</span
          >
          <span class="ml-0 sm:ml-2 capitalize text-gray-800">{{ user.role || 'usuario' }}</span>
        </div>
      </div>

      <div class="mt-8 text-center">
        <router-link
          to="/inicio"
          class="inline-block px-6 py-2 rounded-full bg-red-500 text-gray-900 font-semibold shadow hover:bg-red-400 transition"
          >Volver al inicio</router-link
        >
      </div>
    </div>
  </div>
</template>
