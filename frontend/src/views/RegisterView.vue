<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos del formulario de registro
const name = ref('')
const email = ref('')
const password = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const success = ref('')

// --- FUNCIÓN DE REGISTRO ---
const register = async () => {
  // Limpiar errores anteriores
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  success.value = ''

  let hasError = false

  // Validación nombre
  if (!name.value.trim()) {
    nameError.value = 'El nombre no puede estar vacío.'
    hasError = true
  }

  // Validación correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'El correo debe contener un arroba y un dominio válido.'
    hasError = true
  }

  // Validación contraseña
  if (password.value.length < 8) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres.'
    hasError = true
  }

  if (hasError) return

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.mensaje || data.error)
    }

    success.value = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.'

    // Limpiar campos
    name.value = ''
    email.value = ''
    password.value = ''

    // Redirigir al login
    setTimeout(() => router.push('/login'), 1500)

  } catch (err) {
    emailError.value = err.message
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 px-2">
    <div class="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
      <h2 class="text-2xl text-center text-black mb-6 drop-shadow">Registro de Usuario</h2>

      <form @submit.prevent="register" class="flex flex-col gap-4">

        <!-- Nombre -->
        <div class="relative">
          <input
            v-model="name"
            type="text"
            placeholder="Nombre"
            class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
            :class="{ 'border-red-500': nameError }"
          />
          <p v-if="nameError" class="text-red-600 text-sm mt-1">{{ nameError }}</p>
        </div>

        <!-- Correo -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Correo"
            class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
            :class="{ 'border-red-500': emailError }"
          />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Contraseña -->
        <div class="relative">
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 outline-none transition"
            :class="{ 'border-red-500': passwordError }"
          />
          <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <!-- Botón -->
        <button type="submit" class="w-full bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition">
          Registrarse
        </button>

        <!-- Mensaje de éxito -->
        <p v-if="success" class="text-center text-green-600 font-medium mt-2">{{ success }}</p>
      </form>

      <!-- Link al login -->
      <div class="mt-4 text-center">
        <router-link to="/login" class="text-red-700 hover:underline">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </div>
  </div>
</template>
