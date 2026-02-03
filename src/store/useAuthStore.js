import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../utils/api'
import toast from 'react-hot-toast'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      // Login
      login: async (credentials) => {
        set({ loading: true, error: null })
        try {
          const response = await authAPI.login(credentials)
          const { user, token } = response.data
          
          localStorage.setItem('authToken', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          })
          
          toast.success(`Welcome back, ${user.firstName}!`)
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Register
      register: async (userData) => {
        set({ loading: true, error: null })
        try {
          const response = await authAPI.register(userData)
          const { user, token } = response.data
          
          localStorage.setItem('authToken', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          })
          
          toast.success('Account created successfully!')
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true })
        try {
          await authAPI.logout()
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          })
          
          toast.success('Logged out successfully')
        }
      },

      // Get user profile
      getProfile: async () => {
        set({ loading: true, error: null })
        try {
          const response = await authAPI.getProfile()
          set({ user: response.data, loading: false })
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },

      // Update profile
      updateProfile: async (data) => {
        set({ loading: true, error: null })
        try {
          const response = await authAPI.updateProfile(data)
          set({ user: response.data, loading: false })
          localStorage.setItem('user', JSON.stringify(response.data))
          toast.success('Profile updated successfully')
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Update failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Change password
      changePassword: async (data) => {
        set({ loading: true, error: null })
        try {
          await authAPI.changePassword(data)
          set({ loading: false })
          toast.success('Password changed successfully')
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Password change failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Forgot password
      forgotPassword: async (email) => {
        set({ loading: true, error: null })
        try {
          await authAPI.forgotPassword(email)
          set({ loading: false })
          toast.success('Password reset link sent to your email')
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Request failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Reset password
      resetPassword: async (token, password) => {
        set({ loading: true, error: null })
        try {
          await authAPI.resetPassword(token, password)
          set({ loading: false })
          toast.success('Password reset successfully')
          return true
        } catch (error) {
          const message = error.response?.data?.message || 'Reset failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Initialize auth from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('authToken')
        const userStr = localStorage.getItem('user')
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr)
            set({
              user,
              token,
              isAuthenticated: true,
            })
          } catch (error) {
            console.error('Failed to parse user data:', error)
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
