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

    // --- Lógica para ocultar header al hacer scroll hacia abajo y mostrarlo al subir ---
    const showHeader = ref(true)
    let lastScrollY = window.scrollY

    const handleScrollHeader = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Bajando y no está arriba del todo
        showHeader.value = false
    } else {
        // Subiendo
        showHeader.value = true
    }
    lastScrollY = currentScrollY
    }

    onMounted(() => {
    window.addEventListener('scroll', handleScrollHeader)
    })
    onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScrollHeader)
    })
</script>

<template>
    <nav
        class="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-red-900 to-black text-white px-4 md:px-6 py-3 md:py-5 shadow-lg transition-transform duration-300"
        :style="{ transform: showHeader ? 'translateY(0)' : 'translateY(-120%)' }"
    >
        <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <a class="flex items-center gap-2">
            <img src="./img/logoRes.jpeg" alt="Logo de la aplicación" class="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md" />
            <span class="font-bold text-xl tracking-widest hidden sm:inline">GUS GU'S</span>
        </a>

        <!-- Menú escritorio -->
        <ul class="hidden md:flex gap-6 md:gap-8 font-semibold text-lg">
            <li>
                <router-link to="/inicio" class="hover:text-red-100 transition relative group"
                    :class="{ 'text-red-300': route.name === 'inicio' }">
                    Inicio
                    <span v-if="route.name === 'inicio'" class="absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                    <span v-else class="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'servicios' }" class="hover:text-red-100 transition relative group"
                    :class="{ 'text-red-300': route.name === 'servicios' }">
                    Servicios
                    <span v-if="route.name === 'servicios'" class="absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                    <span v-else class="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'form'}" class="hover:text-red-100 transition relative group"
                    :class="{ 'text-red-300': route.name === 'form' }">
                    Formulario
                    <span v-if="route.name === 'form'" class="absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                    <span v-else class="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                </router-link>
            </li>
            <!-- Opciones para admin -->
            <li v-if="user && user.role === 'admin'">
                <router-link :to="{ name: 'admin' }" class="hover:text-red-100 transition relative group"
                    :class="{ 'text-red-300': route.name === 'admin' }">
                    Panel Admin
                    <span v-if="route.name === 'admin'" class="absolute left-0 -bottom-1 w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                    <span v-else class="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-red-400 rounded transition-all duration-300"></span>
                </router-link>
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
                <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="logout">
                    Cerrar sesión
                </li>
                </ul>
            </div>
            </div>
            <!-- Botón hamburguesa solo en móvil -->
            <button class="md:hidden ml-2 flex flex-col justify-center items-center" @click="toggleMobileMenu" aria-label="Abrir menú">
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
            class="fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 z-[999] md:hidden overflow-y-auto min-h-screen"
            @click.self="toggleMobileMenu"
        >
            <button class="absolute top-6 right-6 text-white text-3xl z-50" @click="toggleMobileMenu" aria-label="Cerrar menú">&times;</button>
            <router-link to="/inicio" class="text-2xl font-bold hover:text-red-100 mt-4 relative group"
                :class="{ 'text-red-300': route.name === 'inicio' }" @click="toggleMobileMenu">
                Inicio
                <span v-if="route.name === 'inicio'" class="block mx-auto mt-1 h-0.5 w-2/3 bg-red-400 rounded transition-all duration-300"></span>
                <span v-else class="block mx-auto mt-1 h-0.5 w-0 group-hover:w-2/3 bg-red-400 rounded transition-all duration-300"></span>
            </router-link>
            <router-link :to="{ name: 'servicios' }" class="text-2xl font-bold hover:text-red-100 relative group"
                :class="{ 'text-red-300': route.name === 'servicios' }" @click="toggleMobileMenu">
                Servicios
                <span v-if="route.name === 'servicios'" class="block mx-auto mt-1 h-0.5 w-2/3 bg-red-400 rounded transition-all duration-300"></span>
                <span v-else class="block mx-auto mt-1 h-0.5 w-0 group-hover:w-2/3 bg-red-400 rounded transition-all duration-300"></span>
            </router-link>
            <router-link :to="{ name: 'form'}" class="text-2xl font-bold hover:text-red-100 relative group"
                :class="{ 'text-red-300': route.name === 'form' }" @click="toggleMobileMenu">
                Formulario
                <span v-if="route.name === 'form'" class="block mx-auto mt-1 h-0.5 w-2/3 bg-red-400 rounded transition-all duration-300"></span>
                <span v-else class="block mx-auto mt-1 h-0.5 w-0 group-hover:w-2/3 bg-red-400 rounded transition-all duration-300"></span>
            </router-link>
            <router-link v-if="user && user.role === 'admin'" :to="{ name: 'admin' }" class="text-2xl font-bold hover:text-red-100 relative group"
                :class="{ 'text-red-300': route.name === 'admin' }" @click="toggleMobileMenu">
                Panel Admin
                <span v-if="route.name === 'admin'" class="block mx-auto mt-1 h-0.5 w-2/3 bg-red-400 rounded transition-all duration-300"></span>
                <span v-else class="block mx-auto mt-1 h-0.5 w-0 group-hover:w-2/3 bg-red-400 rounded transition-all duration-300"></span>
            </router-link>
            <div class="mt-8 mb-4">
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