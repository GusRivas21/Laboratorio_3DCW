<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/composables/useCart' // <-- Agrega esto

const { addToCart } = useCart() // <-- Agrega esto

const route = useRoute()

// --- ESTADO Y CATEGORÍAS ---
const categorias = ref(['comida', 'cocteleria', 'reservaciones'])
const categoriaSeleccionada = ref(categorias.value[0])
const servicios = ref([])
const loading = ref(false)
const error = ref('')

// --- PAGINACIÓN ---
const pagina = ref(1)
const porPagina = 4
const totalPaginas = ref(1)

// Obtener servicios por categoría
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

// Servicios a mostrar en la página actual
const serviciosPagina = () => {
  const start = (pagina.value - 1) * porPagina
  return servicios.value.slice(start, start + porPagina)
}

// --- CICLO DE VIDA ---
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
    <div class="w-full flex justify-center gap-4 py-4 bg-gradient-to-r from-black via-red-900 to-black">
      <button
        v-for="cat in categorias"
        :key="cat"
        @click="seleccionarCategoria(cat)"
        :class=" [
          'py-2 px-6 rounded-full font-bold transition',
          categoriaSeleccionada === cat
            ? 'bg-red-700 text-white shadow'
            : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
        ]"
      >
        {{ cat.replace(/-/g, ' ') }}
      </button>
    </div>
    <!-- Contenido principal -->
    <main class="flex-1 p-2 md:p-8 max-w-7xl mx-auto w-full">
      <h2 class="text-3xl font-bold text-red-900 mb-6 capitalize text-center">
        {{ categoriaSeleccionada.replace(/-/g, ' ') }}
      </h2>
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6 min-h-[300px]">
        <div v-if="loading" class="text-gray-500">Cargando...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div
              v-for="servicio in serviciosPagina()"
              :key="servicio._id"
              class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
            >
              <img :src="servicio.imagen" :alt="servicio.nombre" class="w-full h-32 object-cover rounded mb-3" />
              <h3 class="font-bold text-lg text-red-700 mb-1">{{ servicio.nombre }}</h3>
              <p class="text-gray-700 text-sm mb-2 text-center">{{ servicio.descripcion }}</p>
              <p v-if="servicio.precio" class="text-green-700 font-bold mb-2 text-center">{{ servicio.precio }}</p>
              <button
                v-if="categoriaSeleccionada !== 'reservaciones'"
                class="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition"
                @click="addToCart(servicio)"
              >
                Agregar al carrito
              </button>
              <button
                v-else
                class="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition"
                disabled
              >
                Reservar
              </button>
            </div>
          </div>
          <!-- Paginación -->
          <div v-if="totalPaginas > 1" class="flex justify-center mt-8 gap-2">
            <button
              :disabled="pagina === 1"
              @click="pagina--"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >Anterior</button>
            <span class="px-4 py-1 font-bold">{{ pagina }} / {{ totalPaginas }}</span>
            <button
              :disabled="pagina === totalPaginas"
              @click="pagina++"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >Siguiente</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>