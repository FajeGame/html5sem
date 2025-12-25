<!-- src/pages/TodoPage.vue -->
<template>
  <div :class="theme">
    <header class="header">
      <h1>Мой список задач</h1>
      <div>
        <ThemeToggle :theme="theme" @toggle="toggleTheme" />
        <button @click="logout" style="margin-left:10px">Выйти</button>
      </div>
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

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import AddTodoModal from '../components/AddTodoModal.vue'
import SearchBar from '../components/SearchBar.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useTodoStore } from '../stores/useTodoStore'

const router = useRouter()
const todoStore = useTodoStore()

const search = ref('')
const showModal = ref(false)
const editable = ref(null)

// Тема из localStorage
const theme = ref(localStorage.getItem('theme') || 'light')
watch(theme, (val) => {
  document.documentElement.className = val
  localStorage.setItem('theme', val)
}, { immediate: true })

const filtered = computed(() =>
  todoStore.todos.filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()))
)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}

function saveTodo(todo) {
  if (editable.value) {
    todoStore.edit(editable.value.id, todo.text)
  } else {
    todoStore.add(todo.text)
  }
  closeModal()
}

function deleteTodo(id) {
  todoStore.remove(id)
}

function toggleTodo(id) {
  todoStore.toggle(id)
}

function editTodo(todo) {
  editable.value = todo
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editable.value = null
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
  color: #b7b7b7;
  min-height: 100vh;
  padding: 20px;
}
.light {
  background: #e3f2fd;
  color: #0d47a1;
  min-height: 100vh;
  padding: 20px;
}
</style>