<script setup>
import { ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/solid'

const user = JSON.parse(localStorage.getItem('user') || 'null')
const menuVisible = ref(false)
const mobileMenu = ref(false)

const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
}

const toggleMobileMenu = () => {
    mobileMenu.value = !mobileMenu.value
}

const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
}
</script>

<template>
    <nav class="relative flex items-center justify-between bg-black px-5 py-4 text-white w-full box-border">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
            <a v-if="!mobileMenu" href="/inicio" class="bg-black hidden md:block">
                <img src="./img/logoRes.jpeg" alt="Logo de la aplicación" class="w-20 h-auto" />
            </a>

        <!-- Botón hamburguesa (solo en móviles) -->
            <button class="md:hidden flex flex-col justify-center items-center" @click="toggleMobileMenu">
                <span class="block w-6 h-0.5 bg-white mb-1"></span>
                <span class="block w-6 h-0.5 bg-white mb-1"></span>
                <span class="block w-6 h-0.5 bg-white"></span>
            </button>
        </div>

        <!-- Enlaces -->
        <ul class="hidden md:flex gap-5 list-none p-0 m-0">
            <li><router-link to="/inicio" class="text-white font-bold hover:underline">Inicio</router-link></li>
            <li><router-link :to="{ name: 'servicios' }" class="text-white font-bold hover:underline">Servicios</router-link></li>
            <li><router-link :to="{ name: 'form'}" class="text-white font-bold hover:underline">Formulario</router-link></li>
            <li><router-link :to="{ name: 'sobre' }" class="text-white font-bold hover:underline">Sobre Nosotros</router-link></li>
        </ul>

        <!-- Menú móvil -->
        <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
            <ul
                v-if="mobileMenu"
                class="absolute top-full left-0 w-full bg-black flex flex-col gap-2 py-4 md:hidden z-50">
                <!-- ...enlaces... -->
                    <li><router-link to="/inicio" class="text-white font-bold hover:underline px-5 py-2 block">Inicio</router-link></li>
                    <li><router-link :to="{ name: 'servicios' }" class="text-white font-bold hover:underline px-5 py-2 block">Servicios</router-link></li>
                    <li><router-link :to="{ name: 'form'}" class="text-white font-bold hover:underline px-5 py-2 block">Formulario</router-link></li>
                    <li><router-link :to="{ name: 'sobre' }" class="text-white font-bold hover:underline px-5 py-2 block">Sobre Nosotros</router-link></li>
            </ul>
        </Transition>

        <!-- Ícono de usuario / menú -->
        <div class="relative ml-4">
        <!-- Si NO está logueado -->
        <router-link v-if="!user" :to="{ name: 'login' }" class="hover:opacity-80">
            <UserIcon class="w-6 h-6 text-white" />
        </router-link>

        <!-- Si está logueado -->
        <div v-else class="relative">
            <button @click="toggleMenu" class="hover:opacity-80 flex items-center gap-2">
            <UserIcon class="w-6 h-6 text-white" />
            <span class="text-sm">{{ user.role }}</span>
            </button>

            <!-- Menú desplegable -->
            <div v-if="menuVisible" class="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40 z-50">
            <ul class="py-2">
                <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <router-link to="/perfil">Mi Perfil</router-link>
                </li>
                <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="logout">
                Cerrar sesión
                </li>
            </ul>
            </div>
        </div>
        </div>
    </nav>
</template>
