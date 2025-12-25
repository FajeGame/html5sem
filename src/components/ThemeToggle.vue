<template>
  <button @click="$emit('toggle')">
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ theme: string }>()
</script>

<style scoped>
button {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
