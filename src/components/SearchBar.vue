<template>
  <input
    v-model="modelValue"
    @input="$emit('update:modelValue', modelValue)"
    placeholder="Поиск..."
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
</style>
