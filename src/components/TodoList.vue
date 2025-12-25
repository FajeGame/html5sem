<template>
  <div>
    <h2>Активные</h2>
    <ul>
      <TodoItem
        v-for="t in active"
        :key="t.id"
        :todo="t"
        @delete="$emit('delete', t.id)"
        @edit="$emit('edit', t)"
        @toggle="$emit('toggle', t.id)"
      />
    </ul>
    <h2>Выполненные</h2>
    <ul>
      <TodoItem
        v-for="t in done"
        :key="t.id"
        :todo="t"
        @delete="$emit('delete', t.id)"
        @edit="$emit('edit', t)"
        @toggle="$emit('toggle', t.id)"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'
const props = defineProps({ todos: Array })
const active = computed(() => props.todos.filter(t => !t.completed))
const done = computed(() => props.todos.filter(t => t.completed))
</script>
