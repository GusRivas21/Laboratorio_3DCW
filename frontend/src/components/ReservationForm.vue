<script setup>
import { ref } from 'vue'

const showForm = ref(true) // Ahora siempre está visible
const name = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const guests = ref(1)
const successMessage = ref('')
const errorMessage = ref('')

const submitReservation = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!name.value.trim()) {
    errorMessage.value = 'El nombre no puede estar vacío.'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'El correo debe ser válido.'
    return
  }
  if (!date.value || !time.value) {
    errorMessage.value = 'La fecha y hora son obligatorias.'
    return
  }
  if (guests.value < 1) {
    errorMessage.value = 'Debe haber al menos 1 invitado.'
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        date: date.value,
        time: time.value,
        guests: guests.value,
      }),
    })
    if (!res.ok) throw new Error('Error al enviar la reservación.')

    successMessage.value = 'Reservación enviada exitosamente.'

    name.value = ''
    email.value = ''
    date.value = ''
    time.value = ''
    guests.value = 1
    showForm.value = false

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>

<template>
  <div>
    <!-- Notificación flotante de éxito -->
    <div
      v-if="successMessage"
      class="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300"
    >
      {{ successMessage }}
    </div>

    <!-- Formulario de reservaciones -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Reservaciones</h2>
        <form @submit.prevent="submitReservation" class="flex flex-col gap-4">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              v-model="name"
              type="text"
              id="name"
              placeholder="Tu nombre"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-medium mb-1">Correo</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Tu correo"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>
          <div>
            <label for="date" class="block text-gray-700 font-medium mb-1">Fecha</label>
            <input
              v-model="date"
              type="date"
              id="date"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>
          <div>
            <label for="time" class="block text-gray-700 font-medium mb-1">Hora</label>
            <input
              v-model="time"
              type="time"
              id="time"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>
          <div>
            <label for="guests" class="block text-gray-700 font-medium mb-1">Número de personas</label>
            <input
              v-model="guests"
              type="number"
              id="guests"
              min="1"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-700 transition"
          >
            Reservar
          </button>
          <p v-if="errorMessage" class="text-red-600 text-center mt-2">{{ errorMessage }}</p>
        </form>
        <button
          @click="showForm = false"
          class="mt-4 w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-500 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>