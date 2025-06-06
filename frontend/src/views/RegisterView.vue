<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos del formulario de registro
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

// --- FUNCIÓN DE REGISTRO ---
// Envía los datos al backend para crear un nuevo usuario
const register = async () => {
    error.value = ''
    success.value = ''
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.value, email: email.value, password: password.value }) // No se envía rol
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.mensaje || data.error)
        }
        success.value = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.'
        // Opcional: redirigir al login
        setTimeout(() => router.push('/login'), 1500)
    } catch (err) {
        error.value = err.message
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 px-2">
        <div class="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 class="text-2xl text-center text-black mb-6 drop-shadow">Registro de Usuario</h2>
        <form @submit.prevent="register" class="flex flex-col gap-4">
            <input v-model="name" type="text" placeholder="Nombre" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition" required />
            <input v-model="email" type="email" placeholder="Correo" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition" required />
            <input v-model="password" type="password" placeholder="Contraseña" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition" required />
            <button type="submit" class="w-full bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition">Registrarse</button>
            <p v-if="error" class="text-center text-red-600 font-medium mt-2">{{ error }}</p>
            <p v-if="success" class="text-center text-green-600 font-medium mt-2">{{ success }}</p>
        </form>
        <div class="mt-4 text-center">
            <router-link to="/login" class="text-red-700 hover:underline">¿Ya tienes cuenta? Inicia sesión</router-link>
        </div>
        </div>
    </div>
</template>
