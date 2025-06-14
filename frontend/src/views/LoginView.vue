<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('') // Email del usuario
const password = ref('') // Contraseña del usuario
const error = ref('') // Mensaje de error

// --- FUNCIÓN DE LOGIN ---
// Realiza la petición de login al backend y guarda el usuario en localStorage
const login = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email.value, password: password.value })
        })

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.mensaje || data.error)
        }

        const user = await res.json()
        localStorage.setItem('user', JSON.stringify(user))
        // Redirección según el rol y recarga total para actualizar la barra
        if (user.role === 'admin') {
            window.location.href = '/inicio'
        } else {
            window.location.href = '/inicio'
        }
    } catch (err) {
        error.value = err.message
    }
}


// --- (Simulación de login comentada para pruebas locales) ---
// const login = () => {
//     // Simulación de usuarios
//     const admin = {
//         token: '123',
//         role: 'admin',
//         name: 'Administrador Juan',
//         email: 'admin@admin.com'
//     }

//     const cliente = {
//         token: '456',
//         role: 'cliente',
//         name: 'Carlos Cliente',
//         email: 'cliente@cliente.com'
//     }

//     const user = email.value.includes('admin') ? admin : cliente
//     // Simulación de autenticación
//     localStorage.setItem('user', JSON.stringify(user))
//     router.push('/inicio').then(() => {
//         window.location.reload() // Fuerza la recarga para que el perfil lea el nuevo usuario
//     })
// }
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 px-4"
  >
    <div
      class="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm
             sm:max-w-md md:max-w-md"
    >
      <h2 class="text-2xl text-center text-black mb-6 drop-shadow">
        Iniciar Sesión
      </h2>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="Correo"
          class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
          required
        />
        <button
          type="submit"
          class="w-full bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition"
        >
          Entrar
        </button>
        <p v-if="error" class="text-center text-red-600 font-medium mt-2">
          {{ error }}
        </p>
      </form>
      <div class="mt-4 text-center">
        <router-link
          to="/register"
          class="text-red-700 hover:underline"
          >¿No tienes cuenta? Regístrate</router-link
        >
      </div>
    </div>
  </div>
</template>
