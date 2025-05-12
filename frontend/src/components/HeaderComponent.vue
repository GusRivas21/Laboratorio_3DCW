<script setup>

</script>

<template>
    <nav class="flex items-center justify-between bg-black px-5 py-4 text-white w-full box-border">
        <div class="flex items-center gap-2.5">
            <a href="/inicio" class="bg-black">
                <img src="./img/logoRes.jpeg" alt="Logo de la aplicación" class="w-20 h-auto" />
            </a>
        </div>
        <ul class="flex gap-5 list-none p-0 m-0">
            <li>
                <router-link to="/inicio" class="text-white font-bold hover:underline">Inicio</router-link>
            </li>
            <li>
                <router-link to="/servicios" class="text-white font-bold hover:underline">Servicios</router-link>
            </li>
            <li>
                <router-link to="/formulario" class="text-white font-bold hover:underline">Formulario</router-link>
            </li>
            <li>
                <router-link to="/sobre_nosotros" class="text-white font-bold hover:underline">Sobre Nosotros</router-link>
            </li>
        </ul>
    </nav>
</template>
