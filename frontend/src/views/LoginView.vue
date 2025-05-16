<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../stores/auth'

const router = useRouter()
const name = ref('')
const role = ref('')

const login = () => {
    if (!name.value || !role.value) return

    const user = { name: name.value, role: role.value }
    loginUser(user)

    // Redirigir según rol
    if (role.value === 'admin') {
        router.push('/admin')
    } else if (role.value === 'customer') {
        router.push('/customer')
    } else {
        router.push('/start') // fallback o dashboard
    }
}
</script>


<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form @submit.prevent="login" class="bg-white p-6 rounded shadow w-80">
            <label class="block mb-2">Nombre</label>
            <input v-model="name" class="w-full border mb-4 p-2 rounded" required />

            <label class="block mb-2">Rol</label>
            <select v-model="role" class="w-full border mb-4 p-2 rounded" required>
                <option disabled value="">Seleccione un rol</option>
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="empleado">Empleado</option>
                <option value="customer">Cliente</option>
            </select>

            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Iniciar sesión
            </button>
        </form>
    </div>
</template>
