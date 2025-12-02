import DashboardPage from '@/pages/DashboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProjectDetailsPage from '@/pages/ProjectDetailsPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
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
      meta: { requiresAuth: true },
    },
    {
      path: '/projects',
      name: 'ProjectsPage',
      component: ProjectsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/project/:id',
      name: 'ProjectDetails',
      component: ProjectDetailsPage,
      meta: { requiresAuth: true },
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
