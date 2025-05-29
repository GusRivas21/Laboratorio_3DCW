<script setup>
import { ref, onMounted } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

function updateUser() {
    user.value = JSON.parse(localStorage.getItem('user') || '{}')
}

onMounted(() => {
    window.addEventListener('storage', updateUser)
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 py-12 px-4">
        <div class="max-w-md mx-auto bg-white/90 p-8 rounded-2xl shadow-2xl">
        <div class="flex flex-col items-center mb-6">
            <div class="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center shadow-lg mb-3">
            <span class="text-4xl font-bold text-white">
                {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}
            </span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-1">Perfil del Usuario</h2>
            <p class="text-gray-500 text-sm">{{ user.email || 'no-asignado@mail.com' }}</p>
        </div>

        <div class="divide-y divide-gray-200">
            <div class="py-4 flex items-center">
            <span class="font-semibold w-24 text-gray-700">Nombre:</span>
            <span class="ml-2 text-gray-800">{{ user.name || 'Sin nombre' }}</span>
            </div>
            <div class="py-4 flex items-center">
            <span class="font-semibold w-24 text-gray-700">Correo:</span>
            <span class="ml-2 text-gray-800">{{ user.email || 'no-asignado@mail.com' }}</span>
            </div>
            <div class="py-4 flex items-center">
            <span class="font-semibold w-24 text-gray-700">Rol:</span>
            <span class="ml-2 capitalize text-gray-800">{{ user.role || 'usuario' }}</span>
            </div>
        </div>

        <div class="mt-8 text-center">
            <router-link to="/inicio" class="inline-block px-6 py-2 rounded-full bg-red-500 text-gray-900 font-semibold shadow hover:bg-red-400 transition">
            Volver al inicio
            </router-link>
        </div>
        </div>
    </div>
</template>