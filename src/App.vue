<!-- src/App.vue -->
<template>
  <div class="app-container">
    <div class="lab-header">Лабораторная работа №7 Слесарев Никита ФИТ-231</div>
    <router-view />
  </div>
</template>

<script setup>
// Ничего не вызываем здесь — всё через router-view
</script>

<style scoped>
.lab-header {
  text-align: center;
  font-weight: bold;
  padding: 12px 0;
  background: #e3f2fd;
  color: #0d47a1;
  margin-bottom: 20px;
}
.dark .lab-header {
  background: #0d1b2a;
  color: #c1c1c1;
}
.app-container {
  min-height: 100vh;
  padding: 0 20px;
}
</style>