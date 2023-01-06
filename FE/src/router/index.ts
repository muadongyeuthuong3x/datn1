import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Trang đăng nhập',
      component: () => Register,
    },
  ]
})

export default router
