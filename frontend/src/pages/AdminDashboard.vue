<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'

// Simulación de datos de pedidos y reservaciones
const pedidos = ref([])
const loading = ref(true)
const error = ref('')

// --- PAGINACIÓN PEDIDOS ---
const pagina = ref(1)
const porPagina = 5
const totalPaginas = ref(1)

// --- USUARIOS ---
const usuarios = ref([])
const loadingUsuarios = ref(true)
const errorUsuarios = ref('')
const paginaUsuarios = ref(1)
const porPaginaUsuarios = 5
const totalPaginasUsuarios = ref(1)

// --- FUNCIONES PRINCIPALES ---
const fetchPedidos = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
    if (!res.ok) throw new Error('Error al cargar los pedidos y reservaciones.')
    pedidos.value = await res.json()
    totalPaginas.value = Math.max(1, Math.ceil(pedidos.value.length / porPagina))
    //pagina.value = 1
  } catch (err) {
    error.value = 'Error al cargar los pedidos y reservaciones.'
  } finally {
    loading.value = false
  }
}

const fetchUsuarios = async () => {
  loadingUsuarios.value = true
  errorUsuarios.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    if (!res.ok) throw new Error('Error al cargar los usuarios.')
    usuarios.value = await res.json()
    totalPaginasUsuarios.value = Math.max(1, Math.ceil(usuarios.value.length / porPaginaUsuarios))
  } catch (err) {
    errorUsuarios.value = 'Error al cargar los usuarios.'
  } finally {
    loadingUsuarios.value = false
  }
}

// --- ESTADO Y FUNCIONES PARA EDICIÓN DE PEDIDOS ---
const pedidoEditando = ref(null)
const pedidoForm = ref({ tipo: '', nombre: '', detalle: '', fecha: '', estado: '' })
const pedidoError = ref('')

const startEditPedido = (pedido) => {
  pedidoEditando.value = pedido._id
  pedidoForm.value = { tipo: pedido.tipo, nombre: pedido.nombre, detalle: pedido.detalle, fecha: pedido.fecha, estado: pedido.estado }
  pedidoError.value = ''
}

const cancelarEditPedido = () => {
  pedidoEditando.value = null
  pedidoForm.value = { tipo: '', nombre: '', detalle: '', fecha: '', estado: '' }
  pedidoError.value = ''
}

const guardarEditPedido = async (id) => {
  pedidoError.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoForm.value)
    })
    if (!res.ok) throw new Error('Error al editar pedido')
    await fetchPedidos()
    cancelarEditPedido()
  } catch (err) {
    pedidoError.value = err.message
  }
}

const toast = useToast()

// --- MODAL DE CONFIRMACIÓN PARA ELIMINAR PEDIDO ---
const showConfirmPedido = ref(false)
const pedidoToDelete = ref(null)

function askRemovePedido(pedido) {
  pedidoToDelete.value = pedido
  showConfirmPedido.value = true
}
function confirmRemovePedido() {
  eliminarPedido(pedidoToDelete.value._id)
  showConfirmPedido.value = false
  pedidoToDelete.value = null
}
function cancelRemovePedido() {
  showConfirmPedido.value = false
  pedidoToDelete.value = null
}

const eliminarPedido = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar pedido')
    await fetchPedidos()
    toast.success('Pedido eliminado correctamente')
  } catch (err) {
    toast.error('Error al eliminar pedido')
  }
}

// --- PAGINACIÓN: FUNCIONES Y DATOS ---
const pedidosPagina = () => {
  const start = (pagina.value - 1) * porPagina
  return pedidos.value.slice(start, start + porPagina)
}
// CAMBIA usuariosPagina a una propiedad computada:
const usuariosPagina = computed(() => {
  const start = (paginaUsuarios.value - 1) * porPaginaUsuarios
  return usuarios.value.slice(start, start + porPaginaUsuarios)
})

// --- CICLO DE VIDA ---
onMounted(() => {
  fetchPedidos()
  fetchUsuarios()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 flex flex-col md:flex-row">
    <!-- Navbar superior -->
    <nav class="navbar w-full flex items-center justify-between bg-black bg-opacity-90 px-4 py-3 shadow-lg z-30 md:fixed md:top-0 md:left-0 md:right-0 md:z-40">
      <div class="flex items-center gap-3 logo-container">
        <img src="/src/assets/logo.svg" alt="Logo" class="logo" />
        <span class="font-bold text-lg text-white tracking-widest">ADMIN</span>
      </div>
    </nav>
    <!-- Barra lateral: horizontal en móvil, vertical en desktop -->
    <aside class="w-full md:w-64 md:max-w-xs text-white flex flex-row md:flex-col py-2 md:py-8 px-2 md:px-4 shadow-lg min-h-[56px] md:min-h-screen
      bg-gradient-to-r from-black via-red-900 to-black md:bg-gradient-to-b md:from-black md:via-red-900 md:to-black
      border-b-2 md:border-b-0 md:border-r-2 border-black z-20 overflow-x-auto md:pt-30">
      <nav class="flex-1 flex flex-row md:flex-col gap-2 md:gap-4 justify-center md:justify-start w-full">
        <router-link to="/admin" class="py-2 px-4 rounded hover:bg-red-700 transition whitespace-nowrap"
          :class="{ 'bg-red-700': $route.path === '/admin' }">
          Pedidos y Reservas
        </router-link>
        <router-link to="/admin/usuarios"
          class="py-2 px-4 rounded hover:bg-red-700 transition whitespace-nowrap"
          :class="{ 'bg-red-700': $route.path === '/admin/usuarios' }">
          Usuarios
        </router-link>
      </nav>
    </aside>
    <!-- Contenido principal -->
    <main class="flex-1 p-2 md:p-8 overflow-x-auto pt-24">
      <!-- Pedidos y Reservas -->
      <template v-if="$route.path === '/admin'">
        <h2 class="text-3xl font-bold text-red-900 mb-6 pt-24">Pedidos y Reservas</h2>
        <div class="bg-white rounded-xl shadow-lg p-2 md:p-6 min-h-[300px]">
          <div v-if="loading" class="text-gray-500">Cargando...</div>
          <div v-else-if="error" class="text-red-600">{{ error }}</div>
          <!-- Tabla responsiva -->
          <div class="w-full overflow-x-auto">
            <table class="w-full min-w-[700px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr class="bg-red-100">
                  <th class="py-2 px-3 whitespace-nowrap">Tipo</th>
                  <th class="py-2 px-3 whitespace-nowrap">Nombre</th>
                  <th class="py-2 px-3 whitespace-nowrap">Detalle</th>
                  <th class="py-2 px-3 whitespace-nowrap">Fecha</th>
                  <th class="py-2 px-3 whitespace-nowrap">Estado</th>
                  <th class="py-2 px-3 whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in pedidosPagina()" :key="item._id" class="border-b hover:bg-red-50">
                  <template v-if="pedidoEditando === item._id">
                    <td class="py-2 px-3">
                      <select v-model="pedidoForm.tipo" class="border rounded px-2 py-1 w-full">
                        <option value="Pedido">Pedido</option>
                        <option value="Reserva">Reserva</option>
                      </select>
                    </td>
                    <td class="py-2 px-3">
                      <input v-model="pedidoForm.nombre" class="border rounded px-2 py-1 w-full" />
                    </td>
                    <td class="py-2 px-3">
                      <input v-model="pedidoForm.detalle" class="border rounded px-2 py-1 w-full" />
                    </td>
                    <td class="py-2 px-3">
                      <input v-model="pedidoForm.fecha" class="border rounded px-2 py-1 w-full" />
                    </td>
                    <td class="py-2 px-3">
                      <select v-model="pedidoForm.estado" class="border rounded px-2 py-1 w-full">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td class="py-2 px-3 flex gap-2">
                      <button @click="guardarEditPedido(item._id)"
                        class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Guardar</button>
                      <button @click="cancelarEditPedido"
                        class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancelar</button>
                    </td>
                  </template>
                  <template v-else>
                    <td class="py-2 px-3 font-semibold">{{ item.tipo }}</td>
                    <td class="py-2 px-3">{{ item.nombre }}</td>
                    <td class="py-2 px-3">{{ item.detalle }}</td>
                    <td class="py-2 px-3">{{ item.fecha }}</td>
                    <td class="py-2 px-3">{{ item.estado }}</td>
                    <td class="py-2 px-3 flex gap-2">
                      <button @click="startEditPedido(item)"
                        class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                      <button @click="askRemovePedido(item)"
                        class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Eliminar</button>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Paginación Pedidos -->
          <div v-if="totalPaginas > 1" class="flex justify-center mt-8 gap-2">
            <button :disabled="pagina === 1" @click="pagina--"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Anterior</button>
            <span class="px-4 py-1 font-bold">{{ pagina }} / {{ totalPaginas }}</span>
            <button :disabled="pagina === totalPaginas" @click="pagina++"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Siguiente</button>
          </div>
          <div v-if="pedidoError" class="text-red-600 mt-2">{{ pedidoError }}</div>
        </div>
      </template>
      <!-- Usuarios registrados SOLO si ruta es /admin/usuarios -->
      <template v-if="$route.path === '/admin/usuarios'">
        <h2 class="text-3xl font-bold text-red-900 mb-6">Usuarios Registrados</h2>
        <div class="bg-white rounded-xl shadow-lg p-2 md:p-6 min-h-[300px]">
          <div v-if="loadingUsuarios" class="text-gray-500">Cargando...</div>
          <div v-else-if="errorUsuarios" class="text-red-600">{{ errorUsuarios }}</div>
          <div v-else>
            <div class="w-full overflow-x-auto">
              <table class="w-full min-w-[700px] text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr class="bg-red-100">
                    <th class="py-2 px-3 whitespace-nowrap">Nombre</th>
                    <th class="py-2 px-3 whitespace-nowrap">Correo</th>
                    <th class="py-2 px-3 whitespace-nowrap">Rol</th>
                    <th class="py-2 px-3 whitespace-nowrap">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="usuario in usuariosPagina.value" :key="usuario._id" class="border-b hover:bg-red-50">
                    <td class="py-2 px-3">{{ usuario.name }}</td>
                    <td class="py-2 px-3">{{ usuario.email }}</td>
                    <td class="py-2 px-3">{{ usuario.role }}</td>
                    <td class="py-2 px-3 flex gap-2">
                      <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                      <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Paginación Usuarios -->
            <div v-if="totalPaginasUsuarios > 1" class="flex justify-center mt-8 gap-2">
              <button :disabled="paginaUsuarios === 1" @click="paginaUsuarios--"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                Anterior
              </button>
              <span>Página {{ paginaUsuarios }} de {{ totalPaginasUsuarios }}</span>
              <button :disabled="paginaUsuarios === totalPaginasUsuarios" @click="paginaUsuarios++"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                Siguiente
              </button>
            </div>
            <p class="text-xs text-gray-500">
              Total usuarios: {{ usuarios.length }} | Página actual: {{ paginaUsuarios }} | Total páginas: {{
              totalPaginasUsuarios }}
            </p>
          </div>
        </div>
      </template>
    </main>

    <!-- Modal de confirmación para eliminar pedido -->
    <div v-if="showConfirmPedido" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-80 max-w-full text-center">
        <h4 class="text-lg font-bold mb-4 text-red-700">¿Seguro que deseas eliminar este pedido?</h4>
        <div class="flex justify-center gap-4 mt-2">
          <button @click="confirmRemovePedido" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sí, eliminar</button>
          <button @click="cancelRemovePedido" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>