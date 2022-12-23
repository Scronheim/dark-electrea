import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAlbumStore = defineStore({
  id: 'albumStore',
  state: () => ({
    currentAlbum: {
      band: {},
      links: {
        download: []
      },
    },
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------
    async getAlbumById(id) {
      const { data } = await axios.get(`/api/albums?id=${id}`)
      this.currentAlbum = data.data
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateAlbum() {
      const { data } = await axios.patch('/api/albums', this.currentAlbum)
      this.currentAlbum = data.data
      toast.success(`Album ${this.currentAlbum.title} updated successfully`)
    }
  }
})
