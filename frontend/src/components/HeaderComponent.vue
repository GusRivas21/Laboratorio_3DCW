<script setup>
import { ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/solid'

const user = JSON.parse(localStorage.getItem('user') || 'null')
const menuVisible = ref(false)

const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
}

const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
}
</script>

<template>
    <nav class="flex items-center justify-between bg-black px-5 py-4 text-white w-full box-border">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
        <a href="/inicio" class="bg-black">
            <img src="./img/logoRes.jpeg" alt="Logo de la aplicación" class="w-20 h-auto" />
        </a>
        </div>

        <!-- Enlaces -->
        <ul class="flex gap-5 list-none p-0 m-0">
        <li><router-link to="/inicio" class="text-white font-bold hover:underline">Inicio</router-link></li>
        <li><router-link :to="{ name: 'servicios' }" class="text-white font-bold hover:underline">Servicios</router-link></li>
        <li><router-link :to="{ name: 'form'}" class="text-white font-bold hover:underline">Formulario</router-link></li>
        <li><router-link :to="{ name: 'sobre' }" class="text-white font-bold hover:underline">Sobre Nosotros</router-link></li>
        </ul>

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
