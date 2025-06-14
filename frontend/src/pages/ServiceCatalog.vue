<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/composables/useCart'
import ReservationForm from '@/components/ReservationForm.vue'

const { addToCart } = useCart()
const route = useRoute()

const categorias = ref(['comida', 'cocteleria', 'reservaciones'])
const categoriaSeleccionada = ref(categorias.value[0])
const servicios = ref([])
const loading = ref(false)
const error = ref('')

// Paginación
const pagina = ref(1)
const porPagina = 4
const totalPaginas = ref(1)

// Mostrar formulario de reserva
const mostrarFormularioReserva = ref(false)
const servicioSeleccionado = ref(null)

const fetchServicios = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services?categoria=${categoriaSeleccionada.value}`)
    if (!res.ok) throw new Error('Error al cargar servicios')
    const data = await res.json()
    servicios.value = data
    totalPaginas.value = Math.max(1, Math.ceil(data.length / porPagina))
    pagina.value = 1
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const seleccionarCategoria = (cat) => {
  categoriaSeleccionada.value = cat
  fetchServicios()
}

const serviciosPagina = () => {
  const start = (pagina.value - 1) * porPagina
  return servicios.value.slice(start, start + porPagina)
}

const mostrarFormulario = (servicio) => {
  servicioSeleccionado.value = servicio
  mostrarFormularioReserva.value = true
}

onMounted(() => {
  if (route.query.categoria && categorias.value.includes(route.query.categoria)) {
    categoriaSeleccionada.value = route.query.categoria
  }
  fetchServicios()
})

watch(
  () => route.query.categoria,
  (newCat) => {
    if (newCat && categorias.value.includes(newCat)) {
      categoriaSeleccionada.value = newCat
      fetchServicios()
    }
  }
)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 flex flex-col pt-24">
    <!-- Botones de categoría -->
    <div class="w-full flex flex-wrap justify-center gap-3 py-4 bg-gradient-to-r from-black via-red-900 to-black">
      <button v-for="cat in categorias" :key="cat" @click="seleccionarCategoria(cat)" :class="[
        'py-2 px-4 sm:px-6 rounded-full font-bold transition duration-300 transform hover:scale-105',
        categoriaSeleccionada === cat
          ? 'bg-red-700 text-white shadow-md'
          : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
      ]">
        {{ cat.replace(/-/g, ' ') }}
      </button>
    </div>

    <!-- Contenido principal -->
    <main class="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      <h2 class="text-2xl sm:text-3xl font-bold text-red-900 mb-6 capitalize text-center animate-fade-in-up">
        {{ categoriaSeleccionada.replace(/-/g, ' ') }}
      </h2>
      <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 min-h-[300px]">
        <div v-if="loading" class="text-gray-500 animate-pulse">Cargando...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <div v-for="servicio in serviciosPagina()" :key="servicio._id" class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center
                      transform transition duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up">
              <img :src="servicio.imagen" :alt="servicio.nombre"
                class="w-full h-28 sm:h-32 object-cover rounded mb-3 transition duration-300 hover:opacity-90" />
              <h3 class="font-bold text-lg text-red-700 mb-1 text-center">{{ servicio.nombre }}</h3>
              <p class="text-gray-700 text-sm mb-2 text-center">{{ servicio.descripcion }}</p>
              <p v-if="servicio.precio" class="text-green-700 font-bold mb-2 text-center">{{ servicio.precio }}</p>
              <button v-if="categoriaSeleccionada !== 'reservaciones'"
                class="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition duration-300 w-full"
                @click="addToCart(servicio)">
                Agregar al carrito
              </button>
              <button v-else
                class="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition duration-300 w-full"
                @click="mostrarFormulario(servicio)">
                Reservar
              </button>
            </div>
          </div>

          <!-- Paginación -->
          <div v-if="totalPaginas > 1" class="flex flex-wrap justify-center mt-8 gap-2">
            <button :disabled="pagina === 1" @click="pagina--"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition">Anterior</button>
            <span class="px-4 py-1 font-bold min-w-[60px] text-center">{{ pagina }} / {{ totalPaginas }}</span>
            <button :disabled="pagina === totalPaginas" @click="pagina++"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition">Siguiente</button>
          </div>
        </div>
      </div>

      <!-- Mostrar formulario de reserva -->
      <ReservationForm v-if="mostrarFormularioReserva" :servicio="servicioSeleccionado" />
    </main>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}
</style>
