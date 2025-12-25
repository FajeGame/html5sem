<template>
  <div :class="theme">
    <div class="lab-title">Лабораторная работа №8, Слесарев Никита, ФИТ-231</div>

    <header class="header">
      <h1>Мой список задач</h1>
      <ThemeToggle :theme="theme" @toggle="toggleTheme" />
    </header>
    <SearchBar v-model="search" />
    <button class="add-btn" @click="showModal = true">+ Добавить</button>
    <TodoList
      :todos="filtered"
      @edit="editTodo"
      @delete="deleteTodo"
      @toggle="toggleTodo"
    />
    <AddTodoModal
      v-if="showModal"
      :todo="editable"
      @save="saveTodo"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoList from './components/TodoList.vue'
import AddTodoModal from './components/AddTodoModal.vue'
import SearchBar from './components/SearchBar.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import type { Todo } from './types'

const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
const search = ref('')
const showModal = ref(false)
const editable = ref<Todo | null>(null)
const theme = ref(localStorage.getItem('theme') || 'light')

const filtered = computed(() =>
  todos.value.filter((t) =>
    t.text.toLowerCase().includes(search.value.toLowerCase())
  )
)

function saveLocal() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function saveTodo(todo: { text: string }) {
  if (editable.value) {
    const { id } = editable.value
    const i = todos.value.findIndex((t) => t.id === id)
    if (i !== -1) {
      todos.value[i].text = todo.text
    }
  } else {
    todos.value.push({ id: Date.now(), text: todo.text, completed: false })
  }
  saveLocal()
  closeModal()
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id)
  saveLocal()
}

function toggleTodo(id: number) {
  const t = todos.value.find((t) => t.id === id)
  if (t) t.completed = !t.completed
  saveLocal()
}

function editTodo(todo: Todo) {
  editable.value = todo
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editable.value = null
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-btn {
  margin: 10px 0;
  padding: 8px 16px;
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.dark {
  background: #0d1b2a;
  color: #b7b7b7ff;
  min-height: 100vh;
  padding: 20px;
}
.light {
  background: #e3f2fd;
  color: #0d47a1;
  min-height: 100vh;
  padding: 20px;
}
.lab-title {
  text-align: center;
  font-weight: bold;
  margin: 12px 0;
  color: #0d47a1;
}
.dark .lab-title {
  color: #c1c1c1;
}
</style>
