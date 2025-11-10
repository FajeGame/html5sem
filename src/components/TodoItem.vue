<template>
  <li class="todo">
    <input type="checkbox" v-model="todo.completed" @change="$emit('toggle', todo.id)" />
    <span :class="{ done: todo.completed }">{{ todo.text }}</span>
    <div class="actions">
      <button @click="$emit('edit', todo)">✏️</button>
      <button @click="$emit('delete', todo.id)">🗑️</button>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({ todo: Object })
</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #bbdefb;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 5px;
}
.dark .todo {
    background: #1b263b;
    color: #e0e7ff;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.actions button {
  margin-left: 5px;
}
</style>
