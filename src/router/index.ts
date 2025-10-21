import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      // Use this simple component first to test
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/deep-scan',
      name: 'deep-scan',
      component: () => import('../views/DeepScanDashboard.vue')
    }

  ]
})

export default router