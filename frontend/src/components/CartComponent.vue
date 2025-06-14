<script setup>
import { computed, ref } from 'vue'
import { useCart } from '@/composables/useCart'
import { useToast } from 'vue-toastification'

// Obtiene estado y funciones del carrito
const { cart, removeFromCart, clearCart } = useCart()
const toast = useToast()

// Emite evento para cerrar el carrito
defineEmits(['close'])

// Usuario guardado en localStorage
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

// Estado de carga para el botón de pedido
const loading = ref(false)

// Estado para el modal de confirmación
const showConfirm = ref(false)
const itemToDelete = ref(null)

// Calcula el total del carrito sumando precio * cantidad
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

// Función para manejar el envío del pedido
async function handleOrder() {
  // Validaciones: usuario, rol y carrito vacío
  if (!user.value) {
    toast.error('Debes iniciar sesión para poder pedir.')
    return
  }
  if (!cart.value.length) {
    toast.info('El carrito está vacío.')
    return
  }

  loading.value = true
  try {
    // Construye el detalle del pedido (ejemplo: "2 Pizza, 1 Sushi")
    const detalle = cart.value.map(item => `${item.cantidad} ${item.nombre}`).join(', ')

    // Objeto con datos del pedido
    const order = {
      tipo: 'Pedido',
      nombre: user.value.nombre || user.value.email || 'Usuario',
      detalle,
      fecha: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      estado: 'Pendiente'
    }

    // Envía pedido al backend
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (!res.ok) throw new Error('No se pudo registrar el pedido')

    toast.success('¡Pedido realizado con éxito!')
    clearCart()
    // Opcional: cerrar el carrito
    // emit('close')
  } catch (err) {
    toast.error('Error al realizar el pedido: ' + err.message)
  } finally {
    loading.value = false
  }
}

// Actualiza la cantidad del producto en el carrito
function updateQuantity(id, cantidad) {
  if (cantidad < 1) return
  const item = cart.value.find(i => i._id === id)
  if (item) item.cantidad = cantidad
}

// Pregunta confirmación para eliminar un ítem
function askRemoveItem(item) {
  itemToDelete.value = item
  showConfirm.value = true
}

// Confirma la eliminación del ítem
function confirmRemove() {
  removeFromCart(itemToDelete.value._id)
  showConfirm.value = false
  itemToDelete.value = null
  toast.success('Producto eliminado del carrito')
}

// Cancela la eliminación del ítem
function cancelRemove() {
  showConfirm.value = false
  itemToDelete.value = null
}
</script>

<template>
  <div class="fixed top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8
            bg-white shadow-2xl rounded-2xl p-6 w-full max-w-lg sm:w-[32rem] z-50
            animate-fade-in-up transition-all duration-500 ease-out">
    <!-- Modal de confirmación -->
    <div v-if="showConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-80 max-w-full text-center">
        <h4 class="text-lg font-bold mb-4 text-red-700">¿Seguro que deseas eliminar este producto?</h4>
        <div class="flex justify-center gap-4 mt-2">
          <button @click="confirmRemove" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sí, eliminar</button>
          <button @click="cancelRemove" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Botón cerrar carrito -->
    <button class="absolute top-2 right-2 text-gray-500 text-2xl hover:text-red-500 transition-colors"
      @click="$emit('close')">
      &times;
    </button>

    <h3 class="font-bold text-lg mb-2 text-black">Carrito</h3>

    <!-- Mensaje carrito vacío -->
    <div v-if="cart.length === 0" class="text-gray-500">El carrito está vacío.</div>

    <!-- Lista de productos en carrito -->
    <ul v-else>
      <li v-for="item in cart" :key="item._id"
        class="flex items-center gap-3 mb-3 border-b pb-2 transition-transform duration-300 hover:scale-[1.02]">
        <img :src="item.imagen" :alt="item.nombre" class="w-14 h-14 object-cover rounded" />
        <div class="flex-1">
          <div class="font-semibold text-black">{{ item.nombre }}</div>
          <div class="text-gray-600 text-sm">${{ item.precio }} x {{ item.cantidad }}</div>
        </div>
        <button @click="askRemoveItem(item)" class="text-red-600 hover:text-red-800 text-xl font-bold">&times;</button>
      </li>
    </ul>

    <!-- Total de compras -->
    <div v-if="cart.length" class="mt-2 mb-2 text-right font-bold text-black">
      Total: ${{ total.toFixed(2) }}
    </div>

    <!-- Botón Pedir -->
    <button v-if="cart.length" @click="handleOrder" :disabled="loading" class="mt-2 bg-green-600 text-white px-3 py-1 rounded w-full
              hover:bg-green-700 disabled:opacity-50 transition-colors">
      {{ loading ? 'Enviando...' : 'Pedir' }}
    </button>

    <!-- Botón Vaciar carrito -->
    <button v-if="cart.length" @click="clearCart" class="mt-2 bg-red-600 text-white px-3 py-1 rounded w-full
              hover:bg-red-700 transition-colors">
      Vaciar carrito
    </button>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out;
}
</style>
