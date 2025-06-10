<script setup>
import { ref, onMounted } from 'vue'

const categorias = ref(['comida', 'cocteleria', 'reservaciones'])
const categoriaSeleccionada = ref(categorias.value[0])
const productos = ref([])
const loading = ref(false)
const error = ref('')

// Paginación
const pagina = ref(1)
const porPagina = 4
const totalPaginas = ref(1)

// Obtener productos por categoría seleccionada
const fetchProductos = async () => {
  if (!categoriaSeleccionada.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services?categoria=${categoriaSeleccionada.value}`)
    if (!res.ok) throw new Error('Error al cargar productos')
    const data = await res.json()
    productos.value = data
    totalPaginas.value = Math.ceil(data.length / porPagina)
    pagina.value = 1
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Cambiar de categoría
const seleccionarCategoria = (cat) => {
  categoriaSeleccionada.value = cat
  fetchProductos()
}

// Productos a mostrar en la página actual
const productosPagina = () => {
  const start = (pagina.value - 1) * porPagina
  return productos.value.slice(start, start + porPagina)
}

onMounted(async () => {
  await fetchProductos()
})
</script>

<template>
  <section class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Barra superior de categorías -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          v-for="cat in categorias"
          :key="cat"
          @click="seleccionarCategoria(cat)"
          :class="[
            'px-6 py-2 rounded-full font-bold transition',
            categoriaSeleccionada === cat
              ? 'bg-red-700 text-white shadow'
              : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
          ]"
        >
          {{ cat.replace(/-/g, ' ') }}
        </button>
      </div>
      <h2 class="text-center text-3xl font-bold text-red-900 mb-8 capitalize">
        {{ categoriaSeleccionada.replace(/-/g, ' ') }}
      </h2>
      <div v-if="loading" class="text-center text-gray-500 py-10">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-600 py-10">{{ error }}</div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="producto in productosPagina()" :key="producto._id" class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
            <img :src="producto.imagen" :alt="producto.nombre" class="w-full h-32 object-cover rounded mb-3" />
            <h3 class="font-bold text-lg text-red-700 mb-1">{{ producto.nombre }}</h3>
            <p class="text-gray-700 text-sm mb-2 text-center">{{ producto.descripcion }}</p>
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
  </section>
</template>