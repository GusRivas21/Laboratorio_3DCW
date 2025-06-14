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
    <section class="relative py-16 px-4 md:px-0 bg-gradient-to-tr from-red-100 via-gray-100 to-red-200 overflow-hidden">
        <!-- Curva decorativa superior -->
        <div class="relative max-w-4xl mx-auto text-center z-10">
            <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow">Sobre Nosotros</h2>
            <p class="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                Somos un restaurante familiar con <span class="font-bold text-gray-900">4 años de historia</span> en el
                corazón de la ciudad, fusionando tradición italiana y creatividad local. Nuestra pasión es ofrecer
                experiencias memorables a través de la comida, el servicio y el ambiente.
            </p>
            <blockquote class="italic text-gray-800 text-xl md:text-2xl mb-8">“La mejor mesa es la que se comparte con
                quienes amas.”</blockquote>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div class="flex flex-col items-center">
                    <span class="text-4xl text-gray-700 mb-2">🍝</span>
                    <h3 class="font-bold text-lg text-gray-900 mb-1">Calidad Artesanal</h3>
                    <p class="text-gray-700 text-sm">Pastas y pizzas hechas a mano, ingredientes frescos y recetas
                        auténticas.</p>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-4xl text-gray-700 mb-2">🤝</span>
                    <h3 class="font-bold text-lg text-gray-900 mb-1">Cercanía y Servicio</h3>
                    <p class="text-gray-700 text-sm">Atención cálida, ambiente familiar y compromiso con cada cliente.
                    </p>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-4xl text-gray-700 mb-2">⏳</span>
                    <h3 class="font-bold text-lg text-gray-900 mb-1">Creciendo Juntos</h3>
                    <p class="text-gray-700 text-sm">Más de 4 años compartiendo historias, celebraciones y nuevos
                        sabores.</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white/90 rounded-xl shadow-lg p-6 text-left flex flex-col gap-3">
                    <h4 class="font-semibold text-gray-900 mb-2">Nuestra Filosofía</h4>
                    <div class="flex flex-col gap-3">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">👨‍👩‍👧‍👦</span>
                            <div>
                                <span class="font-bold text-gray-900">Unión familiar:</span>
                                <span class="text-gray-700"> La comida une a las personas y cada plato es una invitación
                                    a compartir.</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">💡</span>
                            <div>
                                <span class="font-bold text-gray-900">Innovación con raíces:</span>
                                <span class="text-gray-700"> Nos reinventamos sin perder la esencia tradicional que nos
                                    caracteriza.</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">🤲</span>
                            <div>
                                <span class="font-bold text-gray-900">Respeto y honestidad:</span>
                                <span class="text-gray-700"> Son la base de nuestro equipo y de la relación con nuestros
                                    clientes.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white/90 rounded-xl shadow-lg p-6 text-left flex flex-col gap-3">
                    <h4 class="font-semibold text-gray-900 mb-2">Un Poco de Nuestra Historia</h4>
                    <div class="flex flex-col gap-3">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">🏠</span>
                            <div>
                                <span class="font-bold text-gray-900">Fundado en 2021:</span>
                                <span class="text-gray-700"> Por la familia Rivas, con el sueño de compartir su
                                    sazón.</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">🍽️</span>
                            <div>
                                <span class="font-bold text-gray-900">10,000+ platos servidos:</span>
                                <span class="text-gray-700"> y cientos de eventos especiales celebrados con nuestros
                                    clientes.</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl text-gray-700">🏅</span>
                            <div>
                                <span class="font-bold text-gray-900">Reconocidos por la comunidad:</span>
                                <span class="text-gray-700"> por nuestro sabor, hospitalidad y constancia.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    /* Forzar transición de color y visibilidad del fondo */
    transition: background 0.6s;
}
</style>