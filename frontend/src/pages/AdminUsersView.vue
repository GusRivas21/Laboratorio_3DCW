<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([])
const loading = ref(true)
const error = ref('')

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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usuarios" :key="user._id" class="border-b hover:bg-red-50">
                            <td class="py-2 px-3 font-semibold">{{ user.name }}</td>
                            <td class="py-2 px-3">{{ user.email }}</td>
                            <td class="py-2 px-3 capitalize">{{ user.role }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>
