<script setup>
import { ref, onMounted } from 'vue'

    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

    // Función para actualizar el usuario desde localStorage
    function updateUser() {
    user.value = JSON.parse(localStorage.getItem('user') || '{}')
    }

    // Si el registro ocurre en la misma pestaña, llama a updateUser después de registrar.
    // Si puede ocurrir en otra pestaña, escucha el evento 'storage':
    onMounted(() => {
    window.addEventListener('storage', updateUser)
})
</script>


<template>
    <div class="min-h-screen bg-gray-100 py-10 px-4">
        <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Perfil del Usuario</h2>

        <div class="space-y-3">
            <div>
            <span class="font-semibold">Nombre:</span>
            <span>{{ user.name }}</span>
            </div>
            <div>
            <span class="font-semibold">Correo:</span>
            <span>{{ user.email || 'no-asignado@mail.com' }}</span>
            </div>
            <div>
            <span class="font-semibold">Rol:</span>
            <span class="capitalize">{{ user.role }}</span>
            </div>
        </div>

        <div class="mt-6 text-center">
            <router-link to="/inicio" class="text-blue-600 hover:underline">Volver al inicio</router-link>
        </div>
        </div>
    </div>
</template>