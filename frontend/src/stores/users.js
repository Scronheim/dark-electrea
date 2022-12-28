import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'
import router from '@/router'

const toast = useToast()

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    users: [],
    user: {
      _id: '',
      addedMaterials: {},
    },
    token: localStorage.getItem('token')
  }),
  actions: {
    async aboutMe() {
      const { data } = await axios.get('/api/me', { headers: { 'x-access-token': this.token } })
      this.user = data.data
    },
    authorizeUser(data) {
      if (data.data.auth) {
        localStorage.setItem('token', data.data.token)
        axios.defaults.headers.common['Authorization'] = data.data.token
        this.token = data.data.token
        this.user = data.data.user
        router.push('/')
      } else {
        localStorage.removeItem('token')
      }
    },
    async login(user) {
      const utilStore = useUtilStore()
      try {
        const { data } = await axios.post('/api/login', user)
        this.authorizeUser(data)
      } catch (e) {
        utilStore.axiosErrorHandler(e)
        localStorage.removeItem('token')
      }
    },
    logout() {
      this.token = ''
      this.user = {}
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    async register(user) {
      const utilStore = useUtilStore()
      try {
        const { data } = await axios.post('/api/register', user)
        this.authorizeUser(data)
      } catch (e) {
        utilStore.axiosErrorHandler(e)
        localStorage.removeItem('token')
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user.isAdmin,
  }
})
