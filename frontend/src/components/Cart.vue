<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart'
const { cart, removeFromCart, clearCart } = useCart()
defineEmits(['close'])

// Calcula el total del carrito
const total = computed(() =>
  cart.value.reduce((sum, item) => {
    // Elimina el símbolo $ y convierte a número
    const precio = parseFloat(
      typeof item.precio === 'string'
        ? item.precio.replace('$', '').replace(',', '.')
        : item.precio
    )
    return sum + (precio * item.cantidad)
  }, 0)
)
</script>

<template>
  <div class="fixed top-20 right-4 bg-white shadow-lg rounded-xl p-4 w-80 z-50">
    <button class="absolute top-2 right-2 text-gray-500 text-2xl" @click="$emit('close')">&times;</button>
    <h3 class="font-bold text-lg mb-2">Carrito</h3>
    <div v-if="cart.length === 0" class="text-gray-500">El carrito está vacío.</div>
    <ul v-else>
      <li
        v-for="item in cart"
        :key="item._id"
        class="flex items-center gap-3 mb-3 border-b pb-2"
      >
        <img
          :src="item.imagen"
          :alt="item.nombre"
          class="w-14 h-14 object-cover rounded"
        />
        <div class="flex-1">
          <div class="font-semibold text-black">{{ item.nombre }}</div>
          <div class="text-black text-sm font-bold">{{ item.precio }}</div>
          <div class="text-sm text-gray-500">x{{ item.cantidad }}</div>
        </div>
        <button
          @click="removeFromCart(item._id)"
          class="text-red-600 hover:underline text-xs"
        >
          Quitar
        </button>
      </li>
    </ul>
    <!-- Total de compras -->
    <div v-if="cart.length" class="mt-2 mb-2 text-right font-bold text-black">
      Total: ${{ total.toFixed(2) }}
    </div>
    <button
      v-if="cart.length"
      @click="clearCart"
      class="mt-2 bg-red-600 text-white px-3 py-1 rounded w-full"
    >
      Vaciar carrito
    </button>
  </div>
</template>