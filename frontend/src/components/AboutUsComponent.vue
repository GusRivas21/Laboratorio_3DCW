<script setup>
// --- IMPORTS Y REACTIVIDAD ---
import { ref } from 'vue';

// Lista de eventos/hitos para la sección Sobre Nosotros
const events = [
    {
        year: '1955',
        title: "FOUNDING OF GUS GU'S",
        description:
        "Gus Gu's Restaurant nace con una visión clara: ofrecer comida con alma, pasión y raíces. Desde entonces, su sazón única ha conquistado paladares exigentes."
    },
    {
        year: '1970',
        title: 'MICHELIN STAR',
        description:
        "Tras años de excelencia, Gus Gu's recibe su primera estrella Michelin, consolidándose como uno de los mejores restaurantes familiares del país."
    },
    {
        year: '2005',
        title: 'HOTEL EXPANSION',
        description:
        "Gus Gu's crece e inaugura su primer hotel boutique gourmet. Una experiencia culinaria y de descanso en un mismo lugar."
    },
    {
        year: '2022',
        title: 'THE LEGACY CONTINUES',
        description:
        "Hoy, Gus Gu's Restaurant sigue liderando con sabor, servicio y una historia que honra el pasado mientras mira al futuro."
    },
];
</script>

<template>
    <!-- Sección Sobre Nosotros: muestra la historia del restaurante en cards -->
    <section class="bg-gradient-to-r dark:from-black dark:via-gray-900 dark:to-black pt-30 py-20 px-4 sm:px-6 flex flex-col items-center">
        <h2 class="text-4xl font-serif text-center mb-16 tracking-widest z-10 relative text-red-700">SOBRE NOSOTROS</h2>
        <div class="w-full max-w-2xl flex flex-col gap-10">
        <div v-for="(event, idx) in events" :key="event.year" class="relative group">
            <div class="flex items-center gap-4">
            <span class="text-3xl text-red-700">{{ event.year }}</span>
            </div>
            <div class="bg-white/95 text-red-900 p-6 rounded-2xl shadow-xl border-l-4 border-red-400 mt-4 animate-fade-in-timeline">
            <h3 class="text-lg font-semibold mb-2">{{ event.title }}</h3>
            <p class="text-gray-700 text-base leading-relaxed">{{ event.description }}</p>
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>

</style>