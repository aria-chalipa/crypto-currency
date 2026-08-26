import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: ':id',
          name: 'dashboard-overview',
          component: () => import('../components/DashboardCom.vue'),
        },
        {
          path: ':id/portfolio',
          name: 'portfolio',
          component: () => import('../components/dashboard/PortofolioCom.vue'),
        },
        {
          path: ':id/settings',
          name: 'settings',
          component: () => import('../components/dashboard/SettingsCom.vue'),
        }
      ]
    }
  ],
})

export default router
