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
    path: '/bands/add',
    name: 'Bands add page',
    component: () => import('../pages/artists/AddArtist'),
  },
  {
    path: '/bands/:id',
    name: 'Artists info page',
    component: () => import('../pages/artists/ArtistInfo'),
  },
  {
    path: '/albums/:id',
    name: 'Album info page',
    component: () => import('../pages/artists/albums/AlbumInfo'),
  },
  {
    path: '/country/:country',
    name: 'Artists by country page',
    component: () => import('../pages/country/ArtistsByCountry'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
