<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref, onMounted } from 'vue'

// Simulación de datos de pedidos y reservaciones
const pedidos = ref([])
const loading = ref(true)
const error = ref('')

// --- FUNCIONES PRINCIPALES ---
// Obtiene los pedidos y reservas del backend
const fetchPedidos = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`)
        if (!res.ok) throw new Error('Error al cargar los pedidos y reservaciones.')
        pedidos.value = await res.json()
    } catch (err) {
        error.value = 'Error al cargar los pedidos y reservaciones.'
    } finally {
        loading.value = false
    }
}

// --- ESTADO Y FUNCIONES PARA EDICIÓN DE PEDIDOS ---
const pedidoEditando = ref(null) // ID del pedido que se está editando
const pedidoForm = ref({ tipo: '', nombre: '', detalle: '', fecha: '', estado: '' }) // Formulario reactivo para edición
const pedidoError = ref('') // Mensaje de error en edición

// Inicia la edición de un pedido
const startEditPedido = (pedido) => {
    pedidoEditando.value = pedido._id
    pedidoForm.value = { tipo: pedido.tipo, nombre: pedido.nombre, detalle: pedido.detalle, fecha: pedido.fecha, estado: pedido.estado }
    pedidoError.value = ''
}

// Cancela la edición de un pedido
const cancelarEditPedido = () => {
    pedidoEditando.value = null
    pedidoForm.value = { tipo: '', nombre: '', detalle: '', fecha: '', estado: '' }
    pedidoError.value = ''
}

// Guarda los cambios de un pedido editado
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

// Elimina un pedido del backend
const eliminarPedido = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este pedido?')) return
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Error al eliminar pedido')
        await fetchPedidos()
    } catch (err) {
        alert('Error al eliminar pedido')
    }
}

// --- CICLO DE VIDA ---
// Al montar el componente, carga los pedidos
onMounted(() => {
    fetchPedidos()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200 flex pt-24">
        <aside class="w-64 bg-gradient-to-b from-black via-red-900 to-black text-white flex flex-col py-8 px-4 shadow-lg">
            <h1 class="text-2xl font-bold mb-8 text-center">Panel Admin</h1>
            <nav class="flex-1 flex flex-col gap-4">
                <router-link to="/admin" class="py-2 px-4 rounded hover:bg-red-700 transition">Pedidos y Reservas</router-link>
                <router-link to="/admin/usuarios" class="py-2 px-4 rounded hover:bg-red-700 transition">Usuarios</router-link>
            </nav>
        </aside>
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
                            <th class="py-2 px-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in pedidos" :key="item._id" class="border-b hover:bg-red-50">
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
                                    <button @click="guardarEditPedido(item._id)" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Guardar</button>
                                    <button @click="cancelarEditPedido" class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancelar</button>
                                </td>
                            </template>
                            <template v-else>
                                <td class="py-2 px-3 font-semibold">{{ item.tipo }}</td>
                                <td class="py-2 px-3">{{ item.nombre }}</td>
                                <td class="py-2 px-3">{{ item.detalle }}</td>
                                <td class="py-2 px-3">{{ item.fecha }}</td>
                                <td class="py-2 px-3">{{ item.estado }}</td>
                                <td class="py-2 px-3 flex gap-2">
                                    <button @click="startEditPedido(item)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                                    <button @click="eliminarPedido(item._id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Eliminar</button>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
                <div v-if="pedidoError" class="text-red-600 mt-2">{{ pedidoError }}</div>
            </div>
        </main>
    </div>
</template>