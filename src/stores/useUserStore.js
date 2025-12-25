// src/stores/useUserStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    login(email, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const u = users.find(x => x.email === email && x.password === password)
      if (!u) throw new Error('Неверные данные')
      this.user = { email }
    },
    register(email, password, confirm) {
      if (password !== confirm) throw new Error('Пароли не совпадают')
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some(u => u.email === email)) throw new Error('Email уже используется')
      users.push({ email, password })
      localStorage.setItem('users', JSON.stringify(users))
      this.user = { email }
    },
    logout() {
      this.user = null
    }
  },
  persist: true
})