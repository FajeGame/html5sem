<template>
  <button @click="$emit('toggle')">{{ theme === 'light' ? '🌙' : '☀️' }}</button>
</template>

<script setup>
const props = defineProps({ theme: String })
</script>

<style scoped>
button {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
