import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartAPI } from '../utils/api'
import toast from 'react-hot-toast'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,

      // Add item to cart
      addItem: async (product, quantity = 1) => {
        const existingItem = get().items.find(item => item.product.id === product.id)
        
        if (existingItem) {
          // Update quantity if item exists
          await get().updateQuantity(existingItem.id, existingItem.quantity + quantity)
        } else {
          // Add new item
          set({ loading: true, error: null })
          try {
            // If user is logged in, sync with backend
            const token = localStorage.getItem('authToken')
            if (token) {
              const response = await cartAPI.add(product.id, quantity)
              set(state => ({
                items: [...state.items, response.data],
                loading: false,
              }))
            } else {
              // Guest cart - store locally
              const newItem = {
                id: Date.now().toString(),
                product,
                quantity,
                price: product.price,
              }
              set(state => ({
                items: [...state.items, newItem],
                loading: false,
              }))
            }
            toast.success(`${product.name} added to cart`)
          } catch (error) {
            set({ error: error.message, loading: false })
            toast.error('Failed to add item to cart')
          }
        }
      },

      // Update item quantity
      updateQuantity: async (itemId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(itemId)
          return
        }

        set({ loading: true, error: null })
        try {
          const token = localStorage.getItem('authToken')
          if (token) {
            await cartAPI.update(itemId, quantity)
          }
          
          set(state => ({
            items: state.items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            ),
            loading: false,
          }))
        } catch (error) {
          set({ error: error.message, loading: false })
          toast.error('Failed to update quantity')
        }
      },

      // Remove item from cart
      removeItem: async (itemId) => {
        set({ loading: true, error: null })
        try {
          const token = localStorage.getItem('authToken')
          if (token) {
            await cartAPI.remove(itemId)
          }
          
          set(state => ({
            items: state.items.filter(item => item.id !== itemId),
            loading: false,
          }))
          toast.success('Item removed from cart')
        } catch (error) {
          set({ error: error.message, loading: false })
          toast.error('Failed to remove item')
        }
      },

      // Clear cart
      clearCart: async () => {
        set({ loading: true, error: null })
        try {
          const token = localStorage.getItem('authToken')
          if (token) {
            await cartAPI.clear()
          }
          
          set({ items: [], loading: false })
          toast.success('Cart cleared')
        } catch (error) {
          set({ error: error.message, loading: false })
          toast.error('Failed to clear cart')
        }
      },

      // Sync cart with backend (when user logs in)
      syncCart: async () => {
        set({ loading: true, error: null })
        try {
          const response = await cartAPI.get()
          set({ items: response.data.items, loading: false })
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },

      // Calculate totals
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * 0.075 // 7.5% VAT
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > 50000 ? 0 : 2500 // Free shipping over ₦50,000
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping()
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
