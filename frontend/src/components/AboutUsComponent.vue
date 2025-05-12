    <template>
        <section class="bg-[#0c1622] text-white py-20 px-6" id="wallpaper">
        <h2 class="text-4xl font-serif text-center mb-16 tracking-widest">SOBRE NOSOTROS</h2>

        <div class="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">

            <div class="flex flex-col gap-16 text-center lg:text-right lg:w-1/3">
            <div class="fondo">
                <p class="text-sm text-red-500 mb-1">1955</p>
                <h3 class="text-xl font-semibold mb-2">FOUNDING OF GUS GU'S</h3>
                <p class="text-gray-800 text-sm leading-relaxed">
                Gus Gu's Restaurant nace con una visión clara: ofrecer comida con alma, pasión y raíces. Desde entonces, su sazón única ha conquistado paladares exigentes.
                </p>
            </div>
            <div class="fondo">
                <p class="text-sm text-red-500 mb-1">1970</p>
                <h3 class="text-xl font-semibold mb-2">MICHELIN STAR</h3>
                <p class="text-gray-800 text-sm leading-relaxed">
                Tras años de excelencia, Gus Gu's recibe su primera estrella Michelin, consolidándose como uno de los mejores restaurantes familiares del país.
                </p>
            </div>
            </div>

            <!-- Imagen -->
            <div class="w-[260px] h-[260px] lg:w-[400px] lg:h-[400px] overflow-hidden rounded-full shadow-xl" id="imagen">
            <img src="https://muchosnegociosrentables.com/wp-content/uploads/2017/09/Co%CC%81mo-montar-una-cantina-italiana_opt.jpg" alt="Gus Gu's Dish"
                class="w-full h-full object-cover object-center"/>
            </div>

            <div class="flex flex-col gap-16 text-center lg:text-left lg:w-1/3">
            <div class="fondo">
                <p class="text-sm text-red-500 mb-1">2005</p>
                <h3 class="text-xl font-semibold mb-2">HOTEL EXPANSION</h3>
                <p class="text-gray-800 text-sm leading-relaxed">
                Gus Gu's crece e inaugura su primer hotel boutique gourmet. Una experiencia culinaria y de descanso en un mismo lugar.
                </p>
            </div>
            <div class="fondo">
                <p class="text-sm text-red-500 mb-1">2022</p>
                <h3 class="text-xl font-semibold mb-2">THE LEGACY CONTINUES</h3>
                <p class="text-gray-800 text-sm leading-relaxed">
                Hoy, Gus Gu's Restaurant sigue liderando con sabor, servicio y una historia que honra el pasado mientras mira al futuro.
                </p>
            </div>
            </div>

        </div>
        </section>
    </template>

<style scoped>
    #wallpaper{
        background-image: url(https://i.pinimg.com/736x/e9/ed/a3/e9eda3e2ab85ba3572eaa79919c32022.jpg);
        background-size: cover;
        background-position: center;
        min-height: 100vh;
    }

    .fondo{
        background: rgba(255, 255, 255, 0.6);
        color: black;
        padding: 2rem 2.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }


    #imagen{
        transition: transform 0.5s ease; /* Duración y tipo de transición */
    }

    #imagen:hover{
        transform: scale(1.1);
        transition: transform 0.5s ease;
    }
</style>