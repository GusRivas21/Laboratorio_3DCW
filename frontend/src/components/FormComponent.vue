<script setup>
    import {ref, reactive, computed} from 'vue'
    import { useToast } from 'vue-toastification'

    // Se importa el módulo useToast de vue-toastification para mostrar notificaciones
    const toast = useToast()

    // Estado Reactivo para el pedido
    // Se utiliza reactive para crear un objeto reactivo que contiene los datos del pedido
    const pedido = reactive({
        name: "",
        amount: "",
        food: "",
        address: ""
    })

    // Se utiliza ref para crear una referencia reactiva para la lista de comidas
    // y para el estado de envío del pedido
    const comidas = ref([
        "Pizza", "Hamburguesa", "Sushi", "Tacos", "Nachos"
    ]);

    // Se utiliza ref para crear una referencia reactiva para el estado de enviado
    // Se inicializa en false, indicando que el pedido no ha sido enviado
    const enviado = ref(false)

    // Se define una función que se ejecuta al enviar el formulario
    // Esta función imprime el pedido en la consola y cambia el estado de enviado a true
    const pedidoHecho = () =>{
        console.log(pedido);
        enviado.value = true
        toast.success('¡Pedido Guardado con Exito!', {
        // icon: '✅',
        timeout: 3000
      })

      toast.info(resumen.value, {
        // icon: '🍔',
        timeout: 5000
      })

      // Se restablecen los valores del pedido a sus valores iniciales
      // Esto se hace para limpiar el formulario después de enviar el pedido
      pedido.name = ''
      pedido.food = ''
      pedido.amount = ''
      pedido.address = ''
    }

    // Se utiliza computed para crear una propiedad computada que genera un resumen del pedido
    // La propiedad computada se actualiza automáticamente cuando cambian los valores de pedido
    const resumen = computed(() => {
        return `${pedido.amount} ${pedido.food} para ${pedido.name} en ${pedido.address}`
    })
</script>

<template>
  <!-- Se utiliza un contenedor div con clases de Tailwind CSS para aplicar estilos -->
  <div class="bg-cover bg-center min-h-screen"
    style="background-image: url('https://i.pinimg.com/736x/b8/57/f6/b857f6eeed86bc1eda743afec402b194.jpg');">
    <h1 class="mb-6 text-center text-4xl text-white font-bold">Ordene su Comida</h1>
    <!-- Se utiliza un contenedor div con clases de Tailwind CSS para centrar el formulario -->
    <!-- Se utiliza un formulario con clases de Tailwind CSS para aplicar estilos -->
    <div class="flex justify-center items-center p-8">
      <form @submit.prevent="pedidoHecho" class="bg-white/50 p-8 rounded-xl shadow-lg w-full max-w-md">
        <div class="flex flex-col gap-4">
          <label for="name" class="font-bold text-black">Nombre</label>
          <!-- Se utiliza v-model para enlazar el valor del input con la propiedad name del objeto pedido -->
          <input v-model="pedido.name" type="text" id="name" placeholder="Su Nombre" required
            class="p-2 border  bg-white border-gray-300 rounded-lg text-base" />

          <label for="food" class="font-bold text-black">Seleccione su Comida</label>
          <select v-model="pedido.food" id="food" required
            class="p-2 border bg-white border-gray-300 rounded-lg text-base text-gray-700">
            <option disabled value=""> Elija su Comida </option>
            <option v-for="comida in comidas" :key="comida" :value="comida">{{ comida }}</option>
          </select>

          <label for="amount" class="font-bold text-black">Cantidad</label>
          <input v-model="pedido.amount" type="number" id="amount" placeholder="0" required
            class="p-2 border bg-white border-gray-300 rounded-lg text-base" />

          <label for="address" class="font-bold text-black">Dirección de Entrega</label>
          <textarea v-model="pedido.address" id="address" placeholder="Su Dirección" required
            class="w-full p-2 bg-white border-gray-300 rounded-lg resize-none"></textarea>

          <button type="submit"
            class="mt-4 p-3 w-full bg-black text-white rounded-lg text-base hover:bg-gray-800 transition">
            Enviar
          </button>

          <!-- <p v-if="enviado" class="text-center text-green-700 font-semibold">
            ¡Gracias por su pedido!
          </p> -->
          <!-- <p v-if="enviado && pedido.name && pedido.food && pedido.amount" class="text-center text-gray-800">
            {{ resumen }}
          </p> -->
        </div>
      </form>
    </div>
  </div>
</template>