import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'

const toast = useToast()

export const useAlbumStore = defineStore({
  id: 'albumStore',
  state: () => ({
    currentAlbum: {},
  }),
  actions: {
    async getAlbumById(id) {
      const { data } = await axios.get(`/api/albums?id=${id}`)
      this.currentAlbum = data.data
    },
  }
})
