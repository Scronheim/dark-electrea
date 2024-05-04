import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


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
    name: 'Band info page',
    component: () => import('../pages/bands/BandInfo'),
  },
  {
    path: '/albums',
    name: 'Albums search page',
    component: () => import('../pages/albums/AlbumsByFilters'),
  },
  {
    path: '/albums/:id',
    name: 'Album info page',
    component: () => import('../pages/albums/AlbumInfo'),
  },
  // {
  //   path: '/labels/add',
  //   name: 'Label add page',
  //   component: () => import('../pages/labels/AddLabel'),
  // },
  // {
  //   path: '/labels',
  //   name: 'Labels search page',
  //   component: () => import('../pages/labels/LabelsByFilters'),
  // },
  // {
  //   path: '/labels/:id',
  //   name: 'Label info page',
  //   component: () => import('../pages/labels/LabelInfo'),
  // },
  {
    path: '/profile',
    name: 'User profile page',
    component: () => import('../pages/ProfilePage'),
  },
  {
    path: '/broken_links',
    name: 'Broken links page',
    component: () => import('../pages/BrokenLinks'),
  },
  {
    path: '/stats',
    name: 'Stats page',
    component: () => import('../pages/StatsPage'),
  },
  {
    path: '/quizzes',
    name: 'Quizzes page',
    component: () => import('../pages/quizzes/QuizMain'),
  },
  {
    path: '/quizzes/:id',
    name: 'Quiz page',
    component: () => import('../pages/quizzes/QuizPage'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
