import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token) // Store in localStorage
    },
    logout() {
      this.token = null
      localStorage.removeItem('token') // Remove from localStorage
    }
  }
})
