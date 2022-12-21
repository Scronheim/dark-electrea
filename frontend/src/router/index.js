import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage'),
  },
  {
    path: '/artists/add',
    name: 'Artists add page',
    component: () => import('../pages/artists/AddArtist'),
  },
  {
    path: '/artists/:id',
    name: 'Artists info page',
    component: () => import('../pages/artists/ArtistInfo'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
