import { ref, computed, watch } from 'vue'

function getUserKey() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user ? `cart_${user.email || user._id}` : 'cart_guest'
}

function loadCart() {
  const key = getUserKey()
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

const cart = ref(loadCart())

function saveCart() {
  const key = getUserKey()
  localStorage.setItem(key, JSON.stringify(cart.value))
}

const addToCart = (product) => {
  const found = cart.value.find(item => item._id === product._id)
  if (found) {
    found.cantidad++
  } else {
    cart.value.push({ ...product, cantidad: 1 })
  }
  saveCart()
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item._id !== id)
  saveCart()
}

const clearCart = () => {
  cart.value = []
  saveCart()
}

const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.cantidad, 0))

// Cuando cambia el usuario, recarga el carrito correspondiente
window.addEventListener('user-updated', () => {
  cart.value = loadCart()
})

watch(cart, saveCart, { deep: true })

export function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems
  }
}