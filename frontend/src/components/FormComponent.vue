<script setup>
import {ref, reactive, computed} from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const pedido = reactive({
    name: "",
    amount: "",
    food: "",
    address: ""
})

const comidas = ref([
    "Pizza", "Hamburguesa", "Sushi", "Tacos", "Nachos"
]);

const enviado = ref(false)

const pedidoHecho = () =>{
    console.log(pedido);
    enviado.value = true
    toast.success('¡Pedido Guardado con Exito!', { timeout: 3000 })
    toast.info(resumen.value, { timeout: 5000 })
    pedido.name = ''
    pedido.food = ''
    pedido.amount = ''
    pedido.address = ''
}

const resumen = computed(() => {
    return `${pedido.amount} ${pedido.food} para ${pedido.name} en ${pedido.address}`
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-red-50 px-2">
    <div class="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-center text-red-700 mb-6 tracking-wide">Ordene su comida</h1>
      <form @submit.prevent="pedidoHecho" class="flex flex-col gap-4">
        <div>
          <label for="name" class="block font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="pedido.name" type="text" id="name" placeholder="Su Nombre" required
            class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-red-400 outline-none transition" />
        </div>
        <div>
          <label for="food" class="block font-medium text-gray-700 mb-1">Seleccione su Comida</label>
          <select v-model="pedido.food" id="food" required
            class="w-full p-2 border border-gray-300 rounded text-gray-700 focus:ring-1 focus:ring-red-400 outline-none transition">
            <option disabled value=""> Elija su Comida </option>
            <option v-for="comida in comidas" :key="comida" :value="comida">{{ comida }}</option>
          </select>
        </div>
        <div>
          <label for="amount" class="block font-medium text-gray-700 mb-1">Cantidad</label>
          <input v-model="pedido.amount" type="number" id="amount" placeholder="0" required
            class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-red-400 outline-none transition" />
        </div>
        <div>
          <label for="address" class="block font-medium text-gray-700 mb-1">Dirección de Entrega</label>
          <textarea v-model="pedido.address" id="address" placeholder="Su Dirección" required
            class="w-full p-2 border border-gray-300 rounded resize-none focus:ring-1 focus:ring-red-400 outline-none transition"></textarea>
        </div>
        <button type="submit"
          class="mt-2 p-2 w-full bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition">
          Enviar Pedido
        </button>
      </form>
    </div>
  </div>
</template>