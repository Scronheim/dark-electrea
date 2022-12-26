import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage'),
  },
  {
    path: '/register',
    name: 'Register page',
    component: () => import('../pages/RegisterPage'),
  },
  {
    path: '/login',
    name: 'Login page',
    component: () => import('../pages/LoginPage'),
  },
  {
    path: '/bands',
    name: 'Bands search page',
    component: () => import('../pages/bands/BandsByFilters'),
  },
  {
    path: '/bands/add',
    name: 'Bands add page',
    component: () => import('../pages/bands/AddBand'),
  },
  {
    path: '/bands/:id',
    name: 'Artists info page',
    component: () => import('../pages/bands/BandInfo'),
  },
  {
    path: '/albums/:id',
    name: 'Album info page',
    component: () => import('../pages/albums/AlbumInfo'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
