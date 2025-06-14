<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const usuarios = ref([])
const loading = ref(true)
const error = ref('')
const usuarioEditando = ref(null)
const usuarioForm = ref({ name: '', email: '', role: '' })
const usuarioError = ref('')

// Paginación
const currentPage = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(usuarios.value.length / pageSize))
const paginatedUsuarios = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return usuarios.value.slice(start, start + pageSize)
})

const fetchUsuarios = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    if (!res.ok) throw new Error('Error al cargar los usuarios.')
    usuarios.value = await res.json()
    // Reinicia a la primera página si cambia la cantidad de usuarios
    //currentPage.value = 1
  } catch (err) {
    error.value = 'Error al cargar los usuarios.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsuarios()
})

const startEditUser = (user) => {
  usuarioEditando.value = user._id
  usuarioForm.value = { name: user.name, email: user.email, role: user.role }
  usuarioError.value = ''
}

const cancelarEditUser = () => {
  usuarioEditando.value = null
  usuarioForm.value = { name: '', email: '', role: '' }
  usuarioError.value = ''
}

const guardarEditUser = async (id) => {
  usuarioError.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioForm.value)
    })
    if (!res.ok) throw new Error('Error al editar usuario')
    await fetchUsuarios()
    cancelarEditUser()
  } catch (err) {
    usuarioError.value = err.message
  }
}

const showConfirm = ref(false)
const userToDelete = ref(null)

function askRemoveUser(user) {
  userToDelete.value = user
  showConfirm.value = true
}
function confirmRemoveUser() {
  eliminarUser(userToDelete.value._id)
  showConfirm.value = false
  userToDelete.value = null
}
function cancelRemoveUser() {
  showConfirm.value = false
  userToDelete.value = null
}

const eliminarUser = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar usuario')
    await fetchUsuarios()
    toast.success('Usuario eliminado correctamente')
  } catch (err) {
    toast.error('Error al eliminar usuario')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 flex flex-col md:flex-row">
    <aside class="w-full md:w-64 md:max-w-xs text-white flex flex-row md:flex-col py-2 md:py-8 px-2 md:px-4 shadow-lg min-h-[56px] md:min-h-screen
      bg-gradient-to-r from-black via-red-900 to-black md:bg-gradient-to-b md:from-black md:via-red-900 md:to-black
      border-b-2 md:border-b-0 md:border-r-2 border-black z-20 overflow-x-auto"> <!--md:pt-30-->
      <nav class="flex-1 flex flex-row md:flex-col gap-2 md:gap-4 justify-center md:justify-start w-full pt-24">
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
    <main class="flex-1 p-2 md:p-8 overflow-x-auto pt-20">
      <h2 class="text-3xl font-bold text-red-900 mb-6 pt-18">Usuarios Registrados</h2>
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6 min-h-[300px]">
        <div v-if="loading" class="text-gray-500">Cargando...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <!-- Tabla responsiva -->
        <div class="w-full overflow-x-auto">
          <table class="w-full min-w-[600px] text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr class="bg-red-100">
                <th class="py-2 px-3 whitespace-nowrap">Nombre</th>
                <th class="py-2 px-3 whitespace-nowrap">Correo</th>
                <th class="py-2 px-3 whitespace-nowrap">Rol</th>
                <th class="py-2 px-3 whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsuarios" :key="user._id" class="border-b hover:bg-red-50">
                <template v-if="usuarioEditando === user._id">
                  <td class="py-2 px-3">
                    <input v-model="usuarioForm.name" class="border rounded px-2 py-1 w-full" />
                  </td>
                  <td class="py-2 px-3">
                    <input v-model="usuarioForm.email" class="border rounded px-2 py-1 w-full" />
                  </td>
                  <td class="py-2 px-3">
                    <select v-model="usuarioForm.role" class="border rounded px-2 py-1 w-full">
                      <option value="admin">admin</option>
                      <option value="cliente">cliente</option>
                    </select>
                  </td>
                  <td class="py-2 px-3 flex gap-2 flex-wrap">
                    <button @click="guardarEditUser(user._id)"
                      class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Guardar
                    </button>
                    <button @click="cancelarEditUser"
                      class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
                      Cancelar
                    </button>
                  </td>
                </template>
                <template v-else>
                  <td class="py-2 px-3 font-semibold">{{ user.name }}</td>
                  <td class="py-2 px-3 break-all">{{ user.email }}</td>
                  <td class="py-2 px-3 capitalize">{{ user.role }}</td>
                  <td class="py-2 px-3 flex gap-2 flex-wrap">
                    <button @click="startEditUser(user)"
                      class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Editar
                    </button>
                    <button @click="askRemoveUser(user)"
                      class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Eliminar
                    </button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Controles de paginación -->
        <div class="flex justify-center items-center gap-2 mt-4" v-if="totalPages > 1">
          <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === 1"
            @click="currentPage--">
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === totalPages"
            @click="currentPage++">
            Siguiente
          </button>
        </div>
        <div v-if="usuarioError" class="text-red-600 mt-2">{{ usuarioError }}</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 80px;
  height: auto;
}
</style>
