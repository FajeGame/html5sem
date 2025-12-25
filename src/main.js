import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const __BASE_PATH__ = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(__BASE_PATH__),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('./pages/LoginPage.vue') },
    { path: '/register', component: () => import('./pages/RegisterPage.vue') },
    { path: '/todo', component: () => import('./pages/TodoPage.vue'), meta: { requiresAuth: true } },
    { path: '/about', component: () => import('./pages/AboutPage.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.user) {
    next('/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

import { useUserStore } from './stores/useUserStore'