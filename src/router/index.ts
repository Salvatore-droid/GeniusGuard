import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      // Use this simple component first to test
      component: () => import('../views/LandingPage.vue')
    }
  ]
})

export default router