import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { auth, googleProvider } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
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
      login: async ({ email, password }) => {
        set({ loading: true, error: null })
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user

          const userData = {
            uid: user.uid,
            email: user.email,
            firstName: user.displayName?.split(' ')[0] || 'User',
            lastName: user.displayName?.split(' ')[1] || '',
            photoURL: user.photoURL
          }

          set({
            user: userData,
            isAuthenticated: true,
            loading: false,
          })

          toast.success(`Welcome back!`)
          return true
        } catch (error) {
          console.error("Login error", error)
          const message = error.message || 'Login failed'
          set({ error: message, loading: false })
          toast.error("Invalid email or password")
          return false
        }
      },

      // Google Login
      loginWithGoogle: async () => {
        set({ loading: true, error: null })
        try {
          const result = await signInWithPopup(auth, googleProvider)
          const user = result.user
          const userData = {
            uid: user.uid,
            email: user.email,
            firstName: user.displayName?.split(' ')[0] || 'User',
            lastName: user.displayName?.split(' ')[1] || '',
            photoURL: user.photoURL
          }

          set({
            user: userData,
            isAuthenticated: true,
            loading: false
          })
          toast.success('Logged in with Google!')
          return true
        } catch (error) {
          console.error(error)
          set({ error: error.message, loading: false })
          toast.error('Google sign in failed')
          return false
        }
      },

      // Register
      register: async ({ email, password, firstName, lastName }) => {
        set({ loading: true, error: null })
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user

          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
          })

          const userData = {
            uid: user.uid,
            email: user.email,
            firstName,
            lastName,
            photoURL: user.photoURL
          }

          set({
            user: userData,
            isAuthenticated: true,
            loading: false,
          })

          toast.success('Account created successfully!')
          return true
        } catch (error) {
          console.error("Register error", error)
          const message = error.message || 'Registration failed'
          set({ error: message, loading: false })
          toast.error(message)
          return false
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true })
        try {
          await signOut(auth)
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
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
          await sendPasswordResetEmail(auth, email)
          set({ loading: false })
          toast.success('Password reset link sent to your email')
          return true
        } catch (error) {
          console.error("Forgot password error", error)
          const message = error.message || 'Failed to send reset email'
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
