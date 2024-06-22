import { createRouter, createWebHistory } from 'vue-router'

import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { authRoutes } from '@/modules/auth/route';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/modules/shop/pages/HomePage.vue') },
      ]
    },
    authRoutes
  ]
})

export default router
