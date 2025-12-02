import DashboardPage from '@/pages/DashboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardPage,
      meta: {requiresAuth: true}
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if(to.meta.requiresAuth && !auth.user){
    return next('/login')
  }

  next()
})

export default router
