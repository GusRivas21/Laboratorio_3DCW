<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { UserIcon } from '@heroicons/vue/24/solid'
import router from '../routes/index'

// Hacer user reactivo y sincronizado con localStorage
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
const menuVisible = ref(false)
const mobileMenu = ref(false)

const route = useRoute()

const syncUser = () => {
    user.value = JSON.parse(localStorage.getItem('user') || 'null')
}

// Actualiza user cuando cambie localStorage (en esta pestaña)
watchEffect(() => {
    user.value = JSON.parse(localStorage.getItem('user') || 'null')
})

// Escucha cambios de localStorage en otras pestañas y en la misma
const handleStorage = (e) => {
    if (e.key === 'user') {
        user.value = JSON.parse(localStorage.getItem('user') || 'null')
    }
}
onMounted(() => {
    window.addEventListener('storage', handleStorage)
    // Escucha cambios manuales en la misma pestaña
    window.addEventListener('user-updated', syncUser)
})
onBeforeUnmount(() => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener('user-updated', syncUser)
})

const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
}
const toggleMobileMenu = () => {
    mobileMenu.value = !mobileMenu.value
}
// Cuando se hace login/logout, dispara un evento para forzar actualización en todos los componentes
const syncUserAndNotify = () => {
    syncUser()
    window.dispatchEvent(new Event('user-updated'))
}

const logout = () => {
    localStorage.removeItem('user')
    menuVisible.value = false
    mobileMenu.value = false
    syncUserAndNotify()
    window.location.href = '/login' // Forzar recarga total
}
</script>

<template>
    <nav class="relative bg-gradient-to-r from-black via-red-900 to-black text-white px-6 py-5 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <a class="flex items-center gap-2">
            <img src="./img/logoRes.jpeg" alt="Logo de la aplicación" class="w-14 h-14 rounded-full shadow-md" />
            <span class="font-bold text-xl tracking-widest hidden sm:inline">GUS GU'S</span>
        </a>

        <!-- Menú escritorio -->
        <ul class="hidden md:flex gap-8 font-semibold text-lg">
            <li v-if="route.name !== 'inicio'">
                <router-link to="/inicio" class="hover:text-red-100 transition">Inicio</router-link>
            </li>
            <li v-if="route.name !== 'servicios'">
                <router-link :to="{ name: 'servicios' }" class="hover:text-red-100 transition">Servicios</router-link>
            </li>
            <li v-if="route.name !== 'form'">
                <router-link :to="{ name: 'form'}" class="hover:text-red-100 transition">Formulario</router-link>
            </li>
            <li v-if="route.name !== 'sobre'">
                <router-link :to="{ name: 'sobre' }" class="hover:text-red-100 transition">Sobre Nosotros</router-link>
            </li>
            <!-- Opciones para admin -->
            <li v-if="user && user.role === 'admin' && route.name !== 'admin'">
                <router-link :to="{ name: 'admin' }" class="hover:text-red-100 transition">Panel Admin</router-link>
            </li>
        </ul>

        <!-- Usuario / Login -->
        <div class="flex items-center gap-2">
            <router-link v-if="!user" :to="{ name: 'login' }" class="hover:opacity-80">
            <UserIcon class="w-7 h-7 text-white" />
            </router-link>
            <div v-else class="relative">
            <button @click="toggleMenu" class="hover:opacity-80 flex items-center gap-2">
                <UserIcon class="w-7 h-7 text-white" />
                <span class="text-sm hidden sm:inline">{{ user.role }}</span>
            </button>
            <!-- Menú desplegable usuario -->
            <div v-if="menuVisible" class="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul class="py-2">
                <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <router-link :to="{ name: 'perfil' }" class="block w-full h-full">Mi Perfil</router-link>
                </li>

                <!-- En dudar si dejar este o dejar el otro-->
                <!-- Funciones específicas para admin
                <li v-if="user && user.role === 'admin'" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <router-link :to="{ name: 'admin' }">Panel Admin</router-link>
                </li>
                <li v-if="user && user.role === 'admin'" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <router-link :to="{ name: 'servicios' }">Gestionar Menú</router-link>
                </li> -->
                <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="logout">
                    Cerrar sesión
                </li>
                </ul>
            </div>
            </div>
            <!-- Botón hamburguesa solo en móvil -->
            <button class="md:hidden ml-2 flex flex-col justify-center items-center" @click="toggleMobileMenu">
            <span class="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span class="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span class="block w-7 h-0.5 bg-white rounded"></span>
            </button>
        </div>
        </div>

        <!-- Menú móvil full screen -->
        <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-8"
        >
        <div
            v-if="mobileMenu"
            class="fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 z-50 md:hidden"
            @click.self="toggleMobileMenu"
        >
            <button class="absolute top-6 right-6 text-white text-3xl" @click="toggleMobileMenu">&times;</button>
            <router-link to="/inicio" class="text-2xl font-bold hover:text-red-100" @click="toggleMobileMenu">Inicio</router-link>
            <router-link :to="{ name: 'servicios' }" class="text-2xl font-bold hover:text-red-100" @click="toggleMobileMenu">Servicios</router-link>
            <router-link :to="{ name: 'form'}" class="text-2xl font-bold hover:text-red-100" @click="toggleMobileMenu">Formulario</router-link>
            <router-link :to="{ name: 'sobre' }" class="text-2xl font-bold hover:text-red-100" @click="toggleMobileMenu">Sobre Nosotros</router-link>
            <router-link v-if="user && user.role === 'admin' && route.name !== 'admin'" :to="{ name: 'admin' }" class="text-2xl font-bold hover:text-red-100" @click="toggleMobileMenu">Panel Admin</router-link>
            <div class="mt-8">
            <router-link v-if="!user" :to="{ name: 'login' }" class="text-lg hover:text-red-100" @click="toggleMobileMenu">
                Iniciar sesión
            </router-link>
            <button v-else class="text-lg hover:text-red-100" @click="logout">
                Cerrar sesión
            </button>
            </div>
        </div>
        </Transition>
    </nav>
</template>