// src/stores/useTodoStore.js
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]')
  }),
  actions: {
    save() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    add(text) {
      this.todos.push({ id: Date.now(), text, completed: false })
      this.save()
    },
    remove(id) {
      this.todos = this.todos.filter(t => t.id !== id)
      this.save()
    },
    toggle(id) {
      const t = this.todos.find(t => t.id === id)
      if (t) t.completed = !t.completed
      this.save()
    },
    edit(id, newText) {
      const t = this.todos.find(t => t.id === id)
      if (t) t.text = newText
      this.save()
    }
  },
  persist: true
})