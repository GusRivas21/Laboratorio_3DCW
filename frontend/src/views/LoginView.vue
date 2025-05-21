<template>
    <!--
    Este es el componente de inicio de sesión
    que permite a los usuarios ingresar su correo y contraseña.
    -->
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 class="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Correo" class="w-full mb-4 p-2 border rounded" required />
            <input v-model="password" type="password" placeholder="Contraseña" class="w-full mb-4 p-2 border rounded" required />
            <button type="submit" class="w-full bg-black text-white py-2 rounded hover:opacity-90">Entrar</button>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
    // Simulación de usuarios
    const admin = {
        token: '123',
        role: 'admin',
        name: 'Administrador Juan',
        email: 'admin@admin.com'
    }

    const cliente = {
        token: '456',
        role: 'cliente',
        name: 'Carlos Cliente',
        email: 'cliente@cliente.com'
    }

    const user = email.value.includes('admin') ? admin : cliente
    // Simulación de autenticación
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/inicio').then(() => {
        window.location.reload() // Fuerza la recarga para que el perfil lea el nuevo usuario
    })
}
</script>
