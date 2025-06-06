<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([])
const loading = ref(true)
const error = ref('')
const usuarioEditando = ref(null)
const usuarioForm = ref({ name: '', email: '', role: '' })
const usuarioError = ref('')

const fetchUsuarios = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
        if (!res.ok) throw new Error('Error al cargar los usuarios.')
        usuarios.value = await res.json()
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

const eliminarUser = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Error al eliminar usuario')
        await fetchUsuarios()
    } catch (err) {
        alert('Error al eliminar usuario')
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex pt-24">
        <aside class="w-64 bg-red-900 text-white flex flex-col py-8 px-4 shadow-lg">
            <h1 class="text-2xl font-bold mb-8 text-center">Panel Admin</h1>
            <nav class="flex-1 flex flex-col gap-4">
                <router-link to="/admin" class="py-2 px-4 rounded hover:bg-red-700 transition">Pedidos y Reservas</router-link>
                <router-link to="/servicios" class="py-2 px-4 rounded hover:bg-red-700 transition">Gestionar Menú</router-link>
                <router-link to="/admin/usuarios" class="py-2 px-4 rounded hover:bg-red-700 transition bg-red-700">Usuarios</router-link>
            </nav>
        </aside>
        <main class="flex-1 p-8">
            <h2 class="text-3xl font-bold text-red-900 mb-6">Usuarios Registrados</h2>
            <div class="bg-white rounded-xl shadow-lg p-6 min-h-[300px]">
                <div v-if="loading" class="text-gray-500">Cargando...</div>
                <div v-else-if="error" class="text-red-600">{{ error }}</div>
                <table v-else class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-red-100">
                            <th class="py-2 px-3">Nombre</th>
                            <th class="py-2 px-3">Correo</th>
                            <th class="py-2 px-3">Rol</th>
                            <th class="py-2 px-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usuarios" :key="user._id" class="border-b hover:bg-red-50">
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
                                <td class="py-2 px-3 flex gap-2">
                                    <button @click="guardarEditUser(user._id)" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Guardar</button>
                                    <button @click="cancelarEditUser" class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancelar</button>
                                </td>
                            </template>
                            <template v-else>
                                <td class="py-2 px-3 font-semibold">{{ user.name }}</td>
                                <td class="py-2 px-3">{{ user.email }}</td>
                                <td class="py-2 px-3 capitalize">{{ user.role }}</td>
                                <td class="py-2 px-3 flex gap-2">
                                    <button @click="startEditUser(user)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                                    <button @click="eliminarUser(user._id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Eliminar</button>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
                <div v-if="usuarioError" class="text-red-600 mt-2">{{ usuarioError }}</div>
            </div>
        </main>
    </div>
</template>
