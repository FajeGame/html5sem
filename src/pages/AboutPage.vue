<template>
  <div class="about-page">
    <h1>✨ О приложении To-Do List ✨</h1>
    <p>Это простое, но мощное приложение для управления вашими задачами.</p>
    <div class="features">
      <h2>🔥 Возможности</h2>
      <ul>
        <li>Добавлять, редактировать и удалять задачи</li>
        <li>Отмечать задачи как выполненные</li>
        <li>Поиск по задачам</li>
        <li>Переключение темы (светлая/тёмная)</li>
        <li>Авторизация и регистрация пользователей</li>
        <li>Данные сохраняются между перезагрузками</li>
      </ul>
    </div>
    <div class="tech">
      <h2>⚙️ Технологии</h2>
      <p>Vue 3 + Vite + Pinia + Vue Router</p>
    </div>
    <div class="fun">
      <h2>😄 А ещё...</h2>
      <p>Это лабораторная работа №7! Надеюсь, вам понравилось 😊</p>
    </div>
  </div>
</template>

<script setup>
// Ничего не нужно
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: sans-serif;
}
h1 {
  color: #2196f3;
  text-align: center;
}
h2 {
  color: #0d47a1;
  margin-top: 30px;
}
.features ul {
  list-style-type: none;
  padding: 0;
}
.features li {
  margin: 8px 0;
  padding: 8px;
  background: #e3f2fd;
  border-radius: 4px;
}
.tech p {
  font-weight: bold;
  color: #0d47a1;
}
.fun p {
  font-style: italic;
  color: #2196f3;
}
</style>