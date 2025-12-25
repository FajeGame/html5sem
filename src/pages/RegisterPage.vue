<template>
  <div class="auth-page">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required />
      <button type="submit">Зарегистрироваться</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

function register() {
  error.value = ''

  // Сравниваем значения напрямую
  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  if (!email.value || !password.value) {
    error.value = 'Заполните все поля'
    return
  }

  try {
    userStore.register(email.value, password.value, confirmPassword.value)
    router.push('/todo')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 8px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9em;
  text-align: center;
}
</style>