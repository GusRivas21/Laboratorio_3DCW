<script setup>
import { ref, onMounted } from 'vue'

// Simulación de datos de pedidos y reservaciones
const pedidos = ref([])
const loading = ref(true)
const error = ref('')

// Simula la obtención de datos desde el backend
const fetchPedidos = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch('http://localhost:5001/api/orders')
        if (!res.ok) throw new Error('Error al cargar los pedidos y reservaciones.')
        pedidos.value = await res.json()
    } catch (err) {
        error.value = 'Error al cargar los pedidos y reservaciones.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchPedidos()
})
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex">
        <!-- Panel lateral -->
        <aside class="w-64 bg-red-900 text-white flex flex-col py-8 px-4 shadow-lg">
        <h1 class="text-2xl font-bold mb-8 text-center">Panel Admin</h1>
        <nav class="flex-1 flex flex-col gap-4">
            <router-link to="/admin" class="py-2 px-4 rounded hover:bg-red-700 transition">Pedidos y Reservas</router-link>
            <router-link to="/servicios" class="py-2 px-4 rounded hover:bg-red-700 transition">Gestionar Menú</router-link>
        </nav>
        </aside>
        <!-- Contenido principal -->
        <main class="flex-1 p-8">
        <h2 class="text-3xl font-bold text-red-900 mb-6">Pedidos y Reservas</h2>
        <div class="bg-white rounded-xl shadow-lg p-6 min-h-[300px]">
            <div v-if="loading" class="text-gray-500">Cargando...</div>
            <div v-else-if="error" class="text-red-600">{{ error }}</div>
            <table v-else class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-red-100">
                <th class="py-2 px-3">Tipo</th>
                <th class="py-2 px-3">Nombre</th>
                <th class="py-2 px-3">Detalle</th>
                <th class="py-2 px-3">Fecha</th>
                <th class="py-2 px-3">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pedidos" :key="item.id" class="border-b hover:bg-red-50">
                <td class="py-2 px-3 font-semibold">{{ item.tipo }}</td>
                <td class="py-2 px-3">{{ item.nombre }}</td>
                <td class="py-2 px-3">{{ item.detalle }}</td>
                <td class="py-2 px-3">{{ item.fecha }}</td>
                <td class="py-2 px-3">{{ item.estado }}</td>
                </tr>
            </tbody>
            </table>
        </div>
        </main>
    </div>
</template>