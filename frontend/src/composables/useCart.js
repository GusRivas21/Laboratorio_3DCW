import { ref, computed, provide, inject } from 'vue'

const cartSymbol = Symbol('cart')

export function provideCart() {
  const cart = ref([])

  const addToCart = (product) => {
    const found = cart.value.find(item => item._id === product._id)
    if (found) {
      found.cantidad++
    } else {
      cart.value.push({ ...product, cantidad: 1 })
    }
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item._id !== id)
  }

  const clearCart = () => {
    cart.value = []
  }

  const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.cantidad, 0))

  provide(cartSymbol, {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems
  })
}

export function useCart() {
  const cartContext = inject(cartSymbol)
  if (!cartContext) throw new Error('Cart not provided')
  return cartContext
}