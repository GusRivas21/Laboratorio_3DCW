<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const showForm = ref(true)
const name = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const guests = ref(1)
const successMessage = ref('')
const errorMessage = ref('')

// Estado para lista de reservaciones
const reservations = ref([])
const editingId = ref(null)

const fetchReservations = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
    if (!res.ok) throw new Error('Error al cargar reservaciones')
    const data = await res.json()
    // Solo reservas (no pedidos)
    reservations.value = data.filter(r => r.tipo === 'Reserva')
  } catch (err) {
    errorMessage.value = err.message
  }
}

onMounted(() => {
  fetchReservations()
})

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
    const body = {
      tipo: 'Reserva',
      nombre: name.value,
      detalle: `${guests.value} personas, ${time.value}h`,
      fecha: date.value,
      estado: 'Pendiente',
      email: email.value
    }
    let res
    if (editingId.value) {
      res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${editingId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } else {
      res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    }
    if (!res.ok) throw new Error('Error al guardar la reservación.')
    toast.success(editingId.value ? 'Reservación actualizada.' : 'Reservación enviada exitosamente.')
    name.value = ''
    email.value = ''
    date.value = ''
    time.value = ''
    guests.value = 1
    editingId.value = null
    showForm.value = false
    await fetchReservations()
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (err) {
    errorMessage.value = err.message
    toast.error(errorMessage.value)
  }
}

const startEditReservation = (resv) => {
  editingId.value = resv._id
  name.value = resv.nombre
  email.value = resv.email || ''
  date.value = resv.fecha
  // Extraer hora y personas del detalle
  const match = resv.detalle.match(/(\d+) personas, ([\d:]+)h/)
  guests.value = match ? Number(match[1]) : 1
  time.value = match ? match[2] : ''
  showForm.value = true
}

const askRemoveReservation = ref(false)
const reservationToDelete = ref(null)
function confirmRemoveReservation() {
  eliminarReservation(reservationToDelete.value._id)
  askRemoveReservation.value = false
  reservationToDelete.value = null
}
function cancelRemoveReservation() {
  askRemoveReservation.value = false
  reservationToDelete.value = null
}
const eliminarReservation = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar reservación')
    toast.success('Reservación eliminada')
    await fetchReservations()
  } catch (err) {
    toast.error('Error al eliminar reservación')
  }
}
</script>

<template>
  <div>
    <!-- Notificación flotante de éxito -->
    <div v-if="successMessage"
      class="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
      {{ successMessage }}
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div v-if="askRemoveReservation" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-80 max-w-full text-center">
        <h4 class="text-lg font-bold mb-4 text-red-700">¿Seguro que deseas eliminar esta reservación?</h4>
        <div class="flex justify-center gap-4 mt-2">
          <button @click="confirmRemoveReservation" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sí,
            eliminar</button>
          <button @click="cancelRemoveReservation"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Formulario de reservaciones -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Reservaciones</h2>
        <form @submit.prevent="submitReservation" class="flex flex-col gap-4">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-1">Nombre</label>
            <input v-model="name" type="text" id="name" placeholder="Tu nombre"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none" />
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-medium mb-1">Correo</label>
            <input v-model="email" type="email" id="email" placeholder="Tu correo"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none" />
          </div>
          <div>
            <label for="date" class="block text-gray-700 font-medium mb-1">Fecha</label>
            <input v-model="date" type="date" id="date"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none" />
          </div>
          <div>
            <label for="time" class="block text-gray-700 font-medium mb-1">Hora</label>
            <input v-model="time" type="time" id="time"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none" />
          </div>
          <div>
            <label for="guests" class="block text-gray-700 font-medium mb-1">Número de personas</label>
            <input v-model="guests" type="number" id="guests" min="1"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 outline-none" />
          </div>
          <button type="submit"
            class="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-700 transition">
            {{ editingId ? 'Actualizar' : 'Reservar' }}
          </button>
          <p v-if="errorMessage" class="text-red-600 text-center mt-2">{{ errorMessage }}</p>
        </form>
        <button @click="showForm = false"
          class="mt-4 w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-500 transition">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
